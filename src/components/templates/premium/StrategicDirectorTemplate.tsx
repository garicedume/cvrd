'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const StrategicDirectorTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#eab308',
  } = data;

  // Color de acento dinámico (Amarillo Cromo / Oro por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#eab308'
      : colorScheme || '#eab308';

  // Separación del nombre a 2 líneas editoriales
  const rawName = (contact.fullName || 'JAMES ROBERTSON').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Filtrado de elementos con contenido real
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  // Porcentaje para barras de habilidades
  const getSkillPercent = (level?: string) => {
    switch (level) {
      case 'Experto':
        return '95%';
      case 'Avanzado':
        return '80%';
      case 'Intermedio':
        return '65%';
      case 'Básico':
        return '45%';
      default:
        return '75%';
    }
  };

  return (
    <div
      className={`relative bg-white text-neutral-900 font-${
        fontFamily || 'Inter'
      } text-[10px] leading-relaxed w-full min-h-264 flex selection:bg-neutral-200 overflow-hidden`}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA IZQUIERDA (~38% - SIDEBAR OSCURA CON ENCABEZADOS EN SLASH)     */}
      {/* ========================================================================= */}
      <aside className="w-[38%] bg-[#1c2029] text-white p-7 py-8 flex flex-col justify-between shrink-0 relative space-y-6">
        {/* Pestaña / Notch Flotante de Acento en el Borde Derecho */}
        <div
          className="absolute right-0 top-[60%] w-1.5 h-16 rounded-l-xs shadow-md"
          style={{ backgroundColor: accent }}
        />

        <div className="space-y-6">
          {/* Avatar Circular Superior */}
          <div className="flex justify-center pt-1">
            {contact.photoUrl ? (
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white/20 shadow-xl bg-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contact.photoUrl}
                  alt={rawName}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            ) : (
              <div className="w-36 h-36 rounded-full border-2 border-white/20 bg-[#12151c] flex flex-col items-center justify-center text-white shadow-xl">
                <User className="w-12 h-12 mb-1 opacity-60" style={{ color: accent }} />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* CONTACT/ */}
          <section className="space-y-2.5">
            <h2
              className="text-[12px] font-black uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              Contact/
            </h2>

            <div className="space-y-2.5 text-[9.5px] text-neutral-300">
              {(contact.city || contact.country) && (
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-xs flex items-center justify-center text-neutral-950 shrink-0 mt-0.5"
                    style={{ backgroundColor: accent }}
                  >
                    <MapPin className="w-3 h-3" />
                  </div>
                  <p className="leading-snug">
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-2.5 pl-0.5">
                  <Phone className="w-3 h-3 shrink-0" style={{ color: accent }} />
                  <span>{contact.phone}</span>
                </div>
              )}

              {contact.email && (
                <div className="flex items-center gap-2.5 pl-0.5">
                  <Mail className="w-3 h-3 shrink-0" style={{ color: accent }} />
                  <span className="break-all">{contact.email}</span>
                </div>
              )}

              {contact.links?.portfolio && (
                <div className="flex items-center gap-2.5 pl-0.5">
                  <Globe className="w-3 h-3 shrink-0" style={{ color: accent }} />
                  <span className="truncate max-w-37.5">{contact.links.portfolio}</span>
                </div>
              )}
            </div>
          </section>

          {/* EDUCATION/ */}
          {validEducation.length > 0 && (
            <section className="space-y-2.5">
              <h2
                className="text-[12px] font-black uppercase tracking-[0.18em]"
                style={{ color: accent }}
              >
                Education/
              </h2>

              <div className="space-y-3 text-[9.5px]">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="font-bold text-white uppercase leading-tight">
                      {edu.degree || 'Creative Graphic Arts'}
                    </h3>
                    {edu.institution && (
                      <p className="text-neutral-400 italic text-[9px]">
                        {edu.institution}
                      </p>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[8.5px] text-neutral-500 font-mono">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REFERENCE/ CON BARRAS LATERALES DE ACENTO */}
          {validReferences.length > 0 && (
            <section className="space-y-2.5">
              <h2
                className="text-[12px] font-black uppercase tracking-[0.18em]"
                style={{ color: accent }}
              >
                Reference/
              </h2>

              <div className="space-y-3 text-[9px]">
                {validReferences.slice(0, 2).map((ref) => (
                  <div
                    key={ref.id}
                    className="space-y-0.5 border-l-2 pl-2.5"
                    style={{ borderColor: accent }}
                  >
                    <p className="font-bold text-white uppercase text-[9.5px]">{ref.name}</p>
                    <p className="text-neutral-400 italic">
                      {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                    </p>
                    {ref.phone && <p className="text-neutral-300">T: {ref.phone}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer lateral sutil */}
        <footer className="pt-2 text-[8.5px] text-neutral-500 uppercase tracking-widest">
          Strategic Director Edition
        </footer>
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~62% - CORTE GEOMÉTRICO + CABECERA + EXPERIENCIA)      */}
      {/* ========================================================================= */}
      <main className="flex-1 p-8 py-7 flex flex-col justify-between relative">
        {/* Corte Geométrico Angular Superior Derecho */}
        <div
          className="absolute top-0 right-0 w-32 h-20 bg-[#1c2029] z-0"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />

        <div className="relative z-10 space-y-5">
          {/* Header Nombre & Cargo */}
          <header className="space-y-1 pr-16">
            <div className="w-12 h-1 mb-2" style={{ backgroundColor: '#1c2029' }} />
            <h1 className="text-3xl sm:text-4xl uppercase tracking-tight leading-tight">
              <span className="font-bold text-neutral-900 block">{firstName}</span>
              <span className="font-black text-neutral-950 block">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-700 pt-1">
                {contact.professionalTitle}
              </p>
            )}
            <div className="w-full h-0.5 mt-3" style={{ backgroundColor: accent }} />
          </header>

          {/* SUMMARY / PERFIL (Si existe) */}
          {summary && (
            <section className="space-y-1">
              <h2 className="text-[12px] font-black uppercase tracking-[0.18em] text-neutral-950">
                Profile/
              </h2>
              <p className="text-[9.5px] text-neutral-600 leading-relaxed text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* JOB EXPERIENCE/ (Con Barras de Acento Laterales) */}
          {validExperiences.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-[12px] font-black uppercase tracking-[0.18em] text-neutral-950">
                Job Experience/
              </h2>

              <div className="space-y-3.5 pt-0.5">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-[8.5px] font-bold text-neutral-500 font-mono">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                      </p>
                    )}
                    <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                      {exp.position || 'Enter Your Job Position Here'}
                    </h3>
                    {exp.company && (
                      <p className="text-[9.5px] font-semibold text-neutral-500 italic">
                        {exp.company}
                      </p>
                    )}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div
                        className="border-l-2 pl-3 py-0.5 mt-1"
                        style={{ borderColor: accent }}
                      >
                        <ul className="space-y-0.5 text-[9.5px] text-neutral-600 leading-relaxed">
                          {exp.responsibilities
                            .filter((r) => r.trim())
                            .map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="font-bold text-neutral-900 shrink-0">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SKILLS/ (Grilla Dual con Barras Horizontales Gruesas) */}
          {validSkills.length > 0 && (
            <section className="space-y-2.5 pt-1">
              <h2 className="text-[12px] font-black uppercase tracking-[0.18em] text-neutral-950">
                Skills/
              </h2>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 pt-0.5">
                {validSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between gap-3">
                    <span className="text-[9.5px] font-semibold text-neutral-800 truncate flex-1">
                      {skill.name}
                    </span>
                    <div className="w-16 h-1.5 bg-neutral-200 rounded-xs overflow-hidden shrink-0">
                      <div
                        className="h-full rounded-xs transition-all duration-300"
                        style={{
                          backgroundColor: accent,
                          width: getSkillPercent(skill.level),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* INTERESTS/ / IDIOMAS EN EL PIE */}
        <footer className="pt-3 border-t border-neutral-200 space-y-1.5">
          <h2 className="text-[11px] font-black uppercase tracking-[0.18em] text-neutral-950">
            {validLanguages.length > 0 ? 'Languages & Interests/' : 'Interests/'}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] text-neutral-700 font-medium">
            {validLanguages.length > 0 ? (
              validLanguages.map((l) => (
                <span key={l.id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  <strong className="text-neutral-950">{l.language}</strong> ({l.proficiency})
                </span>
              ))
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  Travelling
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  Reading
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  Sketching
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  Leadership
                </span>
              </>
            )}
          </div>
          <div className="w-full h-0.5 mt-2" style={{ backgroundColor: accent }} />
        </footer>
      </main>
    </div>
  );
};

export default StrategicDirectorTemplate;