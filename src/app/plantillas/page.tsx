'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TEMPLATES_LIST, TemplateInfo } from '../../lib/templatesData';
import { TemplateThumbnail } from '../../components/TemplateThumbnail';
import { Search, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PlantillasPage() {
  const [filtroCategoria, setFiltroCategoria] = useState<'todas' | 'standard' | 'premium'>('todas');
  const [busqueda, setBusqueda] = useState('');

  const plantillasFiltradas = useMemo(() => {
    return TEMPLATES_LIST.filter((tpl: TemplateInfo) => {
      const cumpleCategoria =
        filtroCategoria === 'todas' ? true : tpl.category === filtroCategoria;
      const cumpleBusqueda =
        tpl.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        tpl.industry.toLowerCase().includes(busqueda.toLowerCase()) ||
        tpl.description.toLowerCase().includes(busqueda.toLowerCase());

      return cumpleCategoria && cumpleBusqueda;
    });
  }, [filtroCategoria, busqueda]);

  const conteoEstandar = TEMPLATES_LIST.filter((t: TemplateInfo) => t.category === 'standard').length;
  const conteoPremium = TEMPLATES_LIST.filter((t: TemplateInfo) => t.category === 'premium').length;

  return (
    <div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-poppins select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      
      {/* Header del Catálogo */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Elige la plantilla perfecta para tu perfil
        </h1>
        <p className="text-base text-gray-600 leading-relaxed font-normal">
          Formatos probados y optimizados para el mercado laboral de República Dominicana. Descargables en formato Carta real de alta definición.
        </p>
      </div>

      {/* Barra de Filtros y Buscador */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-gray-200/80 shadow-sm">
        
        {/* Pestañas de Filtro */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setFiltroCategoria('todas')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              filtroCategoria === 'todas'
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas ({TEMPLATES_LIST.length})
          </button>

          <button
            onClick={() => setFiltroCategoria('standard')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              filtroCategoria === 'standard'
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Estándar $2.00 USD ({conteoEstandar})
          </button>

          <button
            onClick={() => setFiltroCategoria('premium')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              filtroCategoria === 'premium'
                ? 'bg-amber-400 text-gray-950 font-black shadow-md'
                : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200/70'
            }`}
          >
            Premium $5.00 USD ({conteoPremium})
          </button>
        </div>

        {/* Campo de Búsqueda */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por puesto o estilo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all select-text"
          />
        </div>

      </div>

      {/* Grid de Plantillas */}
      {plantillasFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plantillasFiltradas.map((template: TemplateInfo) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <TemplateThumbnail template={template} />

                <div className="mt-4 space-y-1.5 px-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                    <span>{template.industry}</span>
                    {template.isPopular && (
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-black">
                        MÁS POPULAR
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-amber-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>

              <Link
                href={`/builder?template=${template.id}`}
                className="mt-6 w-full py-3 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-bold text-xs rounded-full text-center transition-all duration-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 group/btn cursor-pointer"
              >
                <span>Usar esta plantilla</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-gray-200/80">
          <p className="text-lg font-bold text-gray-800">
            No se encontraron plantillas con ese criterio.
          </p>
          <button
            onClick={() => {
              setFiltroCategoria('todas');
              setBusqueda('');
            }}
            className="px-6 py-2.5 bg-gray-900 text-white font-bold text-xs rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Cuadro Informativo Inferior */}
      <div className="bg-amber-500 text-gray-950 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">¿No estás seguro de cuál elegir?</h2>
          <p className="text-xs sm:text-sm text-gray-900 font-medium">
            Nuestras plantillas <strong className="underline">Estándar ($2 USD)</strong> están optimizadas para lectura directa de sistemas ATS, mientras que las <strong className="underline">Premium ($5 USD)</strong> destacan visualmente en procesos presenciales o correos directos a gerencia.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs font-black bg-gray-950 text-white px-6 py-3.5 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Formato Carta Real
        </div>
      </div>

    </div>
  );
}