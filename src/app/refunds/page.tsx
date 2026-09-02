'use client';

import React from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-poppins py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm space-y-8">
        
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest">
            <RefreshCw className="w-4 h-4" />
            <span>Garantía de Satisfacción</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950">Política de Garantía y Reembolsos</h1>
          <p className="text-xs text-gray-400">Última actualización: Septiembre 2026</p>
        </div>

        <div className="space-y-6 text-xs text-gray-700 leading-relaxed font-medium">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-amber-600 shrink-0" />
            <div>
              <h4 className="font-black text-amber-950 text-xs uppercase">Garantía de Edición Posterior</h4>
              <p className="text-[11px] text-amber-900">
                Si detectas un error ortográfico después de pagar, no necesitas pedir un reembolso: puedes volver al editor y exportar nuevamente gratis.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">1. Condición de Producto Digital</h2>
            <p>
              Al tratarse de un producto digital descargable de generación inmediata en PDF, los reembolsos aplican bajo las siguientes condiciones especiales durante los primeros 7 días posteriores a la compra.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">2. Casos Elegibles para Reembolso del 100%</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Error de procesamiento duplicado con doble cobro accidental en PayPal.</li>
              <li>Falla técnica comprobable en la renderización del archivo PDF que impida la descarga del documento.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">3. Cómo Solicitar tu Reembolso</h2>
            <p>
              Escríbenos a nuestro correo de soporte indicando tu ID de transacción de PayPal y tu nombre completo. Respondemos en menos de 24 horas laborables.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}