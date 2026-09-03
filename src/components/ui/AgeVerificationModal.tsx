'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function AgeVerificationModal() {
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('age_verified');
    if (!verified) {
      setIsVerified(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('age_verified', 'true');
    setIsVerified(true);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isVerified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Acceso Restringido (+18)</h2>
        <p className="text-zinc-400 text-sm mb-6">
          Este sitio contiene contenido exclusivo y servicios para mayores de edad. Por favor, confirma tu edad para continuar.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-xl transition-colors"
          >
            No tengo 18 años
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-600/30"
          >
            Sí, soy mayor de 18
          </button>
        </div>
      </div>
    </div>
  );
}