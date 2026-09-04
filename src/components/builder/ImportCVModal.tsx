'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileText, X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useCV } from '../../context/CVContext';

interface ImportCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileAccepted?: (file: File) => void;
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const ImportCVModal: React.FC<ImportCVModalProps> = ({
  isOpen,
  onClose,
  onFileAccepted,
}) => {
  const router = useRouter();

  let updateCVData = (data: any) => {};
  let updateContact = (contact: any) => {};

  try {
    const cvContext = useCV();
    updateCVData = cvContext.updateCVData;
    updateContact = cvContext.updateContact;
  } catch (e) {
    // Entorno sin proveedor ignorado
  }

  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);

    if (!ALLOWED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf') && !file.name.toLowerCase().endsWith('.docx')) {
      setError('Formato no permitido. Por favor sube un archivo PDF o Word (.docx).');
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('El archivo supera el límite de 5MB. Por favor elige uno más liviano.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    if (onFileAccepted) {
      onFileAccepted(selectedFile);
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/parse-cv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error al procesar el archivo.');
      }

      if (result.parsedData) {
        const parsed = result.parsedData;

        // 🛡️ Asignación segura de contacto
        if (parsed.contact && typeof parsed.contact === 'object') {
          updateContact({
            fullName: parsed.contact.fullName || '',
            professionalTitle: parsed.contact.professionalTitle || '',
            phone: parsed.contact.phone || '',
            email: parsed.contact.email || '',
            city: parsed.contact.city || '',
            country: parsed.contact.country || '',
          });
        }

        // 🛡️ Mapeos blindados para evitar errores de tipo 'is not a function'
        const safeExperiences = Array.isArray(parsed.experiences) ? parsed.experiences : [];
        const safeEducation = Array.isArray(parsed.education) ? parsed.education : [];
        const safeSkills = Array.isArray(parsed.skills) ? parsed.skills : [];
        const safeLanguages = Array.isArray(parsed.languages) ? parsed.languages : [];

        updateCVData({
          summary: parsed.summary || '',
          experiences: safeExperiences.map((exp: any, index: number) => ({
            id: `exp-imported-${index}-${Date.now()}`,
            company: exp.company || '',
            position: exp.position || '',
            cityCountry: '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || 'Presente',
            isCurrent: false,
            responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : [exp.responsibilities || ''],
            achievements: '',
          })),
          education: safeEducation.map((edu: any, index: number) => ({
            id: `edu-imported-${index}-${Date.now()}`,
            degree: edu.degree || '',
            institution: edu.institution || '',
            cityCountry: '',
            startDate: edu.startDate || '',
            endDate: edu.endDate || '',
            isCurrent: false,
          })),
          skills: safeSkills.map((sk: any, index: number) => ({
            id: `sk-imported-${index}-${Date.now()}`,
            name: typeof sk === 'string' ? sk : (sk.name || ''),
            level: 'Avanzado',
            category: sk.category || 'technical',
          })),
          languages: safeLanguages.map((lang: any, index: number) => ({
            id: `lang-imported-${index}-${Date.now()}`,
            language: typeof lang === 'string' ? lang : (lang.language || ''),
            proficiency: lang.proficiency || 'Intermedio',
          })),
        });
      }

      setIsProcessing(false);
      onClose();
      router.push('/builder');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocurrió un error inesperado al conectar con el servidor.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/80 backdrop-blur-sm p-4 font-poppins">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative space-y-6">
        
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">¿Ya tienes un CV?</h3>
            <p className="text-xs text-gray-500 font-medium">
              Sube tu archivo y lo transformamos automáticamente.
            </p>
          </div>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
            dragActive
              ? 'border-amber-500 bg-amber-50/50 scale-[1.01]'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleChange}
            disabled={isProcessing}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-amber-500">
            {selectedFile ? <FileText className="w-7 h-7 text-emerald-600" /> : <UploadCloud className="w-7 h-7" />}
          </div>

          {selectedFile ? (
            <div className="space-y-1">
              <p className="text-xs font-black text-emerald-700 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {selectedFile.name}
              </p>
              <p className="text-[10px] text-gray-500 font-medium">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB — Listo para procesar
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-black text-gray-800">
                Arrastra y suelta tu CV aquí, o <span className="text-amber-600 underline">búscalo en tu equipo</span>
              </p>
              <p className="text-[10px] text-gray-400 font-medium">
                Formatos: PDF, Word (.docx) (Máximo 5MB)
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-red-700 text-xs font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          disabled={!selectedFile || isProcessing}
          onClick={handleConfirmUpload}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
            selectedFile && !isProcessing
              ? 'bg-gray-900 text-white hover:bg-amber-400 hover:text-gray-950 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              <span>Transformando con IA...</span>
            </>
          ) : (
            <span>Transformar y Extraer Datos con IA</span>
          )}
        </button>

      </div>
    </div>
  );
};