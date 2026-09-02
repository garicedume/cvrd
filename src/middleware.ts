import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // 1. Obtención segura de IP del cliente desde la cabecera x-forwarded-for o x-real-ip
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');

  // 2. Encabezados de Seguridad de Nivel Bancario (Security Headers)
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 3. Verificación Opcional de VPN / Proxy en Endpoints Críticos
  if (req.nextUrl.pathname.startsWith('/api/paypal')) {
    const isVpnOrProxy = req.headers.get('x-vercel-proxied-for') || req.headers.get('x-vpn-detected');
    
    if (isVpnOrProxy) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Acceso denegado: Por razones de seguridad no se permiten conexiones VPN o Proxies para procesar pagos.' 
        }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};