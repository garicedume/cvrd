'use client';

import Link from 'next/link';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PreciosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-poppins">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <p className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
          TARIFAS TRANSPARENTES
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Elige el plan ideal para tu CV
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
          Sin suscripciones ocultas ni cobros mensuales. Paga solo por el diseño que elijas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        
        {/* Cuadro 1: Estándar */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold bg-gray-100 text-gray-700 px-3 py-1 rounded-full uppercase tracking-wider">
                Básico
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-3">
                Plantilla Estándar
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Pago único sin suscripción mensual
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-gray-900">
                $2.00
              </span>
              <span className="text-sm font-semibold text-gray-500">
                USD (~100 DOP)
              </span>
            </div>

            <ul className="space-y-3.5 pt-4 border-t border-gray-100 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong>15 plantillas estándar ATS</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Hasta 3 descargas PDF</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Formato Carta Oficial 8.5&quot; x 11&quot;</span>
              </li>
            </ul>
          </div>

          <Link
            href="/plantillas?categoria=estandar"
            className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm rounded-full text-center transition-all duration-300 shadow-sm block active:scale-95"
          >
            Elegir Estándar
          </Link>
        </div>

        {/* Cuadro 2: Premium */}
        <div className="relative bg-white rounded-3xl p-8 border-2 border-amber-400 shadow-xl flex flex-col justify-between space-y-8">
          <div className="absolute -top-4 right-8 bg-amber-400 text-gray-950 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Popular
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full uppercase tracking-wider">
                Recomendado
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-3">
                Plantilla Premium
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Para puestos gerenciales y creativos
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-gray-900">
                $5.00
              </span>
              <span className="text-sm font-semibold text-gray-500">
                USD (~250 DOP)
              </span>
            </div>

            <ul className="space-y-3.5 pt-4 border-t border-gray-100 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span><strong>10 plantillas ejecutivas exclusivas</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Hasta 3 descargas PDF en alta resolución</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Diseños con fotografía y bloques visuales</span>
              </li>
            </ul>
          </div>

          <Link
            href="/plantillas?categoria=premium"
            className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-sm rounded-full text-center transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Elegir Premium</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}