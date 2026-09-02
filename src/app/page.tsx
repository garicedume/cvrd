'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Building2, 
  Send, 
  FileCheck2
} from 'lucide-react';

export default function HomePage() {
  const [b2bForm, setB2bForm] = useState({ nombre: '', negocio: '', contacto: '', mensaje: '' });
  const [b2bEnviado, setB2bEnviado] = useState(false);

  const handleB2bSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setB2bEnviado(true);
  };

  const reseñas = [
    {
      id: 1,
      nombre: 'Carlos Mendoza',
      rol: 'Ingeniero en Sistemas',
      comentario: 'Logré enviar mi CV a tres convocatorias en Santo Domingo y me llamaron al día siguiente. El formato Carta vectorial queda perfecto.',
      estrellas: 5,
      fecha: 'Hace 2 días'
    },
    {
      id: 2,
      nombre: 'Yamilka Rosario',
      rol: 'Gerente de Servicio al Cliente',
      comentario: 'Súper fácil de usar desde el celular. La plantilla ejecutiva con foto me ayudó a destacar entre más de 50 postulantes.',
      estrellas: 5,
      fecha: 'Hace 1 semana'
    },
    {
      id: 3,
      nombre: 'Centro Digital El Maestro',
      rol: 'Agencia & Centro de Internet (Santiago)',
      comentario: 'Tenemos la suscripción para empresas y es la mejor inversión. Imprimimos los CV de nuestros clientes en minutos y sin marcas de agua.',
      estrellas: 5,
      fecha: 'Hace 3 semanas'
    }
  ];

  return (
    <div 
      className="space-y-24 pb-20 font-poppins select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      
      {/* FRANJA 1: HERO SECTION */}
      <section className="relative pt-4 md:pt-8 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="-ml-1 relative inline-block">
                <Image
                  src="/logo_cvrd.svg"
                  alt="CVRD Logo Oficial"
                  width={380}
                  height={110}
                  priority
                  className="w-auto h-16 sm:h-20 md:h-24 object-contain pointer-events-none select-none"
                />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.18] tracking-tight">
                ¡Tu próxima entrevista empieza hoy! <br />
                <span className="text-amber-500">Diseñamos el CV que te consigue el empleo.</span>
              </h1>

              <p className="text-base text-gray-600 leading-relaxed font-normal max-w-2xl">
                Crea un currículum profesional, moderno y listo para destacar en menos de 2 minutos. Adaptado al estándar laboral de República Dominicana en formato Carta oficial.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/plantillas"
                  className="relative group overflow-hidden px-8 py-4 bg-gray-900 text-white font-bold text-base rounded-full shadow-lg hover:shadow-amber-500/25 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 border border-gray-800"
                >
                  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    Crear mi CV
                    <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </span>
                </Link>

                {/* Botón de Acceso Seguro Rediseñado (Sin icono) */}
                <Link
                  href="/acceso-seguro"
                  className="px-8 py-4 bg-white/90 backdrop-blur-md hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold text-base rounded-full shadow-xs hover:shadow-md hover:border-gray-400 transition-all duration-300 flex items-center justify-center active:scale-95"
                >
                  Acceso Seguro
                </Link>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Formato Carta Real (8.5&quot; x 11&quot;)
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Aprobado por Filtros ATS
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Descarga Inmediata PDF
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -inset-4 bg-linear-to-r from-amber-400/30 via-yellow-300/20 to-amber-200/20 rounded-3xl blur-3xl -z-10" />

              <div className="relative bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-white/60 max-w-sm sm:max-w-md w-full transition-transform duration-300 hover:scale-[1.01]">
                <div className="relative aspect-8.5/11 w-full overflow-hidden rounded-xl bg-gray-100 shadow-inner">
                  <Image
                    src="/template_executive.jpg"
                    alt="Muestra de CV Profesional CVRD"
                    fill
                    priority
                    className="object-cover object-top pointer-events-none select-none"
                  />
                </div>
                <div className="mt-3 px-2 pb-1 flex items-center justify-between text-xs text-gray-600 font-medium">
                  <span className="flex items-center gap-1.5 text-gray-900 font-bold">
                    <FileCheck2 className="w-4 h-4 text-amber-500" /> Modelo Ejecutivo Pro
                  </span>
                  <span className="bg-amber-100/80 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300/60 text-[10px] font-extrabold">
                    ESTÁNDAR RD
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FRANJA 2: PLANTILLAS REALES CON SUS RESPECTIVAS IMÁGENES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Plantillas para cada industria laboral
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Selecciona entre formatos estándar aprobados por sistemas ATS o modelos ejecutivos con fotografía y alto impacto visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. PLANTILLA EXECUTIVE GOLD ($5.00) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
            <div>
              <div className="flex justify-between items-center mb-3 px-1">
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Premium
                </span>
                <span className="text-xs text-gray-500 font-mono font-bold">USD $5.00</span>
              </div>
              <div className="relative aspect-8.5/11 w-full rounded-xl overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                <Image
                  src="/template_executive.jpg"
                  alt="Executive Gold Template"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Executive Gold</h3>
              <p className="text-xs text-gray-500 mt-1">Estructura ejecutiva dorada optimizada para puestos de liderazgo y gerencia.</p>
            </div>
            <Link
              href="/builder?template=ExecutiveGoldTemplate"
              className="mt-6 w-full py-3 bg-gray-900 hover:bg-amber-500 hover:text-gray-950 text-white font-bold text-sm rounded-full text-center transition-all duration-300 shadow-sm block active:scale-95"
            >
              Usar plantilla
            </Link>
          </div>

          {/* 2. PLANTILLA ATS MINIMAL ($2.00) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
            <div>
              <div className="flex justify-between items-center mb-3 px-1">
                <span className="text-[11px] font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Modern ATS
                </span>
                <span className="text-xs text-gray-500 font-mono font-bold">USD $2.00</span>
              </div>
              <div className="relative aspect-8.5/11 w-full rounded-xl overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                <Image
                  src="/template_ats.jpg"
                  alt="ATS Minimal Template"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">ATS Minimal</h3>
              <p className="text-xs text-gray-500 mt-1">Diseño de alta legibilidad diseñado para lecturas automatizadas y filtros ATS.</p>
            </div>
            <Link
              href="/builder?template=ATSMinimalTemplate"
              className="mt-6 w-full py-3 bg-gray-900 hover:bg-amber-500 hover:text-gray-950 text-white font-bold text-sm rounded-full text-center transition-all duration-300 shadow-sm block active:scale-95"
            >
              Usar plantilla
            </Link>
          </div>

          {/* 3. PLANTILLA SLATE MODERN ($2.00) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
            <div>
              <div className="flex justify-between items-center mb-3 px-1">
                <span className="text-[11px] font-bold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Modern Slate
                </span>
                <span className="text-xs text-gray-500 font-mono font-bold">USD $2.00</span>
              </div>
              <div className="relative aspect-8.5/11 w-full rounded-xl overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                <Image
                  src="/template_slate.jpg"
                  alt="Slate Modern Template"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Slate Modern</h3>
              <p className="text-xs text-gray-500 mt-1">Líneas contemporáneas en tonos pizarra para profesionales técnicos y creativos.</p>
            </div>
            <Link
              href="/builder?template=SlateModernTemplate"
              className="mt-6 w-full py-3 bg-gray-900 hover:bg-amber-500 hover:text-gray-950 text-white font-bold text-sm rounded-full text-center transition-all duration-300 shadow-sm block active:scale-95"
            >
              Usar plantilla
            </Link>
          </div>

        </div>
      </section>

      {/* FRANJA 3: B2B Y RECUADRO INFORMATIVO MERCADO RD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-12">
        <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Portal B2B & Empresas
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                ¿Tienes un Centro de Internet o Agencia de Empleo?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Obtén acceso corporativo ilimitado para crear, editar e imprimir currículums sin marcas de agua de forma instantánea para tus clientes. Te creamos un usuario empresarial con tarifa plana preferencial.
              </p>
            </div>

            <div className="lg:col-span-5 bg-gray-900/90 p-6 rounded-2xl border border-gray-700/60 backdrop-blur-sm">
              {b2bEnviado ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                  <h3 className="font-bold text-white text-lg">Solicitud Enviada</h3>
                  <p className="text-xs text-gray-300">
                    Nos pondremos en contacto contigo de inmediato vía WhatsApp o correo electrónico para coordinar tu acceso corporativo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleB2bSubmit} className="space-y-3">
                  <h3 className="font-bold text-white text-sm mb-2">Solicitar Acceso Empresarial</h3>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre o del negocio"
                    value={b2bForm.nombre}
                    onChange={(e) => setB2bForm({ ...b2bForm, nombre: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800/90 border border-gray-700 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors select-text"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Correo o WhatsApp de contacto"
                    value={b2bForm.contacto}
                    onChange={(e) => setB2bForm({ ...b2bForm, contacto: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800/90 border border-gray-700 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors select-text"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Enviar Solicitud B2B
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Haz que tu perfil profesional hable por ti
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Un CV bien estructurado en formato Carta estadounidense (8.5&quot; x 11&quot;) abre nuevas puertas laborales en las principales empresas de República Dominicana.
            </p>
          </div>
          <Link
            href="/plantillas"
            className="shrink-0 px-8 py-3.5 bg-gray-900 hover:bg-amber-500 hover:text-gray-950 text-white font-bold text-sm rounded-full shadow transition-all duration-300 active:scale-95"
          >
            Ir al Editor de CV
          </Link>
        </div>
      </section>

      {/* FRANJA 4: RESEÑAS LOCALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Experiencias Reales
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Lo que dicen quienes ya lo lograron
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Miles de profesionales y centros de servicio confían en CVRD para presentar currículums impecables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reseñas.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.estrellas)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  &ldquo;{item.comentario}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <div>
                  <h3 className="font-bold text-gray-900">{item.nombre}</h3>
                  <p className="text-gray-500 text-[11px]">{item.rol}</p>
                </div>
                <span className="text-[10px] text-gray-400">{item.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}