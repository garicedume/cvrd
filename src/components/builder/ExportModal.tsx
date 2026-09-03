'use client';

import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { TEMPLATES_LIST } from '../../lib/templatesData';
import { ShieldCheck, AlertTriangle, Download, X, CheckCircle2, Lock } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTemplateId: string;
  isB2B: boolean;
  hasPaid: boolean;
  onPaymentSuccess: (details: any) => void;
  onGeneratePDF: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  activeTemplateId,
  isB2B,
  hasPaid,
  onPaymentSuccess,
  onGeneratePDF,
}) => {
  const [step, setStep] = useState<'review' | 'checkout'>(hasPaid || isB2B ? 'checkout' : 'review');
  const [isDataVerified, setIsDataVerified] = useState(false);

  if (!isOpen) return null;

  const currentTemplate = TEMPLATES_LIST.find((t) => t.id === activeTemplateId) || TEMPLATES_LIST[0];
  const priceAmount = currentTemplate?.category === 'premium' ? '5.00' : '2.00';
  const isFreeToExport = isB2B || hasPaid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4 font-poppins">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative space-y-6">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER MODAL */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">Exportar CV en Alta Definición</h3>
            <p className="text-xs text-gray-500 font-medium">
              Plantilla: <span className="font-bold text-gray-800">{currentTemplate.name}</span>
            </p>
          </div>
        </div>

        {/* PASO 1: ADVERTENCIA Y VERIFICACIÓN PRE-PAGO (CONFIRMACIÓN OBLIGATORIA) */}
        {step === 'review' && !isFreeToExport && (
          <div className="space-y-5">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>ADVERTENCIA 1 DE 2: Revisión Pre-Pago</span>
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed font-medium">
                Por favor, verifica detalladamente la ortografía, números de teléfono y datos personales antes de proceder[cite: 7]. 
                <strong className="block mt-1 text-amber-950">
                  ¡Nota Pro! Una vez procesado el pago, podrás editar este CV libremente sin volver a pagar[cite: 7].
                </strong>
              </p>
            </div>

            <label className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={isDataVerified}
                onChange={(e) => setIsDataVerified(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
              />
              <span className="text-xs text-gray-700 font-medium">
                Confirmo que he revisado minuciosamente mis datos y estoy listo para procesar mi plantilla[cite: 7].
              </span>
            </label>

            <button
              disabled={!isDataVerified}
              onClick={() => setStep('checkout')}
              className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                isDataVerified
                  ? 'bg-gray-900 text-white hover:bg-amber-400 hover:text-gray-950 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continuar a Pasarela de Pago (${priceAmount} USD)</span>[cite: 7]
            </button>
          </div>
        )}

        {/* PASO 2: CHECKOUT CON PAYPAL O DESCARGA DIRECTA */}
        {(step === 'checkout' || isFreeToExport) && (
          <div className="space-y-5">
            {isFreeToExport ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                  {isB2B ? 'Licencia B2B Empresarial Activa' : 'Pago Confirmado para esta Plantilla'}[cite: 7]
                </h4>
                <p className="text-xs text-emerald-800 font-medium">
                  Tu PDF se generará en formato Carta Vectorial (8.5&quot; x 11&quot;) sin marcas de agua[cite: 7].
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-gray-900">Total a pagar</p>
                    <p className="text-[10px] text-gray-500">Acceso ilimitado de edición para esta plantilla</p>[cite: 7]
                  </div>
                  <span className="text-lg font-black text-amber-600 font-mono">${priceAmount} USD</span>[cite: 7]
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider justify-center">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ADVERTENCIA 2 DE 2: Pago Seguro Procesado por PayPal</span>[cite: 7]
                  </div>

                  <PayPalScriptProvider options={{ clientId: "test", currency: "USD" }}>
                    <PayPalButtons
                      style={{ layout: "vertical", shape: "rect", label: "pay" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              description: `Plantilla CVRD: ${currentTemplate.name}`,
                              amount: {
                                currency_code: "USD",
                                value: priceAmount,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.order) {
                          const details = await actions.order.capture();
                          onPaymentSuccess(details);
                        }
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            )}

            {isFreeToExport && (
              <button
                onClick={onGeneratePDF}
                className="w-full py-4 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Descargar PDF Vectorial Gratis</span>[cite: 7]
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};