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
  Award, Link as LinkIcon, Info, Sparkles, Sliders, Users, Mail, Phone, MapPin, Globe, Quote
} from 'lucide-react';

type BuilderTab = 'info' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'references' | 'cvrd_extra' | 'extras' | 'styles';

// ==========================================
// PLANTILLA INTEGRADA CON DISEÑO OPTIMIZADO
// ==========================================
function AcademicResearchTemplate({ data }: { data: any }) {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#6b21a8',
  } = data;

  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#6b21a8'
      : colorScheme || '#6b21a8';

  const rawName = (contact?.fullName || 'Carlos Mendoza').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  const getPhotoRadius = () => {
    switch (contact?.photoShape) {
      case 'square':
        return 'rounded-none aspect-square';
      case 'rounded':
        return 'rounded-xl aspect-[3/4]';
      default:
        return 'rounded-full aspect-square';
    }
  };

  const validExperiences = experiences.filter(
    (exp: any) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu: any) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s: any) => s.name?.trim());
  const validLanguages = languages.filter((l: any) => l.language?.trim());
  const validReferences = references.filter((r: any) => r.name?.trim());

  const getSkillPercent = (level?: string) => {
    switch (level) {
      case 'Experto': return 92;
      case 'Avanzado': return 78;
      case 'Intermedio': return 62;
      case 'Básico': return 45;
      default: return 70;
    }
  };

  const getResponsibilitiesArray = (responsibilities?: string[] | string): string[] => {
    if (!responsibilities) return [];
    if (Array.isArray(responsibilities)) {
      return responsibilities.filter((r: string) => Boolean(r && r.trim()));
    }
    return responsibilities
      .split('\n')
      .map((r: string) => r.trim())
      .filter((r: string) => Boolean(r));
  };

  return (
    <div
      className={`relative bg-white font-${
        fontFamily || 'Inter'
      } text-[10px] leading-relaxed grid grid-cols-[35%_63%] gap-[2%] selection:bg-[#e5e5e5] overflow-hidden box-border`}
      style={{ width: '816px', minHeight: '1056px', padding: '0.6in', color: '#171717', backgroundColor: '#ffffff' }}
    >
      {/* Columna Izquierda: Foto, Educación, Idiomas, Referencias */}
      <div className="bg-[#1a1829] text-[#ffffff] p-4 rounded-t-[28px] rounded-b-[28px] flex flex-col justify-start space-y-4 shadow-md">
        {contact?.photoUrl ? (
          <div className="flex justify-center pt-2">
            <div
              className="w-28 h-28 p-1 border-2 shadow-xl flex items-center justify-center overflow-hidden bg-[#171717]"
              style={{
                borderColor: accent,
                borderRadius: contact.photoShape === 'square' ? '0px' : contact.photoShape === 'rounded' ? '16px' : '9999px'
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={contact.photoUrl}
                alt={rawName}
                className={`w-full h-full object-cover grayscale contrast-125 ${getPhotoRadius()}`}
              />
            </div>
          </div>
        ) : (
          <div
            className="w-28 h-28 mx-auto border-4 bg-[#171717] flex flex-col items-center justify-center text-[#ffffff] shadow-xl"
            style={{
              borderColor: accent,
              borderRadius: contact.photoShape === 'square' ? '0px' : contact.photoShape === 'rounded' ? '16px' : '9999px'
            }}
          >
            <User className="w-9 h-9 mb-1 opacity-70" style={{ color: accent }} />
            <span className="text-xs font-black tracking-widest">{initials}</span>
          </div>
        )}

        {validEducation.length > 0 && (
          <section className="space-y-2 pt-2 border-t border-white/15">
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <div className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]" style={{ backgroundColor: accent }}>
                <GraduationCap className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[11.5px] font-black uppercase tracking-wider text-[#ffffff]">Educación</h2>
            </div>
            <div className="space-y-2 pl-0.5">
              {validEducation.map((edu: any) => (
                <div key={edu.id} className="space-y-0.5">
                  {edu.institution && (
                    <p className="text-[8.5px] font-semibold text-[#a3a3a3] italic">{edu.institution}</p>
                  )}
                  <h3 className="font-bold text-[9.5px] uppercase tracking-wide text-[#ffffff]">{edu.degree || 'Título Académico'}</h3>
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-[9px] font-bold tracking-wide" style={{ color: accent }}>
                      {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {validLanguages.length > 0 && (
          <section className="space-y-2 pt-2 border-t border-white/15">
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <div className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]" style={{ backgroundColor: accent }}>
                <Languages className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[11.5px] font-black uppercase tracking-wider text-[#ffffff]">Idiomas</h2>
            </div>
            <div className="space-y-2 pt-0.5">
              {validLanguages.map((lang: any) => {
                const percent = getSkillPercent(lang.proficiency);
                return (
                  <div key={lang.id} className="space-y-0.5">
                    <div className="flex justify-between text-[9px]">
                      <span className="font-semibold text-[#ffffff]">{lang.language}</span>
                      <span className="text-[#a3a3a3] text-[8px]">{lang.proficiency}</span>
                    </div>
                    <div className="relative w-full h-1 bg-white/20 rounded-full flex items-center">
                      <div className="h-full rounded-full" style={{ backgroundColor: accent, width: `${percent}%` }} />
                      <div className="absolute w-2 h-2 bg-[#ffffff] rounded-full shadow-xs -ml-1 border border-[#171717]" style={{ left: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {validReferences.length > 0 && (
          <section className="space-y-2 pt-2 border-t border-white/15">
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <div className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]" style={{ backgroundColor: accent }}>
                <Quote className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[11.5px] font-black uppercase tracking-wider text-[#ffffff]">Referencias</h2>
            </div>
            <div className="space-y-2 pl-0.5 text-[9px] text-[#d4d4d4]">
              {validReferences.slice(0, 2).map((ref: any) => (
                <div key={ref.id} className="space-y-0.5 border-b border-white/10 pb-1">
                  <p className="font-bold text-[#ffffff] text-[9.5px]">{ref.name}</p>
                  <p className="text-[#a3a3a3] italic">{ref.relationship} {ref.company ? `/ ${ref.company}` : ''}</p>
                  {ref.phone && <p style={{ color: accent }}>Tel: {ref.phone}</p>}
                  {ref.email && <p className="text-[#a3a3a3] break-all text-[8px]">{ref.email}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Columna Derecha: Nombre agrandado 50%, Datos Centralizados, Experiencia y Habilidades */}
      <div className="flex flex-col justify-start space-y-3">
        <header className="space-y-2 text-center pt-1">
          <h1 className="text-4xl sm:text-5xl tracking-tight text-[#0a0a0a] uppercase leading-none">
            <span className="font-black">{firstName}</span>{' '}
            <span className="font-light text-[#404040]">{lastName}</span>
          </h1>

          {contact?.professionalTitle && (
            <div>
              <span
                className="inline-block px-4 py-1 text-[#ffffff] text-[10.5px] font-black uppercase tracking-[0.2em] rounded-full shadow-xs"
                style={{ backgroundColor: accent }}
              >
                {contact.professionalTitle}
              </span>
            </div>
          )}
        </header>

        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
          {contact?.phone && (
            <div className="px-3 py-1 rounded-full text-[#ffffff] text-[9px] font-medium flex items-center gap-1.5 shadow-xs" style={{ backgroundColor: accent }}>
              <Phone className="w-3 h-3" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact?.email && (
            <div className="px-3 py-1 rounded-full text-[#ffffff] text-[9px] font-medium flex items-center gap-1.5 shadow-xs" style={{ backgroundColor: accent }}>
              <Mail className="w-3 h-3" />
              <span className="truncate max-w-40">{contact.email}</span>
            </div>
          )}
          {contact?.links?.website && (
            <div className="px-3 py-1 rounded-full text-[#ffffff] text-[9px] font-medium flex items-center gap-1.5 shadow-xs" style={{ backgroundColor: accent }}>
              <Globe className="w-3 h-3" />
              <span className="truncate max-w-32">{contact.links.website}</span>
            </div>
          )}
          {(contact?.city || contact?.country) && (
            <div className="px-3 py-1 rounded-full text-[#ffffff] text-[9px] font-medium flex items-center gap-1.5 shadow-xs" style={{ backgroundColor: accent }}>
              <MapPin className="w-3 h-3" />
              <span>{[contact.city, contact.country].filter(Boolean).join(', ')}</span>
            </div>
          )}
        </div>

        {summary && (
          <p className="text-[9.5px] text-[#525252] leading-relaxed text-justify pt-1 px-1">
            {summary}
          </p>
        )}

        {validExperiences.length > 0 && (
          <section className="space-y-2 pt-2">
            <div className="flex items-center gap-2 border-b border-[#d4d4d4] pb-1">
              <div className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]" style={{ backgroundColor: accent }}>
                <Briefcase className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[12px] font-black uppercase tracking-wider text-[#0a0a0a]">Experiencia Laboral</h2>
            </div>
            <div className="space-y-2.5">
              {validExperiences.map((exp: any) => {
                const respList = getResponsibilitiesArray(exp.responsibilities);
                return (
                  <div key={exp.id} className="flex items-start gap-2.5">
                    <div
                      className="shrink-0 w-5 py-2 px-1 rounded-full text-[#ffffff] text-[8px] font-black uppercase tracking-wider flex items-center justify-center text-center shadow-xs"
                      style={{
                        backgroundColor: accent,
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {exp.startDate || '2022'}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      {exp.company && (
                        <p className="text-[9px] font-semibold text-[#737373] italic">{exp.company}</p>
                      )}
                      <h3 className="font-bold text-[9.5px] uppercase tracking-wide text-[#0a0a0a]">{exp.position || 'Puesto Laboral'}</h3>
                      {respList.length > 0 && (
                        <ul className="space-y-0.5 pt-0.5 text-[9px] text-[#525252] leading-relaxed">
                          {respList.map((resp: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="font-bold shrink-0 mt-0.5" style={{ color: accent }}>•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {validSkills.length > 0 && (
          <section className="space-y-2 pt-2">
            <div className="flex items-center gap-2 border-b border-[#d4d4d4] pb-1">
              <div className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]" style={{ backgroundColor: accent }}>
                <Sliders className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[12px] font-black uppercase tracking-wider text-[#0a0a0a]">Habilidades</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-0.5">
              {validSkills.map((skill: any) => {
                const percent = getSkillPercent(skill.level);
                return (
                  <div key={skill.id} className="space-y-0.5">
                    <div className="flex justify-between text-[9px] font-bold text-[#262626]">
                      <span>{skill.name}</span>
                    </div>
                    <div className="relative w-full h-1 bg-[#e5e5e5] rounded-full flex items-center">
                      <div className="h-full rounded-full" style={{ backgroundColor: accent, width: `${percent}%` }} />
                      <div className="absolute w-2 h-2 rounded-full shadow-xs -ml-1 border border-[#ffffff]" style={{ backgroundColor: accent, left: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL BUILDER
// ==========================================
function BuilderContent() {
  const { 
    cvData, activeTemplateId, setActiveTemplateId, updateContact, updateCVData,
    handlePhotoUpload, removePhoto,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addSkill, updateSkill, removeSkill,
    addLanguage, updateLanguage, removeLanguage,
    addReference, updateReference, removeReference,
  } = useCV();

  const { isB2B } = useAuth();
  const searchParams = useSearchParams();
  const templateFromUrl = searchParams.get('template');

  // 🚀 AQUÍ ESTABA EL DETALLE FALTANTE:
  const ComponentToRender = TEMPLATE_COMPONENTS[activeTemplateId] || TEMPLATE_COMPONENTS['AcademicResearchTemplate'];

  const containerRef = useRef<HTMLDivElement>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);
  // ... resto del código
  
  const [scale, setScale] = useState<number>(0.65);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [paidTemplates, setPaidTemplates] = useState<Record<string, boolean>>({});
  const [photoError, setPhotoError] = useState<string | null>(null);

  useEffect(() => {
    const savedPayments = localStorage.getItem('cvrd_paid_templates');
    if (savedPayments) {
      try { setPaidTemplates(JSON.parse(savedPayments)); } catch (e) { console.error(e); }
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

  const isCurrentPaid = Boolean(paidTemplates[activeTemplateId]);
  const permissions = getExportPermissions(isB2B || isCurrentPaid);

  const handlePaymentSuccess = (details: any) => {
    const updated = { ...paidTemplates, [activeTemplateId]: true };
    setPaidTemplates(updated);
    localStorage.setItem('cvrd_paid_templates', JSON.stringify(updated));
    alert(`¡Plantilla desbloqueada permanentemente!`);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    if (e.target.files && e.target.files[0]) {
      const res = handlePhotoUpload(e.target.files[0]);
      if (!res.success && res.error) setPhotoError(res.error);
    }
  };

  // Motor de Exportación Multi-Página Estilo Cascada/Word
  const handleGeneratePDF = async () => {
    if (!printAreaRef.current) return;
    try {
      const html2canvasPro = (await import('html2canvas-pro')).default;
      const { jsPDF } = await import('jspdf');
      
      // Seleccionamos todas las páginas físicas virtuales renderizadas en cascada
      const pages = printAreaRef.current.querySelectorAll('.cv-page-sheet');
      const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });

      for (let i = 0; i < pages.length; i++) {
        const pageElement = pages[i] as HTMLElement;
        const canvas = await html2canvasPro(pageElement, { scale: 3, useCORS: true, logging: false });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11);
      }

      pdf.save(`CV_${cvData.contact.fullName.replace(/\s+/g, '_')}_CVRD.pdf`);
      setIsExportModalOpen(false);
    } catch (error) {
      console.error('Error al generar PDF multi-página con html2canvas-pro:', error);
      alert('Ocurrió un inconveniente al generar el PDF.');
    }
  };

  const allTabs: { id: BuilderTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'info', label: '1. Datos', icon: User },
    { id: 'summary', label: '2. Perfil', icon: User },
    { id: 'experience', label: '3. Experiencia', icon: Briefcase },
    { id: 'education', label: '4. Educación', icon: GraduationCap },
    { id: 'skills', label: '5. Habilidades', icon: Wrench },
    { id: 'languages', label: '6. Idiomas', icon: Languages },
    { id: 'references', label: '7. Referencias', icon: Users },
    { id: 'cvrd_extra', label: '8. Extras', icon: Info },
    { id: 'styles', label: '9. Estilos', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-gray-900 font-poppins py-6 selection:bg-brand-yellow selection:text-gray-950 relative">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Header Superior */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-yellow text-gray-950 flex items-center justify-center font-black shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-gray-900">Editor CVRD Pro</h1>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {isCurrentPaid ? 'Plantilla Desbloqueada' : permissions.badgeLabel}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Hoja Carta Oficial (8.5&quot; x 11&quot;) — Cascada Multi-Página</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={activeTemplateId}
              onChange={(e) => setActiveTemplateId(e.target.value)}
              className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-bold text-gray-800 focus:outline-none focus:border-brand-yellow cursor-pointer"
            >
              {TEMPLATES_LIST.map((t) => (
                <option key={t.id} value={t.id}>{t.name} ({t.category === 'premium' ? 'Premium $5' : 'Estándar $2'})</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="px-6 py-2.5 bg-gray-900 hover:bg-brand-yellow hover:text-gray-950 text-white font-black text-xs rounded-full transition-all flex items-center gap-2 shrink-0 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4 text-brand-yellow" />
              <span>Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* PANEL IZQUIERDO: Formularios */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 rounded-3xl border border-gray-300">
              {allTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                      isActive ? 'bg-gray-900 text-white shadow-md font-black scale-[1.02]' : 'bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-yellow' : 'text-gray-500'}`} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-6">
              
              {/* 1. INFORMACIÓN PERSONAL */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-yellow" /> 01 — Datos Principales
                  </h2>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-brand-yellow" /> Fotografía</span>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-600">
                        <input type="checkbox" checked={cvData.showPhoto} onChange={(e) => updateCVData({ showPhoto: e.target.checked })} className="rounded border-gray-300 text-brand-yellow focus:ring-brand-yellow" />
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
                        <button type="button" onClick={removePhoto} className="text-xs text-red-500 hover:underline font-bold cursor-pointer">Remover</button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-gray-700">Nombre Completo</label>
                      <input type="text" value={cvData.contact.fullName} onChange={(e) => updateContact({ fullName: e.target.value })} className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-brand-yellow font-medium" />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700">Título / Cargo</label>
                      <input type="text" value={cvData.contact.professionalTitle} onChange={(e) => updateContact({ professionalTitle: e.target.value })} className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-brand-yellow font-medium" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-gray-700">Teléfono</label>
                        <input type="text" value={cvData.contact.phone} onChange={(e) => updateContact({ phone: e.target.value })} className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-brand-yellow font-medium" />
                      </div>
                      <div>
                        <label className="font-bold text-gray-700">Correo Electrónico</label>
                        <input type="email" value={cvData.contact.email} onChange={(e) => updateContact({ email: e.target.value })} className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-brand-yellow font-medium" />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-gray-700">Ciudad / País</label>
                      <input type="text" value={`${cvData.contact.city}, ${cvData.contact.country}`} onChange={(e) => {
                        const parts = e.target.value.split(',');
                        updateContact({ city: parts[0] || '', country: parts[1] ? parts[1].trim() : '' });
                      }} className="mt-1 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-brand-yellow font-medium" />
                    </div>
                  </div>
                </div>
              )}

              {/* PERFIL */}
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><User className="w-4 h-4 text-brand-yellow" /> 02 — Perfil Profesional</h2>
                  </div>
                  <textarea rows={7} value={cvData.summary} onChange={(e) => updateCVData({ summary: e.target.value })} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-900 leading-relaxed focus:outline-none focus:border-brand-yellow font-medium" />
                </div>
              )}

              {/* EXPERIENCIA */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><Briefcase className="w-4 h-4 text-brand-yellow" /> 03 — Experiencia</h2>
                    {cvData.experiences.length < 5 && (
                      <button type="button" onClick={addExperience} className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer"><Plus className="w-3.5 h-3.5 text-brand-yellow" /> Añadir</button>
                    )}
                  </div>
                  {cvData.experiences.map((exp, idx) => (
                    <div key={exp.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 text-xs relative">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-amber-600 uppercase text-[10px]">Puesto #{idx + 1}</span>
                        <button type="button" onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Cargo" />
                        <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Empresa" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={exp.startDate || ''} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Año Inicio (ej. 2020)" />
                        <input type="text" value={exp.endDate || ''} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Año Fin (ej. 2024)" />
                      </div>
                      <textarea rows={2} value={Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : (exp.responsibilities || '')} onChange={(e) => updateExperience(exp.id, { responsibilities: e.target.value })} className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Logros y responsabilidades" />
                    </div>
                  ))}
                </div>
              )}

              {/* EDUCACIÓN */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><GraduationCap className="w-4 h-4 text-brand-yellow" /> 04 — Educación</h2>
                    {cvData.education.length < 4 && (
                      <button type="button" onClick={addEducation} className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer"><Plus className="w-3.5 h-3.5 text-brand-yellow" /> Añadir Título</button>
                    )}
                  </div>

                  {cvData.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 text-xs relative">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-amber-600 uppercase text-[10px]">Título #{idx + 1}</span>
                        <button type="button" onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Título Obtenido" />
                        <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Institución" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-gray-600">Año de Inicio</label>
                          <input type="text" value={edu.startDate || ''} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} className="mt-1 w-full p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Ej. 2015" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-600">Año de Fin</label>
                          <input type="text" value={edu.endDate || ''} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} className="mt-1 w-full p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Ej. 2019" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* HABILIDADES */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><Wrench className="w-4 h-4 text-brand-yellow" /> 05 — Habilidades</h2>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => addSkill('technical')} className="px-3 py-1 bg-gray-900 text-white rounded-full text-[11px] font-bold cursor-pointer">+ Técnica</button>
                      <button type="button" onClick={() => addSkill('soft')} className="px-3 py-1 bg-brand-yellow text-gray-950 rounded-full text-[11px] font-bold cursor-pointer">+ Blanda</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {cvData.skills.map((sk) => (
                      <div key={sk.id} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-2xl text-xs">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${sk.category === 'technical' ? 'bg-gray-200 text-gray-800' : 'bg-amber-100 text-amber-900'}`}>{sk.category === 'technical' ? 'TÉCNICA' : 'BLANDA'}</span>
                        <input type="text" value={sk.name} onChange={(e) => updateSkill(sk.id, { name: e.target.value })} className="grow p-2 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" />
                        <button type="button" onClick={() => removeSkill(sk.id)} className="text-red-500 p-1 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* IDIOMAS */}
              {activeTab === 'languages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><Languages className="w-4 h-4 text-brand-yellow" /> 06 — Idiomas</h2>
                    <button type="button" onClick={addLanguage} className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer"><Plus className="w-3.5 h-3.5 text-brand-yellow" /> Añadir</button>
                  </div>
                  <div className="space-y-2">
                    {cvData.languages.map((lang) => (
                      <div key={lang.id} className="grid grid-cols-12 gap-2 p-2 bg-gray-50 border border-gray-200 rounded-2xl text-xs items-center">
                        <input type="text" value={lang.language} onChange={(e) => updateLanguage(lang.id, { language: e.target.value })} className="col-span-6 p-2 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" />
                        <select value={lang.proficiency || 'Intermedio'} onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value as any })} className="col-span-5 p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900">
                          <option value="Básico">Básico</option>
                          <option value="Intermedio">Intermedio</option>
                          <option value="Avanzado">Avanzado</option>
                          <option value="Profesional">Profesional</option>
                          <option value="Nativo">Nativo</option>
                        </select>
                        <button type="button" onClick={() => removeLanguage(lang.id)} className="col-span-1 text-red-500 p-1 cursor-pointer flex justify-center"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REFERENCIAS */}
              {activeTab === 'references' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><Users className="w-4 h-4 text-brand-yellow" /> 07 — Referencias</h2>
                    <button type="button" onClick={addReference} className="px-3 py-1.5 bg-gray-900 text-white rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer"><Plus className="w-3.5 h-3.5 text-brand-yellow" /> Añadir</button>
                  </div>
                  {cvData.references && cvData.references.map((ref, idx) => (
                    <div key={ref.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3 text-xs relative">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-amber-600 uppercase text-[10px]">Referencia #{idx + 1}</span>
                        <button type="button" onClick={() => removeReference(ref.id)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={ref.name} onChange={(e) => updateReference(ref.id, { name: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Nombre" />
                        <input type="text" value={ref.company} onChange={(e) => updateReference(ref.id, { company: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Empresa" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={ref.relationship} onChange={(e) => updateReference(ref.id, { relationship: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Relación" />
                        <input type="text" value={ref.phone} onChange={(e) => updateReference(ref.id, { phone: e.target.value })} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Teléfono" />
                      </div>
                      <input type="email" value={ref.email} onChange={(e) => updateReference(ref.id, { email: e.target.value })} className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium" placeholder="Correo" />
                    </div>
                  ))}
                </div>
              )}

              {/* EXTRAS */}
              {activeTab === 'cvrd_extra' && (
                <div className="space-y-6 text-xs">
                  <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><Info className="w-4 h-4 text-brand-yellow" /> 08 — Extras</h2>
                  <div className="space-y-3">
                    <span className="font-bold text-gray-800 flex items-center gap-1.5"><LinkIcon className="w-4 h-4 text-brand-yellow" /> Enlaces</span>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="LinkedIn URL" value={cvData.contact.links?.linkedin || ''} onChange={(e) => updateContact({ links: { ...cvData.contact.links, linkedin: e.target.value } })} className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium" />
                      <input type="text" placeholder="Portafolio URL" value={cvData.contact.links?.website || ''} onChange={(e) => updateContact({ links: { ...cvData.contact.links, website: e.target.value } })} className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'styles' && <StyleControls />}
            </div>
          </div>

          {/* PANEL DERECHO: PREVIEW MULTI-PÁGINA EN CASCADA (ESTILO WORD) */}
          <div className="lg:col-span-7 sticky top-6">
            <div ref={containerRef} className="relative w-full bg-gray-100 rounded-3xl border border-gray-200 shadow-inner flex flex-col items-center p-6 overflow-y-auto max-h-[85vh]">
              
              {/* Contenedor principal de hojas en cascada */}
              <div 
                ref={printAreaRef}
                className="flex flex-col items-center space-y-8 origin-top transition-transform duration-150"
                style={{
                  transform: `scale(${scale})`,
                  marginBottom: `calc((1056px * ${scale}) - 1056px)`,
                }}
              >
                {/* Hoja 1 (Página Principal) */}
                <div 
                  className="cv-page-sheet shrink-0 bg-white shadow-2xl relative rounded-none border border-gray-200 overflow-hidden"
                  style={{
                    width: '816px',
                    height: '1056px',
                    fontFamily: cvData.fontFamily,
                  }}
                >
                  <div className="w-full h-full">
                    <ComponentToRender data={{ ...cvData, templateId: activeTemplateId }} />
                  </div>
                  {permissions.hasWatermark && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 opacity-10">
                      <span className="text-6xl font-black text-gray-950 -rotate-30 uppercase tracking-widest select-none">PREVIA — CVRD.DO</span>
                    </div>
                  )}
                </div>

                {/* Hoja 2 Dinámica (Se activa si hay contenido adicional o experiencias extensas) */}
                {(cvData.experiences.length > 2 || cvData.education.length > 2 || (cvData.summary && cvData.summary.length > 300)) && (
                  <div 
                    className="cv-page-sheet shrink-0 bg-white shadow-2xl relative rounded-none border border-gray-200 overflow-hidden"
                    style={{
                      width: '816px',
                      height: '1056px',
                      fontFamily: cvData.fontFamily,
                    }}
                  >
                    <div className="w-full h-full p-[0.6in] flex flex-col justify-between text-[10px] text-gray-800">
                      <div className="space-y-4">
                        <div className="border-b pb-2 flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                          <span>Continuación — {cvData.contact.fullName || 'Carlos Mendoza'}</span>
                          <span>Página 2 / 2</span>
                        </div>
                        {/* Renderizado de desborde estructurado para la segunda página */}
                        <div className="space-y-3">
                          <h3 className="font-black text-xs uppercase text-gray-900 border-b pb-1">Experiencia / Educación Adicional</h3>
                          {cvData.experiences.slice(2).map((exp: any) => (
                            <div key={exp.id} className="space-y-1">
                              <p className="font-bold text-[11px]">{exp.position} — <span className="italic font-normal">{exp.company}</span></p>
                              <p className="text-gray-600">{exp.responsibilities}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-center text-[9px] text-gray-400 border-t pt-2">
                        Generado oficialmente con CVRD.DO — Todos los derechos reservados
                      </div>
                    </div>
                    {permissions.hasWatermark && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 opacity-10">
                        <span className="text-6xl font-black text-gray-950 -rotate-30 uppercase tracking-widest select-none">PREVIA — CVRD.DO</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="absolute bottom-6 right-6 z-20">
                <span className="bg-gray-950/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[11px] font-bold shadow-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-yellow" />
                  {permissions.hasWatermark ? 'Marca de agua activa' : 'Exportación Limpia B2B'}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

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
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-yellow"></div>
        </div>
      }>
        <BuilderContent />
      </Suspense>
    </CVProvider>
  );
}