'use client';

import Link from 'next/link';
import { Mail, MessageCircle, ArrowLeft } from 'lucide-react';

export default function AyudaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 font-poppins">
      {/* Header Sección */}
      <div className="text-center space-y-4">
        <p className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
          CENTRO DE SOPORTE
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          ¿Cómo podemos ayudarte?
        </h1>
        <p className="text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
          Si tienes consultas sobre la generación de tu PDF, facturación o necesitas asistencia directa, contáctanos:
        </p>
      </div>

      {/* Canales de Contacto Directo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Canal 1: Correo */}
        <a
          href="mailto:nubellstore@gmail.com"
          className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 space-y-4 group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="p-4 bg-amber-100 rounded-2xl w-fit text-amber-800">
              <Mail className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Correo Directo</h2>
              <p className="text-sm text-gray-500 mt-1">Escríbenos en cualquier momento</p>
            </div>
          </div>
          <p className="text-base font-extrabold text-amber-600 group-hover:underline">
            nubellstore@gmail.com
          </p>
        </a>

        {/* Canal 2: WhatsApp */}
        <a
          href="https://wa.me/18294608316"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 space-y-4 group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="p-4 bg-emerald-100 rounded-2xl w-fit text-emerald-800">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">WhatsApp</h2>
              <p className="text-sm text-gray-500 mt-1">Respuesta rápida y personalizada</p>
            </div>
          </div>
          <p className="text-base font-extrabold text-emerald-600 group-hover:underline">
            +1 829.460.8316
          </p>
        </a>

      </div>

      {/* Botón de volver/cerrar */}
      <div className="pt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm rounded-full transition-all duration-200 shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}