'use client';

import React from 'react';
import { FileText, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div 
      className="min-h-screen bg-gray-50 text-gray-900 font-poppins py-12 px-4 sm:px-6 lg:px-8 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-sm space-y-10">
        
        <div className="border-b border-gray-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            <span>Documento Legal Oficial</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Términos y Condiciones de Uso de CVRD
          </h1>
          <p className="text-xs text-gray-400 font-medium">Última actualización: septiembre de 2026</p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
          <p>
            Durante más de 15 años, crear un currículum implicaba ir a un centro de internet y encontrarse con la misma plantilla rígida y genérica de siempre, donde ni siquiera se personalizaba el diseño. Hoy en día, en 2026, la realidad sigue siendo la misma: muchos creen que con solo mandar una foto de un documento viejo es suficiente. Pero no es el caso; tu hoja de vida profesional exige un estándar superior.
          </p>
          <p>
            En <strong>CVRD</strong> nuestra misión es eliminar las barreras técnicas para quienes no dominan programas de diseño o edición de texto, permitiéndoles elegir plantillas profesionales y personalizarlas por un precio sumamente cómodo —equivalente a los mismos 100 pesos que los dominicanos tradicionalmente pagaban en un centro de internet—.
          </p>
          <p>
            Al acceder, registrarte o realizar una compra en <strong>cvrd.do</strong>, aceptas los presentes Términos del Servicio.
          </p>
        </div>

        <hr className="border-gray-100" />

        <div className="space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">1. Aceptación del Servicio</h2>
            <p>
              Al acceder y utilizar CVRD (cvrd.do), aceptas cumplir con los presentes Términos del Servicio. Si no estás de acuerdo con alguna parte de estos términos, debes abstenerte de utilizar la plataforma.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">2. Descripción de Licencias y Precios</h2>
            <p>CVRD funciona bajo un modelo transparente de pago por producto final generado o licencias B2B:</p>
            <ul className="list-disc pl-5 space-y-1 pt-1">
              <li><strong>Plantilla Estándar ($2 USD):</strong> Otorga derecho a edición y exportación ilimitada en PDF para la plantilla seleccionada.</li>
              <li><strong>Plantilla Premium ($5 USD):</strong> Otorga acceso a diseños avanzados, paletas exclusivas y componentes ejecutivos.</li>
              <li><strong>Licencias B2B Empresariales:</strong> Acceso ilimitado sin marca de agua para instituciones autorizadas.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">3. Uso Aceptable y Responsabilidad de Contenido</h2>
            <p>
              El usuario es el único responsable de la veracidad y legalidad de los datos ingresados en el editor (nombres, títulos, experiencias e imágenes). CVRD no se responsabiliza por información falsa provista para postulaciones laborales.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-black text-gray-900 uppercase tracking-wide">4. Propiedad Intelectual</h2>
            <p>
              Los diseños gráficos, estructura de código y la marca CVRD son propiedad exclusiva de la plataforma. El usuario conserva la propiedad intelectual completa de los datos personales ingresados en su documento.
            </p>
          </section>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-950 font-semibold leading-relaxed">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio constituirá la aceptación implícita de los cambios.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}