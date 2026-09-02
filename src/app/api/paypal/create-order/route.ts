import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { templateId, price } = await req.json();

    // Verificación de precio en servidor (evita manipulación en frontend)
    const expectedPrice = templateId.includes('Premium') ? '5.00' : '2.00';
    if (price !== expectedPrice) {
      return NextResponse.json({ error: 'Monto de orden inválido' }, { status: 400 });
    }

    // Lógica para comunicarse con PayPal API en servidor
    return NextResponse.json({ success: true, authorizedPrice: expectedPrice });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno en verificación de pago' }, { status: 500 });
  }
}