'use client';

import React from 'react';
import { Cookie } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div 
      className="min-h-screen bg-gray-50 text-gray-900 font-poppins py-12 px-4 sm:px-6 lg:px-8 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-sm space-y-10">
        
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest">
            <Cookie className="w-4 h-4" />
            <span>Cookies y Almacenamiento Local</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Política de Cookies y Almacenamiento Local
          </h1>
          <p className="text-xs text-gray-400 font-medium">Última actualización: septiembre de 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">1. ¿Qué son las Cookies y Almacenamiento Local?</h2>
            <p>
              Son pequeños archivos de datos guardados temporalmente en tu navegador que permiten recordar la sesión de tu borrador y guardar tus compras realizadas sin requerir un registro complejo de contraseñas.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">2. Tipos de Cookies que Utiliza CVRD</h2>
            <ul className="list-disc pl-5 space-y-2 pt-1">
              <li><strong>Cookies Estrictamente Necesarias:</strong> Para mantener la sesión del editor activa mientras redactas.</li>
              <li><strong>Almacenamiento Local (<code>localStorage</code>):</strong> Guarda tu token de plantilla pagada para que puedas volver y descargar tu CV editado sin recargos.</li>
              <li><strong>Cookies de Análisis Anónimo:</strong> Medir el rendimiento global de la aplicación.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">3. Control de Cookies</h2>
            <p>
              Puedes desactivar las cookies en cualquier momento desde la configuración de tu navegador. Sin embargo, esto puede borrar tus borradores en progreso.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}