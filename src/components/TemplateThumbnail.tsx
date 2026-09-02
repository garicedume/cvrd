'use client';

import React from 'react';
import { TemplateInfo } from '../lib/templatesData';
import { TEMPLATE_COMPONENTS, SAMPLE_CV_DATA } from '../lib/templateRegistry';
import { Sparkles, FileText } from 'lucide-react';

interface Props {
  template: TemplateInfo;
}

export const TemplateThumbnail: React.FC<Props> = ({ template }) => {
  const isPremium = template.category === 'premium';
  const ComponentToRender = TEMPLATE_COMPONENTS[template.id];

  return (
    <div className="relative w-full aspect-8.5/11 rounded-xl overflow-hidden bg-white border border-gray-200/80 group-hover:border-amber-400 transition-all duration-300 shadow-xs">
      
      {/* Contenedor con escala +5% adicional para encuadre al límite */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-white p-1">
        <div className="w-204 h-264 shrink-0 origin-center scale-[0.38] sm:scale-[0.41] md:scale-[0.36] lg:scale-[0.39] pointer-events-none select-none flex items-start justify-center">
          {ComponentToRender ? (
            <ComponentToRender data={SAMPLE_CV_DATA} />
          ) : (
            <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center p-12 text-center text-gray-400">
              <FileText className="w-20 h-20 mb-3 text-gray-300" />
              <h3 className="text-xl font-bold text-gray-700">{template.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{template.industry}</p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay transparente */}
      <div className="absolute inset-0 bg-transparent group-hover:bg-gray-950/5 transition-colors duration-300 z-10" />

      {/* Badge de Categoría Flotante */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
        {isPremium ? (
          <span className="bg-amber-400 text-gray-950 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Premium
          </span>
        ) : (
          <span className="bg-gray-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
            <FileText className="w-3 h-3 text-amber-400" /> Estándar
          </span>
        )}
      </div>

      {/* Badge de Precio Flotante */}
      <div className="absolute top-3 right-3 z-20">
        <span className="bg-white/95 backdrop-blur-md text-gray-900 border border-gray-200 px-2.5 py-1 rounded-full text-[11px] font-black shadow-sm">
          USD ${template.price}.00
        </span>
      </div>

    </div>
  );
};