import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
// @ts-ignore
import pdfParse from 'pdf-parse';

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

    // 1. Extracción de texto crudo (Fase 2)
    if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (mimeType.startsWith('image/') || fileName.match(/\.(jpg|jpeg|png)$/)) {
      extractedText = `[Archivo de imagen: ${file.name}]`;
    } else {
      return NextResponse.json(
        { success: false, error: 'Formato de archivo no soportado.' },
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
    // FASE 3: MAPEO INTELIGENTE CON IA (EL CEREBRO)
    // ==========================================
    const apiKey = process.env.OPENAI_API_KEY; // O tu clave de IA configurada
    
    if (!apiKey) {
      // Fallback si la API key no está configurada temporalmente, devolvemos el texto plano
      return NextResponse.json({
        success: true,
        warning: 'API Key de IA no configurada. Se devolvió texto plano.',
        rawText: extractedText.trim(),
        parsedData: null,
      });
    }

    // Llamada al modelo de lenguaje para estructurar el JSON exacto de CVRD
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
            content: `Eres un parser experto de currículums y analista de recursos humanos. Analiza el texto del CV proporcionado y devuélveme un objeto JSON estricto (y NADA más que el JSON, sin bloques de código markdown si es posible, o un JSON puro parseable) con la siguiente estructura exacta:
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
        response_format: { type: "json_object" } // Forzar respuesta JSON estricta en OpenAI
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
    console.error('Error en el proceso de parsing con IA:', error);
    return NextResponse.json(
      { success: false, error: 'Ocurrió un error al procesar el CV con inteligencia artificial.' },
      { status: 500 }
    );
  }
}