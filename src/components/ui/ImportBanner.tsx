'use client';

import React from 'react';
import { Sparkles, ArrowRight, FileUp } from 'lucide-react';

interface ImportBannerProps {
  onOpenModal: () => void;
}

export const ImportBanner: React.FC<ImportBannerProps> = ({ onOpenModal }) => {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl text-white">
      {/* Destellos de fondo */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[11px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Ahorra tiempo al instante</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            ¿Ya tienes un CV viejo y no quieres empezar de cero?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-medium max-w-xl leading-relaxed">
            Sube tu currículum actual en PDF, Word o imagen. Nuestra tecnología extrae tus datos y los coloca automáticamente en una plantilla moderna de alto impacto visual.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="shrink-0 px-6.5 py-4 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-amber-400/25 transition-all duration-300 flex items-center gap-2.5 active:scale-95 cursor-pointer group"
        >
          <FileUp className="w-4 h-4 text-gray-950 group-hover:-translate-y-0.5 transition-transform" />
          <span>Subir mi CV viejo y actualizarlo</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};