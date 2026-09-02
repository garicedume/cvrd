'use client';

import Link from 'next/link';
import { FormInput, Palette, FileCheck2, ArrowRight } from 'lucide-react';

export default function ComoFuncionaPage() {
  const pasos = [
    {
      numero: '01',
      titulo: '1. Ingreso de Datos Sin Complicaciones',
      descripcion:
        'Completa el formulario interactivo con tus datos de contacto, experiencia, educación y habilidades.',
      icono: FormInput,
      colorIcono: 'text-amber-500',
      bgIcono: 'bg-amber-100',
    },
    {
      numero: '02',
      titulo: '2. Selección de Estilo y Tipografía',
      descripcion:
        'Elige entre nuestras plantillas, personaliza la tipografía, los colores y la forma de tu foto.',
      icono: Palette,
      colorIcono: 'text-blue-500',
      bgIcono: 'bg-blue-100',
    },
    {
      numero: '03',
      titulo: '3. Exportación en Tamaño Carta Real',
      descripcion:
        'Al completar el pago, la marca de agua se remueve y se genera un PDF vectorial nítido en formato Carta (8.5" x 11").',
      icono: FileCheck2,
      colorIcono: 'text-emerald-500',
      bgIcono: 'bg-emerald-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-poppins">
      {/* Header Sección */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <p className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
          GUÍA PASO A PASO
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          ¿Cómo funciona CVRD?
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
          Diseñado para ser rápido, intuitivo y profesional. Obtén tu currículum optimizado en 3 sencillos pasos.
        </p>
      </div>

      {/* Grid de Pasos Interactivas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {pasos.map((paso) => {
          const Icono = paso.icono;
          return (
            <div
              key={paso.numero}
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className={`p-4 rounded-2xl ${paso.bgIcono}`}>
                    <Icono className={`w-8 h-8 ${paso.colorIcono}`} />
                  </div>
                  <span className="text-4xl font-black text-gray-200 group-hover:text-amber-400 transition-colors">
                    {paso.numero}
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900 leading-snug">
                    {paso.titulo}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {paso.descripcion}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Final */}
      <div className="pt-8 text-center">
        <Link
          href="/plantillas"
          className="inline-flex items-center gap-3 px-10 py-4 bg-gray-900 hover:bg-amber-500 hover:text-gray-950 text-white font-bold text-base rounded-full shadow-lg hover:shadow-amber-500/20 transition-all duration-300 active:scale-95 group"
        >
          Crear mi CV Ahora
          <ArrowRight className="w-5 h-5 text-amber-400 group-hover:text-gray-950 group-hover:translate-x-1.5 transition-all" />
        </Link>
      </div>
    </div>
  );
}