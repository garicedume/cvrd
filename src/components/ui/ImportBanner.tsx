'use client';

import React from 'react';
import { ArrowRight, FileUp, Zap } from 'lucide-react';

interface ImportBannerProps {
  onOpenModal: () => void;
}

export const ImportBanner: React.FC<ImportBannerProps> = ({ onOpenModal }) => {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-gray-950 via-gray-900 to-black rounded-[2.5rem] p-8 sm:p-12 border-2 border-amber-400/40 shadow-2xl text-white">
      {/* Destellos y luces de fondo de alta intensidad */}
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-400 text-xs font-black uppercase tracking-widest shadow-inner">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>Tecnología de Importación con IA</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            ¿Ya tienes un CV viejo? <br />
            <span className="text-amber-400">Transfórmalo y actualízalo al instante.</span>
          </h3>
          
          <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
            Sube tu currículum actual en formato PDF, Word o imagen. Nuestra inteligencia artificial extraerá toda tu información y la colocará mágicamente en una plantilla profesional lista para destacar en República Dominicana.
          </p>
        </div>

        <div className="shrink-0 w-full lg:w-auto flex flex-col items-center">
          <button
            onClick={onOpenModal}
            className="w-full lg:w-auto px-8 py-5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-amber-400/30 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 cursor-pointer group border border-amber-300"
          >
            <FileUp className="w-5 h-5 text-gray-950 group-hover:-translate-y-1 transition-transform" />
            <span>Subir mi CV viejo y actualizarlo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <span className="text-[11px] text-gray-400 font-semibold mt-2.5">
            ⚡ Rápido, seguro y sin empezar de cero
          </span>
        </div>
      </div>
    </div>
  );
};