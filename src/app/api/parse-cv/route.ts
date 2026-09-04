import { NextResponse } from 'next/server';
import mammoth from 'mammoth';

// Parche global para prevenir errores de entorno en Node.js
if (typeof global.DOMMatrix === 'undefined') {
  // @ts-ignore
  global.DOMMatrix = class DOMMatrix {
    constructor() {}
  };
}

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

    // 1. Extracción segura para PDF
    if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require('pdf-parse/lib/pdf-parse.js');
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } catch (pdfError) {
        console.error('Error interno en pdf-parse:', pdfError);
        return NextResponse.json(
          { success: false, error: 'No se pudo leer el contenido del PDF. Intenta con otro archivo o formato Word.' },
          { status: 400 }
        );
      }
    } 
    // 2. Extracción para Word (.docx)
    else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else {
      return NextResponse.json(
        { success: false, error: 'Formato no soportado. Sube únicamente un archivo PDF o Word (.docx).' },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.trim().length < 15) {
      return NextResponse.json(
        { success: false, error: 'El archivo parece estar vacío o el texto no se pudo extraer.' },
        { status: 400 }
      );
    }

    // ==========================================
    // ANÁLISIS CON INTELIGENCIA ARTIFICIAL (OPENAI)
    // ==========================================
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'La API Key de OpenAI no está configurada en el servidor.' },
        { status: 500 }
      );
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
            content: `Eres un parser experto de currículums. Analiza el texto del CV proporcionado y extrae la información de manera precisa. Devuélveme un objeto JSON estricto con la siguiente estructura exacta:
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
            content: extractedText.trim()
          }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
      }),
    });

    const aiData = await aiResponse.json();
    
    if (!aiResponse.ok) {
      throw new Error(aiData.error?.message || 'Error al comunicarse con el servicio de IA.');
    }

    const completionContent = aiData.choices?.[0]?.message?.content;

    let structuredCV = null;
    if (completionContent) {
      try {
        structuredCV = JSON.parse(completionContent);
      } catch (parseError) {
        console.error('Error parseando el JSON de la IA:', parseError);
        throw new Error('La IA devolvió un formato no válido.');
      }
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      parsedData: structuredCV,
    });

  } catch (error: any) {
    console.error('Error crítico en el backend:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Ocurrió un error al procesar el archivo.' },
      { status: 500 }
    );
  }
}