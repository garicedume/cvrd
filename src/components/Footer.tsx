'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12 font-poppins text-gray-700 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-100">
          
          <div className="md:col-span-2 space-y-5 pr-0 md:pr-8">
            <Link href="/" className="inline-block">
              <Image
                src="/logo_cvrd.svg"
                alt="CVRD Logo"
                width={180}
                height={50}
                className="w-auto h-12 object-contain pointer-events-none select-none"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              Plataforma líder para la creación de currículums profesionales optimizados para filtros ATS y adaptados al formato Carta oficial de República Dominicana.
            </p>
            <div className="pt-2">
              <a
                href="mailto:nubellstore@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-brand-bg hover:bg-gray-200 px-4 py-2 rounded-full transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-yellow" />
                nubellstore@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Enlaces
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/" className="hover:text-gray-900 transition-colors">Inicio</Link></li>
              <li><Link href="/plantillas" className="hover:text-gray-900 transition-colors">Plantillas</Link></li>
              <li><Link href="/como-funciona" className="hover:text-gray-900 transition-colors">Cómo funciona</Link></li>
              <li><Link href="/precios" className="hover:text-gray-900 transition-colors">Precios</Link></li>
              <li><Link href="/acceso-seguro" className="hover:text-gray-900 transition-colors">Portal Empresarial</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Institucional & Legal
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/about" className="hover:text-gray-900 transition-colors">Acerca de nosotros</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900 transition-colors">Términos del servicio</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Política de privacidad & datos</Link></li>
              <li><Link href="/cookies" className="hover:text-gray-900 transition-colors">Política de cookies</Link></li>
              <li><Link href="/garantia" className="hover:text-gray-900 transition-colors">Garantía y reembolsos</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4 text-center md:text-left">
          <p>© 2026 CVRD. Todos los derechos reservados.</p>
          <p className="font-medium text-gray-600">
            Diseñado por{' '}
            <a
              href="https://nudesign.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 font-bold hover:text-brand-yellow underline underline-offset-4 transition-colors"
            >
              nudesign.agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}