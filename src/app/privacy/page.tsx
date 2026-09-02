'use client';

import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div 
      className="min-h-screen bg-gray-50 text-gray-900 font-poppins py-12 px-4 sm:px-6 lg:px-8 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-sm space-y-10">
        
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
            <Lock className="w-4 h-4" />
            <span>Privacidad y Datos Personales</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Política de Privacidad de CVRD
          </h1>
          <p className="text-xs text-gray-400 font-medium">Última actualización: septiembre de 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
          
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-xs text-emerald-950 font-bold">
              En CVRD valoramos tu privacidad. Tus datos personales y profesionales te pertenecen por completo.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">1. Datos que Recopilamos</h2>
            <p>
              Solo recopilamos los datos que tú decides ingresar en el formulario para construir tu currículum (nombre, teléfono, correo, historial laboral, educación y fotografía opcional).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">2. Uso de la Información</h2>
            <p>Tus datos se utilizan exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1 pt-1">
              <li>Renderizar la vista previa en tiempo real de tu CV.</li>
              <li>Procesar la generación del archivo PDF descargable.</li>
              <li>Recordar tus plantillas pagadas a través de tu almacenamiento local seguro (<code>localStorage</code>).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">3. No Vendemos tus Datos</h2>
            <p>
              Bajo ninguna circunstancia vendemos, alquilamos ni compartimos tu información profesional o datos personales con agencias de reclutamiento de terceros sin tu autorización explícita.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">4. Seguridad en Pagos</h2>
            <p>
              Los pagos se procesan de manera directamente encriptada mediante la infraestructura oficial de PayPal. CVRD no almacena números de tarjeta de crédito en sus servidores.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}