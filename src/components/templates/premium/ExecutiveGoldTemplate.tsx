'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  Sparkles,
} from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const ExecutiveGoldTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#e0a96d',
  } = data;

  // Acento dinámico (Oro Champaña / Oro Rosa cálido por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#e0a96d'
      : colorScheme || '#e0a96d';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact.fullName || 'Jessica Hanmada').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo en ausencia de fotografía
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Radio dinámico para el marco de la foto
  const getPhotoRadius = () => {
    switch (contact.photoShape) {
      case 'circle':
        return 'rounded-full';
      case 'rounded-rect':
        return 'rounded-2xl';
      default:
        return 'rounded-none';
    }
  };

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
        return '82%';
      case 'Intermedio':
        return '65%';
      case 'Básico':
        return '45%';
      default:
        return '75%';
    }
  };

  // Porcentaje numérico para los medidores circulares de idiomas
  const getLanguagePercent = (proficiency?: string) => {
    switch (proficiency) {
      case 'Nativo':
        return 100;
      case 'Avanzado':
        return 85;
      case 'Intermedio':
        return 65;
      case 'Básico':
        return 45;
      default:
        return 75;
    }
  };

  return (
    <div
      className={`relative bg-white text-neutral-900 font-${
        fontFamily || 'Inter'
      } text-[10.5px] leading-relaxed w-full min-h-264 flex flex-col justify-between selection:bg-neutral-200 overflow-hidden`}
    >
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER ASIMÉTRICO (BLOQUE CHARCOAL + RETRATO EDITORIAL LATERAL)   */}
        {/* ========================================================================= */}
        <header className="relative bg-[#22262f] text-white p-8 pb-7 pr-44 shadow-sm min-h-[220px] flex flex-col justify-between">
          <div className="space-y-3 max-w-xl">
            {/* Nombre & Subtítulo */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl tracking-[0.12em] text-white uppercase leading-none">
                <span className="font-black">{firstName}</span>{' '}
                <span className="font-light text-neutral-300">{lastName}</span>
              </h1>
              {contact.professionalTitle && (
                <p
                  className="text-xs font-bold uppercase tracking-[0.25em] pt-1"
                  style={{ color: accent }}
                >
                  {contact.professionalTitle}
                </p>
              )}
            </div>

            {/* Línea divisoria minimalista */}
            <div className="w-16 h-0.5 rounded-full" style={{ backgroundColor: accent }} />

            {/* Extracto Profesional Ejecutivo */}
            {summary && (
              <p className="text-[10px] text-neutral-300 leading-relaxed text-justify line-clamp-4 pr-4">
                {summary}
              </p>
            )}

            {/* Grilla 2x2 de Contacto con Insignias Circulares */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-2 text-[9.5px] text-neutral-300">
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-neutral-950 shrink-0 shadow-xs"
                    style={{ backgroundColor: accent }}
                  >
                    <Phone className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate">{contact.phone}</span>
                </div>
              )}

              {contact.links?.portfolio && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-neutral-950 shrink-0 shadow-xs"
                    style={{ backgroundColor: accent }}
                  >
                    <Globe className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate max-w-[150px]">{contact.links.portfolio}</span>
                </div>
              )}

              {contact.email && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-neutral-950 shrink-0 shadow-xs"
                    style={{ backgroundColor: accent }}
                  >
                    <Mail className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate max-w-[180px]">{contact.email}</span>
                </div>
              )}

              {(contact.city || contact.country) && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-neutral-950 shrink-0 shadow-xs"
                    style={{ backgroundColor: accent }}
                  >
                    <MapPin className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate">
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Fotografía Vertical Flotante Superior Derecha */}
          <div className="absolute right-8 top-6 bottom-6 w-36 overflow-hidden bg-neutral-800 border-2 border-neutral-700 shadow-xl">
            {contact.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={contact.photoUrl}
                alt={rawName}
                className={`w-full h-full object-cover grayscale contrast-125 ${getPhotoRadius()}`}
              />
            ) : (
              <div className="w-full h-full bg-[#181a20] flex flex-col items-center justify-center text-white">
                <User className="w-12 h-12 mb-2 opacity-60" style={{ color: accent }} />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL (2 COLUMNAS: IZQUIERDA ~38% | DERECHA ~62%)           */}
        {/* ========================================================================= */}
        <div className="px-8 grid grid-cols-12 gap-8 items-start">
          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA (~38%): EDUCATION + SKILLS                            */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="col-span-5 space-y-6">
            {/* EDUCATION */}
            {validEducation.length > 0 && (
              <section className="space-y-3">
                <div
                  className="py-1 px-3 text-neutral-950 text-[12px] font-black uppercase tracking-wider inline-block shadow-xs rounded-xs"
                  style={{ backgroundColor: accent }}
                >
                  Education
                </div>

                <div className="relative border-l-2 border-neutral-200 ml-1.5 pl-4 space-y-4 pt-1">
                  {validEducation.map((edu) => (
                    <div key={edu.id} className="relative space-y-0.5">
                      <div
                        className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-neutral-900 border-2 border-white shadow-xs"
                      />
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[9px] font-black text-neutral-900 tracking-wider">
                          {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                        </p>
                      )}
                      <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-neutral-950">
                        {edu.degree || 'Degree Title'}
                      </h3>
                      {edu.institution && (
                        <p className="text-[9.5px] text-neutral-500 italic">
                          {edu.institution}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SKILLS */}
            {validSkills.length > 0 && (
              <section className="space-y-3 pt-1">
                <div
                  className="py-1 px-3 text-neutral-950 text-[12px] font-black uppercase tracking-wider inline-block shadow-xs rounded-xs"
                  style={{ backgroundColor: accent }}
                >
                  Skills
                </div>

                <div className="space-y-2.5 pt-1">
                  {validSkills.map((skill) => (
                    <div key={skill.id} className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 truncate">
                        {skill.name}
                      </p>
                      <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-900 rounded-full transition-all duration-300"
                          style={{ width: getSkillPercent(skill.level) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* REFERENCES */}
            {validReferences.length > 0 && (
              <section className="space-y-3 pt-1">
                <div
                  className="py-1 px-3 text-neutral-950 text-[12px] font-black uppercase tracking-wider inline-block shadow-xs rounded-xs"
                  style={{ backgroundColor: accent }}
                >
                  References
                </div>

                <div className="space-y-2.5 text-[9.5px] text-neutral-700">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-neutral-950 text-[10px] uppercase">
                        {ref.name}
                      </p>
                      <p className="text-neutral-500 italic">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="text-neutral-800">T: {ref.phone}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA DERECHA (~62%): EXPERIENCE + LANGUAGE GAUGES                   */}
          {/* ----------------------------------------------------------------------- */}
          <main className="col-span-7 space-y-6">
            {/* EXPERIENCE */}
            {validExperiences.length > 0 && (
              <section className="space-y-3">
                <div
                  className="py-1 px-3 text-neutral-950 text-[12px] font-black uppercase tracking-wider inline-block shadow-xs rounded-xs"
                  style={{ backgroundColor: accent }}
                >
                  Experience
                </div>

                <div className="relative border-l-2 border-neutral-200 ml-1.5 pl-4 space-y-4 pt-1">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="relative space-y-1">
                      <div
                        className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-neutral-900 border-2 border-white shadow-xs"
                      />

                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                          {exp.position || 'Job Position'}
                        </h3>
                        {(exp.startDate || exp.endDate) && (
                          <span className="text-[9px] font-bold text-neutral-900">
                            {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        )}
                      </div>

                      {exp.company && (
                        <p className="text-[10px] text-neutral-500 italic">
                          {exp.company}
                        </p>
                      )}

                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="space-y-1 pt-1 text-[10.5px] text-neutral-600 leading-relaxed">
                          {exp.responsibilities
                            .filter((r) => r.trim())
                            .map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="font-bold text-neutral-900 shrink-0 mt-0.5">
                                  •
                                </span>
                                <span>{resp}</span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUAGE (Medidores Circulares SVG) */}
            {validLanguages.length > 0 && (
              <section className="space-y-3 pt-2">
                <div
                  className="py-1 px-3 text-neutral-950 text-[12px] font-black uppercase tracking-wider inline-block shadow-xs rounded-xs"
                  style={{ backgroundColor: accent }}
                >
                  Language
                </div>

                <div className="grid grid-cols-4 gap-3 pt-2">
                  {validLanguages.slice(0, 4).map((lang) => {
                    const percent = getLanguagePercent(lang.proficiency);
                    const radius = 22;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDashoffset = circumference - (percent / 100) * circumference;

                    return (
                      <div key={lang.id} className="flex flex-col items-center space-y-1">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 54 54">
                            <circle
                              cx="27"
                              cy="27"
                              r={radius}
                              stroke="#e5e7eb"
                              strokeWidth="3"
                              fill="transparent"
                            />
                            <circle
                              cx="27"
                              cy="27"
                              r={radius}
                              stroke={accent}
                              strokeWidth="3.5"
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                              fill="transparent"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                            <span className="text-[8px] font-black uppercase tracking-wider text-neutral-900 text-center truncate max-w-[45px]">
                              {lang.language}
                            </span>
                          </div>
                        </div>
                        <span className="text-[8.5px] font-bold text-neutral-500">
                          {percent}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BARRA DE ENLACES & REDES SOCIALES EN EL PIE                             */}
      {/* ========================================================================= */}
      <footer className="mx-8 mb-6 pt-3 border-t border-neutral-300 flex flex-wrap items-center justify-between text-[9px] text-neutral-500 font-medium">
        {contact.links?.linkedin ? (
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3 h-3 fill-neutral-800 shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
            </svg>
            <span>linkedin.com/in/{contact.links.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-neutral-800 shrink-0" style={{ color: accent }} />
            <span className="uppercase tracking-widest font-bold text-neutral-800">Executive Signature Edition</span>
          </div>
        )}

        {contact.links?.portfolio && (
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-neutral-800 shrink-0" />
            <span>{contact.links.portfolio}</span>
          </div>
        )}

        {contact.links?.github && (
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3 h-3 fill-neutral-800 shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
            </svg>
            <span>github.com/{contact.links.github}</span>
          </div>
        )}

        {(contact.city || contact.country) && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-neutral-800 shrink-0" />
            <span>{[contact.city, contact.country].filter(Boolean).join(', ')}</span>
          </div>
        )}
      </footer>
    </div>
  );
};