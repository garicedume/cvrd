'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Sparkles, ShieldCheck, Target, HeartHandshake, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-poppins py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            NUESTRA HISTORIA Y MISIÓN
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight">
            Impulsando el Talento Caribeño hacia Oportunidades Globales
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            CVRD nace en República Dominicana para democratizar el acceso a herramientas de diseño curricular de nivel internacional, combinando tecnología de vanguardia y estándares ATS.
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-amber-400 text-gray-950 rounded-2xl flex items-center justify-center font-black shadow-md shadow-amber-400/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Nuestra Misión</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Eliminar las barreras de formato y diseño en los currículums para que cada profesional destaque por su verdadera capacidad y experiencia ante reclutadores exigentes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-gray-900 text-amber-400 rounded-2xl flex items-center justify-center font-black shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Nuestra Visión</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Ser el ecosistema de empleabilidad y marca personal de referencia en toda la región del Caribe y Latinoamérica para el desarrollo profesional dinámico.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4">
            Los Principios que Nos Mueven
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-medium">
            <div className="space-y-2">
              <h4 className="font-black text-gray-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" /> Transparencia
              </h4>
              <p className="text-gray-500">Sin suscripciones tramposas ni cargos recurrentes no deseados. Pagas exactamente lo que usas.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-gray-900 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" /> Excelencia Vectorial
              </h4>
              <p className="text-gray-500">Garantizamos descargas en calidad de imprenta, legibles por algoritmos ATS de contratación.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-gray-900 text-sm flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-amber-500" /> Apoyo Local
              </h4>
              <p className="text-gray-500">Desarrollado con orgullo en Quisqueya con visión de exportación y compatibilidad global.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-3xl p-8 text-center space-y-4 text-white shadow-xl">
          <h3 className="text-xl font-black">¿Listo para crear un CV que abra puertas?</h3>
          <p className="text-xs text-gray-400">Selecciona entre nuestras plantillas estándar y premium en segundos.</p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs rounded-full transition-all shadow-md"
          >
            <span>Probar CVRD Editor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}