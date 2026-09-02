'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { CVProvider, useCV } from '../../context/CVContext';
import { StyleControls } from '../../components/builder/StyleControls';
import { ExportModal } from '../../components/builder/ExportModal';
import { TEMPLATE_COMPONENTS } from '../../lib/templateRegistry';
import { TEMPLATES_LIST } from '../../lib/templatesData';
import { getExportPermissions } from '../../lib/permissions';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Briefcase, GraduationCap, Wrench, Languages, Layers, 
  Download, Plus, Trash2, ShieldCheck, Image as ImageIcon,
  Award, Link as LinkIcon, Info, Sparkles, Sliders
} from 'lucide-react';

type BuilderTab = 'info' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'cvrd_extra' | 'extras' | 'styles';

function BuilderContent() {
  const { 
    cvData, activeTemplateId, setActiveTemplateId, updateContact, updateCVData,
    handlePhotoUpload, removePhoto,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addSkill, updateSkill, removeSkill,
    addLanguage, updateLanguage, removeLanguage,
    addCertification, updateCertification, removeCertification,
  } = useCV();

  const { isB2B } = useAuth();
  const searchParams = useSearchParams();
  const templateFromUrl = searchParams.get('template');

  const containerRef = useRef<HTMLDivElement>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);
  
  const [scale, setScale] = useState<number>(0.65);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [paidTemplates, setPaidTemplates] = useState<Record<string, boolean>>({});

  // Cargar estado de pagos guardados desde localStorage
  useEffect(() => {
    const savedPayments = localStorage.getItem('cvrd_paid_templates');
    if (savedPayments) {
      try {
        setPaidTemplates(JSON.parse(savedPayments));
      } catch (e) {
        console.error('Error al cargar historial de pagos:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (templateFromUrl && TEMPLATE_COMPONENTS[templateFromUrl]) {
      setActiveTemplateId(templateFromUrl);
    }
  }, [templateFromUrl, setActiveTemplateId]);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth - 32;
      const targetWidth = 816;
      const calculatedScale = Math.min(Math.max(containerWidth / targetWidth, 0.4), 1.0);
      setScale(calculatedScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const [activeTab, setActiveTab] = useState<BuilderTab>('info');
  const [photoError, setPhotoError] = useState<string | null>(null);

  const ComponentToRender = TEMPLATE_COMPONENTS[activeTemplateId] || TEMPLATE_COMPONENTS['AcademicResearchTemplate'];

  // Verificar si la plantilla actual está pagada o si la cuenta es B2B
  const isCurrentPaid = Boolean(paidTemplates[activeTemplateId]);
  const permissions = getExportPermissions(isB2B || isCurrentPaid);

  const handlePaymentSuccess = (details: any) => {
    const updated = { ...paidTemplates, [activeTemplateId]: true };
    setPaidTemplates(updated);
    localStorage.setItem('cvrd_paid_templates', JSON.stringify(updated));
    alert(`¡Pago exitoso! Gracias ${details.payer?.name?.given_name || ''}. Tu plantilla ha sido desbloqueada permanentemente.`);
  };

  // Motor de Exportación a PDF Vectorial Alta Definición
  // Motor de Exportación a PDF Vectorial Alta Definición
  const handleGeneratePDF = async () => {
    if (!printAreaRef.current) return;

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = printAreaRef.current;

      const opt = {
        margin: 0,
        filename: `CV_${cvData.contact.fullName.replace(/\s+/g, '_')}_CVRD.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 3, // Ultra alta resolución 300 DPI
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
      setIsExportModalOpen(false);
    } catch (error) {
      console.error('Error al generar PDF vectorial:', error);
      alert('Ocurrió un inconveniente al generar el PDF. Por favor, intenta nuevamente.');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    if (e.target.files && e.target.files[0]) {
      const res = handlePhotoUpload(e.target.files[0]);
      if (!res.success && res.error) {
        setPhotoError(res.error);
      }
    }
  };

  const allTabs: { id: BuilderTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'info', label: '1. Datos', icon: User },
    { id: 'summary', label: '2. Perfil', icon: User },
    { id: 'experience', label: '3. Experiencia', icon: Briefcase },
    { id: 'education', label: '4. Educación', icon: GraduationCap },
    { id: 'skills', label: '5. Habilidades', icon: Wrench },
    { id: 'languages', label: '6. Idiomas', icon: Languages },
    { id: 'cvrd_extra', label: '7. CVRD Extras', icon: Info },
    { id: 'extras', label: '8. Opcionales', icon: Award },
    { id: 'styles', label: '9. Estilos & Color', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-poppins py-6 selection:bg-amber-400 selection:text-gray-950 relative">
      
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Header Superior */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-gray-900">Editor CVRD Pro</h1>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {isCurrentPaid ? 'Plantilla Desbloqueada' : permissions.badgeLabel}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Hoja Carta Oficial (8.5&quot; x 11&quot;) — Sangrado 0.6 pulg</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={activeTemplateId}
              onChange={(e) => setActiveTemplateId(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-800 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {TEMPLATES_LIST.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category === 'premium' ? 'Premium $5' : 'Estándar $2'})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="px-6 py-2.5 bg-gray-900 hover:bg-amber-400 hover:text-gray-950 text-white font-black text-xs rounded-full transition-all flex items-center gap-2 shrink-0 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* PANEL IZQUIERDO: Formularios */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="grid grid-cols-3 gap-2 bg-gray-200/80 p-2 rounded-3xl border border-gray-300/80">
              {allTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-md font-black scale-[1.02]'
                        : 'bg-white text-gray-800 hover:text-gray-950 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : 'text-gray-600'}`} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs space-y-6">
              
              {/* 1. INFORMACIÓN PERSONAL */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-500" /> 01 — Datos Principales
                  </h2>
                  
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-amber-500" /> Fotografía
                      </span>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-600">
                        <input
                          type="checkbox"
                          checked={cvData.showPhoto}
                          onChange={(e) => updateCVData({ showPhoto: e.target.checked })}
                          className="rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                        />
                        Mostrar foto
                      </label>
                    </div>

                    {photoError && <p className="text-[11px] text-red-600 font-bold">{photoError}</p>}

                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors">
                        + Cargar Foto
                        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handlePhotoChange} className="hidden" />
                      </label>
                      {cvData.contact.photoUrl && (
                        <button type="button" onClick={removePhoto} className="text-xs text-red-500 hover:underline font-bold cursor-pointer">
                          Remover
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-gray-700">Nombre Completo</label>
                      <input
                        type="text"
                        value={cvData.contact.fullName}
                        onChange={(e) => updateContact({ fullName: e.target.value })}
                        className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 font-medium"
                        placeholder="Ej. Carlos Mendoza"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-700">Título / Cargo</label>
                      <input
                        type="text"
                        value={cvData.contact.professionalTitle}
                        onChange={(e) => updateContact({ professionalTitle: e.target.value })}
                        className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 font-medium"
                        placeholder="Ej. Ingeniero de Sistemas"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-700">Teléfono</label>
                        <input
                          type="text"
                          value={cvData.contact.phone}
                          onChange={(e) => updateContact({ phone: e.target.value })}
                          className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 font-medium"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-gray-700">Correo Electrónico</label>
                        <input
                          type="email"
                          value={cvData.contact.email}
                          onChange={(e) => updateContact({ email: e.target.value })}
                          className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-gray-700">Ciudad / País</label>
                      <input
                        type="text"
                        value={`${cvData.contact.city}, ${cvData.contact.country}`}
                        onChange={(e) => {
                          const parts = e.target.value.split(',');
                          updateContact({
                            city: parts[0] || '',
                            country: parts[1] ? parts[1].trim() : '',
                          });
                        }}
                        className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-amber-400 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Resto de Pestañas (Perfil, Experiencia, etc.) */}
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-500" /> 02 — Perfil Profesional
                    </h2>
                    <button 
                      type="button"
                      onClick={() => updateCVData({ 
                        summary: `${cvData.contact.professionalTitle || 'Profesional'} con más de 6 años de experiencia liderando proyectos de transformación digital y desarrollo de software escalable en República Dominicana.` 
                      })}
                      className="text-[11px] bg-amber-400 text-gray-950 font-black px-3.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-amber-300 cursor-pointer transition-all shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gray-950" /> Asistente IA
                    </button>
                  </div>

                  <textarea
                    rows={7}
                    value={cvData.summary}
                    onChange={(e) => updateCVData({ summary: e.target.value })}
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-amber-500" /> 03 — Experiencia ({cvData.experiences.length}/3)
                    </h2>
                    {cvData.experiences.length < 3 && (
                      <button type="button" onClick={addExperience} className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer">
                        <Plus className="w-3.5 h-3.5 text-amber-400" /> Añadir
                      </button>
                    )}
                  </div>

                  {cvData.experiences.map((exp, idx) => (
                    <div key={exp.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 text-xs relative">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-amber-600 uppercase text-[10px]">Puesto #{idx + 1}</span>
                        <button type="button" onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                          className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium"
                          placeholder="Cargo"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium"
                          placeholder="Empresa"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : (exp.responsibilities || '')}
                        onChange={(e) => updateExperience(exp.id, { responsibilities: e.target.value })}
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium"
                        placeholder="Logros y responsabilidades"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-500" /> 04 — Educación ({cvData.education.length}/3)
                    </h2>
                    {cvData.education.length < 3 && (
                      <button type="button" onClick={addEducation} className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer">
                        <Plus className="w-3.5 h-3.5 text-amber-400" /> Añadir
                      </button>
                    )}
                  </div>

                  {cvData.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 text-xs relative">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-amber-600 uppercase text-[10px]">Título #{idx + 1}</span>
                        <button type="button" onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium"
                          placeholder="Título Obtenido"
                        />
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium"
                          placeholder="Institución"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-500" /> 05 — Habilidades
                    </h2>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => addSkill('technical')} className="px-3 py-1 bg-gray-900 text-white rounded-full text-[11px] font-bold cursor-pointer">
                        + Técnica
                      </button>
                      <button type="button" onClick={() => addSkill('soft')} className="px-3 py-1 bg-amber-400 text-gray-950 rounded-full text-[11px] font-bold cursor-pointer">
                        + Blanda
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {cvData.skills.map((sk) => (
                      <div key={sk.id} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-2xl text-xs">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${sk.category === 'technical' ? 'bg-gray-200 text-gray-800' : 'bg-amber-100 text-amber-900'}`}>
                          {sk.category === 'technical' ? 'TÉCNICA' : 'BLANDA'}
                        </span>
                        <input
                          type="text"
                          value={sk.name}
                          onChange={(e) => updateSkill(sk.id, { name: e.target.value })}
                          className="grow p-2 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium"
                        />
                        <button type="button" onClick={() => removeSkill(sk.id)} className="text-red-500 p-1 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'languages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                      <Languages className="w-4 h-4 text-amber-500" /> 06 — Idiomas
                    </h2>
                    <button type="button" onClick={addLanguage} className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer">
                      <Plus className="w-3.5 h-3.5 text-amber-400" /> Añadir Idioma
                    </button>
                  </div>

                  <div className="space-y-2">
                    {cvData.languages.map((lang) => (
                      <div key={lang.id} className="grid grid-cols-12 gap-2 p-2 bg-gray-50 border border-gray-200 rounded-2xl text-xs items-center">
                        <input
                          type="text"
                          value={lang.language}
                          onChange={(e) => updateLanguage(lang.id, { language: e.target.value })}
                          className="col-span-6 p-2 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium"
                        />
                        <select
                          value={lang.proficiency || 'Intermedio'}
                          onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value as any })}
                          className="col-span-5 p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                        >
                          <option value="Básico">Básico</option>
                          <option value="Intermedio">Intermedio</option>
                          <option value="Avanzado">Avanzado</option>
                          <option value="Profesional">Profesional</option>
                          <option value="Nativo">Nativo</option>
                        </select>
                        <button type="button" onClick={() => removeLanguage(lang.id)} className="col-span-1 text-red-500 p-1 cursor-pointer flex justify-center">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'cvrd_extra' && (
                <div className="space-y-6 text-xs">
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-500" /> 07 — Diferenciadores CVRD
                  </h2>

                  <div className="space-y-3">
                    <span className="font-bold text-gray-800 flex items-center gap-1.5">
                      <LinkIcon className="w-4 h-4 text-amber-500" /> Enlaces Profesionales
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="LinkedIn URL"
                        value={cvData.contact.links?.linkedin || ''}
                        onChange={(e) => updateContact({ links: { ...cvData.contact.links, linkedin: e.target.value } })}
                        className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                      />
                      <input
                        type="text"
                        placeholder="Portafolio URL"
                        value={cvData.contact.links?.website || ''}
                        onChange={(e) => updateContact({ links: { ...cvData.contact.links, website: e.target.value } })}
                        className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'extras' && (
                <div className="space-y-6">
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" /> 08 — Secciones Opcionales
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                        Certificaciones
                      </span>
                      <button type="button" onClick={addCertification} className="text-xs font-bold text-amber-600 cursor-pointer">+ Añadir</button>
                    </div>
                    {(cvData.certifications || []).map((cert) => (
                      <div key={cert.id} className="flex gap-2 text-xs">
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => updateCertification(cert.id, { title: e.target.value })}
                          className="grow p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                        />
                        <button type="button" onClick={() => removeCertification(cert.id)} className="text-red-500 p-1 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'styles' && <StyleControls />}

            </div>
          </div>

          {/* PANEL DERECHO: MESA DE TRABAJO Y PREVIEW CON MARCA DE AGUA LÓGICA */}
          <div className="lg:col-span-7 sticky top-6">
            <div 
              ref={containerRef}
              className="relative w-full `min-h-195` bg-white rounded-3xl border border-gray-200/90 shadow-xs flex justify-center items-start p-6 overflow-hidden"
            >
              <div 
                ref={printAreaRef}
                className="shrink-0 bg-white shadow-2xl relative transition-transform duration-150 origin-top rounded-none border border-gray-100 overflow-hidden"
                style={{
                  width: '816px',
                  height: '1056px',
                  transform: `scale(${scale})`,
                  marginBottom: `calc((1056px * ${scale}) - 1056px)`,
                  fontFamily: cvData.fontFamily,
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{
                    fontSize: `${(cvData.fontSizeScale || 1.0) * 100}%`,
                    // @ts-ignore
                    zoom: cvData.fontSizeScale || 1.0,
                  }}
                >
                  <ComponentToRender data={{ ...cvData, templateId: activeTemplateId }} />
                </div>

                {/* Marca de agua: Se remueve automáticamente tras confirmación de pago o en B2B */}
                {permissions.hasWatermark && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 opacity-10">
                    <span className="text-6xl font-black text-gray-950 -rotate-30 uppercase tracking-widest select-none">
                      PREVIA — CVRD.DO
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute bottom-6 right-6 z-20">
                <span className="bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[11px] font-bold shadow-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  {permissions.hasWatermark ? 'Marca de agua activa' : 'Exportación Limpia B2B'}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* MODAL FASE 7: ADVERTENCIAS, PAYPAL Y PDF VECTORIAL */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        activeTemplateId={activeTemplateId}
        isB2B={isB2B}
        hasPaid={isCurrentPaid}
        onPaymentSuccess={handlePaymentSuccess}
        onGeneratePDF={handleGeneratePDF}
      />

    </div>
  );
}

export default function BuilderPage() {
  return (
    <CVProvider>
      <Suspense fallback={
        <div className="min-h-[60vh] flex items-center justify-center font-poppins">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-400"></div>
        </div>
      }>
        <BuilderContent />
      </Suspense>
    </CVProvider>
  );
}