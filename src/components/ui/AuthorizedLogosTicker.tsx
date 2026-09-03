'use client';

import React from 'react';

export default function AuthorizedLogosTicker() {
  const logos = Array.from({ length: 10 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `logo_pro_${num}.svg`;
  });

  return (
    <div className="w-full py-12 bg-transparent overflow-hidden relative border-y border-gray-200/60 my-8">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">
          Empresas y Aliados Autorizados
        </p>
      </div>
      
      {/* Contenedor del Ticker con animación continua y fluida */}
      <div className="flex w-full overflow-x-hidden relative">
        {/* Bloque 1 */}
        <div className="flex animate-marquee gap-16 items-center min-w-full shrink-0 justify-around px-8">
          {logos.map((logo, index) => (
            <div 
              key={`logo-1-${index}`} 
              className="flex items-center justify-center h-16 w-48 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img 
  src={`/${logo}`} 
  alt={`Logo autorizado ${index + 1}`} 
  className="max-h-14 max-w-36 object-contain pointer-events-none select-none [shape-rendering:geometricPrecision]" 
/>
            </div>
          ))}
        </div>

        {/* Bloque 2 (Duplicado exacto para efecto infinito sin cortes) */}
        <div className="flex animate-marquee gap-16 items-center min-w-full shrink-0 justify-around px-8" aria-hidden="true">
          {logos.map((logo, index) => (
            <div 
              key={`logo-2-${index}`} 
              className="flex items-center justify-center h-16 w-48 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img 
                src={`/${logo}`} 
                alt={`Logo autorizado ${index + 1}`} 
                className="max-h-14 max-w-36 object-contain pointer-events-none select-none" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}