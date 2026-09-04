import { NextResponse } from 'next/server';
import mammoth from 'mammoth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No se ha proporcionado ningún archivo.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    const mimeType = file.type;
    const fileName = file.name.toLowerCase();

    // 1. Extracción para PDF (Importación dinámica para evitar errores de DOMMatrix en el build)
    if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
      const pdfParseModule = await import('pdf-parse');
      const pdfParser = pdfParseModule.default || pdfParseModule;
      const pdfData = await pdfParser(buffer);
      extractedText = pdfData.text;
    } 
    // 2. Extracción para Word (.docx)
    else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } 
    // 3. Extracción para Imágenes (JPG / PNG)
    else if (mimeType.startsWith('image/') || fileName.match(/\.(jpg|jpeg|png)$/)) {
      extractedText = `[Archivo de imagen detectado: ${file.name}]`;
    } else {
      return NextResponse.json(
        { success: false, error: 'Formato de archivo no soportado para extracción.' },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'El archivo parece estar vacío o no contiene texto legible.' },
        { status: 400 }
      );
    }

    // ==========================================
    // MAPEO INTELIGENTE CON IA (FASE 3)
    // ==========================================
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        warning: 'API Key de IA no configurada. Se devolvió texto plano.',
        rawText: extractedText.trim(),
        parsedData: null,
      });
    }

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres un parser experto de currículums y analista de recursos humanos. Analiza el texto del CV proporcionado y devuélveme un objeto JSON estricto con la siguiente estructura exacta:
            {
              "contact": {
                "fullName": "string",
                "professionalTitle": "string",
                "phone": "string",
                "email": "string",
                "city": "string",
                "country": "string"
              },
              "summary": "string",
              "experiences": [
                {
                  "company": "string",
                  "position": "string",
                  "startDate": "string",
                  "endDate": "string",
                  "responsibilities": ["string"]
                }
              ],
              "education": [
                {
                  "degree": "string",
                  "institution": "string",
                  "startDate": "string",
                  "endDate": "string"
                }
              ],
              "skills": [
                {
                  "name": "string",
                  "category": "technical"
                }
              ],
              "languages": [
                {
                  "language": "string",
                  "proficiency": "Intermedio"
                }
              ]
            }`
          },
          {
            role: 'user',
            content: extractedText
          }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
      }),
    });

    const aiData = await aiResponse.json();
    const completionContent = aiData.choices?.[0]?.message?.content;

    let structuredCV = null;
    if (completionContent) {
      try {
        structuredCV = JSON.parse(completionContent);
      } catch (parseError) {
        console.error('Error parseando el JSON devuelto por la IA:', parseError);
      }
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      parsedData: structuredCV,
    });

  } catch (error: any) {
    console.error('Error en el proceso de parsing:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error al procesar el archivo en el servidor.' },
      { status: 500 }
    );
  }
}