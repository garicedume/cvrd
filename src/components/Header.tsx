'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Building2, LogOut } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { user, isB2B, logout } = useAuth();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Plantillas', href: '/plantillas' },
    { name: 'Cómo Funciona', href: '/como-funciona' },
    { name: 'Precios', href: '/precios' },
    { name: 'Ayuda', href: '/ayuda' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-xs transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Ícono Oficial CVRD con Protección Anti-Descarga */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group relative cursor-pointer"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="relative">
            <Image
              src="/icon.svg"
              alt="CVRD Ícono"
              width={42}
              height={42}
              priority
              className="w-auto h-11 object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Link>

        {/* Menú Interactivo Vivo */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isActive 
                    ? 'text-gray-950 font-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-yellow after:rounded-full' 
                    : 'text-gray-600 hover:text-gray-950 hover:font-bold'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Zona Derecha: Botón de Crear CV o Sesión B2B Activa */}
        <div className="flex items-center gap-3">
          {user && isB2B ? (
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-gray-900 hidden sm:inline select-text">
                  {user.email}
                </span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  B2B
                </span>
              </div>
              <button
                onClick={logout}
                title="Cerrar Sesión"
                className="p-1.5 bg-gray-200 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Botón Portal B2B Rediseñado (Sin icono aburrido) */}
              <Link
                href="/acceso-seguro"
                className="hidden lg:flex items-center text-xs font-bold text-gray-700 hover:text-gray-950 hover:bg-gray-100 transition-all duration-200 px-4 py-2.5 rounded-full border border-gray-200/80"
              >
                Portal B2B
              </Link>

              <Link
                href="/plantillas"
                className="relative group overflow-hidden px-6 py-2.5 bg-gray-900 text-white font-black text-xs sm:text-sm rounded-full shadow-md hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 flex items-center gap-2 active:scale-95 border border-gray-800"
              >
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 tracking-wide text-white group-hover:text-amber-300 transition-colors">
                  Crear mi CV
                </span>
                <ArrowRight className="w-4 h-4 text-brand-yellow group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}