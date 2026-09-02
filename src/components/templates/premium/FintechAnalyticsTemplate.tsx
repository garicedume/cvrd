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

export const FintechAnalyticsTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#c59e5f',
  } = data;

  // Acento dinámico (Oro Clásico / Champagne Luxury por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#c59e5f'
      : colorScheme || '#c59e5f';

  // Separación del nombre
  const rawName = (contact.fullName || 'JOHN DELL').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Filtrado de elementos válidos
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  // Porcentaje numérico para barras de habilidades
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
      className={`relative bg-[#141414] text-neutral-200 font-${
        fontFamily || 'Inter'
      } text-[10px] leading-relaxed w-full min-h-264 p-9 flex flex-col justify-between selection:bg-neutral-800 selection:text-white overflow-hidden`}
    >
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* 1. CABECERA LUXURY (RETRATO CON ANILLO DE ORO + NOMBRE EDITORIAL)          */}
        {/* ========================================================================= */}
        <header className="flex items-center gap-8 pb-3 relative">
          {/* Retrato con Aro Dorado Sólido */}
          <div className="shrink-0">
            {contact.photoUrl ? (
              <div
                className="w-34 h-34 rounded-full p-1 border-4 shadow-2xl bg-neutral-900"
                style={{ borderColor: accent }}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={contact.photoUrl}
                    alt={rawName}
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                </div>
              </div>
            ) : (
              <div
                className="w-34 h-34 rounded-full border-4 bg-[#1b1b1b] flex flex-col items-center justify-center shadow-2xl"
                style={{ borderColor: accent }}
              >
                <User className="w-12 h-12 mb-1 opacity-80" style={{ color: accent }} />
                <span className="text-sm font-black tracking-widest text-white">{initials}</span>
              </div>
            )}
          </div>

          {/* Nombre & Subtítulo */}
          <div className="space-y-1">
            <h1
              className="text-3xl sm:text-4xl font-black uppercase tracking-[0.2em] leading-none"
              style={{ color: accent }}
            >
              {firstName} {lastName}
            </h1>
            {contact.professionalTitle && (
              <p
                className="text-xs font-medium uppercase tracking-[0.25em] pt-1 opacity-90"
                style={{ color: accent }}
              >
                {contact.professionalTitle}
              </p>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL (2 COLUMNAS EN TOTAL BLACK CON ACENTO DORADO)         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-8 items-start pt-1">
          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA (~35%): CONTACT + PERSONAL SKILLS + REFERENCES        */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="col-span-4 space-y-6">
            {/* CONTACT */}
            <section className="space-y-2.5">
              <h2
                className="text-[12px] font-black uppercase tracking-[0.18em] border-b pb-1"
                style={{ color: accent, borderColor: `${accent}40` }}
              >
                Contact
              </h2>

              <div className="space-y-2 text-[9.5px] text-neutral-300">
                {(contact.city || contact.country) && (
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-3 h-3 shrink-0" style={{ color: accent }} />
                    <span className="truncate">
                      {[contact.city, contact.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}

                {contact.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3 h-3 shrink-0" style={{ color: accent }} />
                    <span>{contact.phone}</span>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-3 h-3 shrink-0" style={{ color: accent }} />
                    <span className="truncate max-w-[155px]">{contact.email}</span>
                  </div>
                )}

                {contact.links?.portfolio && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-3 h-3 shrink-0" style={{ color: accent }} />
                    <span className="truncate max-w-[155px]">{contact.links.portfolio}</span>
                  </div>
                )}
              </div>
            </section>

            {/* PERSONAL SKILLS */}
            {validSkills.length > 0 && (
              <section className="space-y-2.5">
                <h2
                  className="text-[12px] font-black uppercase tracking-[0.18em] border-b pb-1"
                  style={{ color: accent, borderColor: `${accent}40` }}
                >
                  Personal Skills
                </h2>

                <div className="space-y-2.5 pt-0.5">
                  {validSkills.map((skill) => (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex justify-between text-[9.5px]">
                        <span className="text-neutral-200">{skill.name}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden border border-neutral-800">
                        <div
                          className="h-full rounded-full transition-all duration-300"
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

            {/* REFERENCES */}
            {validReferences.length > 0 && (
              <section className="space-y-2.5">
                <h2
                  className="text-[12px] font-black uppercase tracking-[0.18em] border-b pb-1"
                  style={{ color: accent, borderColor: `${accent}40` }}
                >
                  References
                </h2>

                <div className="space-y-3 text-[9px] text-neutral-300">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-[10px] uppercase" style={{ color: accent }}>
                        {ref.name}
                      </p>
                      <p className="text-neutral-400 italic">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="text-neutral-300">Phone: {ref.phone}</p>}
                      {ref.email && <p className="text-neutral-400 break-all">Mail: {ref.email}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA DERECHA (~65%): ABOUT ME + EDUCATION + EXPERIENCES              */}
          {/* ----------------------------------------------------------------------- */}
          <main className="col-span-8 space-y-6">
            {/* ABOUT ME */}
            {summary && (
              <section className="space-y-1.5">
                <h2
                  className="text-[12px] font-black uppercase tracking-[0.18em] border-b pb-1"
                  style={{ color: accent, borderColor: `${accent}40` }}
                >
                  About Me
                </h2>
                <p className="text-[10px] text-neutral-300 leading-relaxed text-justify pt-0.5">
                  {summary}
                </p>
              </section>
            )}

            {/* EDUCATION */}
            {validEducation.length > 0 && (
              <section className="space-y-2.5">
                <h2
                  className="text-[12px] font-black uppercase tracking-[0.18em] border-b pb-1"
                  style={{ color: accent, borderColor: `${accent}40` }}
                >
                  Education
                </h2>

                <div className="space-y-3.5 pt-0.5">
                  {validEducation.map((edu) => (
                    <div key={edu.id} className="grid grid-cols-12 gap-3 items-start">
                      <div className="col-span-3 pt-0.5">
                        <span className="text-[9px] font-mono opacity-80" style={{ color: accent }}>
                          {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                        </span>
                      </div>

                      <div className="col-span-1 flex justify-center pt-1">
                        <div
                          className="w-2.5 h-2.5 rounded-full shadow-xs"
                          style={{ backgroundColor: accent }}
                        />
                      </div>

                      <div className="col-span-8 space-y-0.5">
                        <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-white">
                          {edu.degree || 'Degree Title'}
                        </h3>
                        {edu.institution && (
                          <p className="text-[9.5px] text-neutral-400 italic">
                            {edu.institution}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCES */}
            {validExperiences.length > 0 && (
              <section className="space-y-2.5">
                <h2
                  className="text-[12px] font-black uppercase tracking-[0.18em] border-b pb-1"
                  style={{ color: accent, borderColor: `${accent}40` }}
                >
                  Experiences
                </h2>

                <div className="space-y-3.5 pt-0.5">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-12 gap-3 items-start">
                      <div className="col-span-3 pt-0.5">
                        <span className="text-[9px] font-mono opacity-80" style={{ color: accent }}>
                          {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                        </span>
                      </div>

                      <div className="col-span-1 flex justify-center pt-1">
                        <div
                          className="w-2.5 h-2.5 rounded-full shadow-xs"
                          style={{ backgroundColor: accent }}
                        />
                      </div>

                      <div className="col-span-8 space-y-1">
                        <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-white">
                          {exp.position || 'Professional Position'}
                        </h3>
                        {exp.company && (
                          <p className="text-[9.5px] text-neutral-400 italic">
                            {exp.company}
                          </p>
                        )}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <ul className="space-y-0.5 pt-0.5 text-[9.5px] text-neutral-300 leading-relaxed">
                            {exp.responsibilities
                              .filter((r) => r.trim())
                              .map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="font-bold shrink-0 mt-0.5" style={{ color: accent }}>
                                    •
                                  </span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* IDIOMAS */}
            {validLanguages.length > 0 && (
              <section className="space-y-1.5 pt-1 border-t border-neutral-800">
                <h2
                  className="text-[11px] font-black uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  Languages
                </h2>
                <div className="flex gap-6 text-[9.5px] text-neutral-300">
                  {validLanguages.map((l) => (
                    <span key={l.id}>
                      <strong className="text-white">{l.language}</strong> ({l.proficiency})
                    </span>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* Pie de Página */}
      <footer className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[8.5px] text-neutral-500 uppercase tracking-widest">
        <span>Executive Black Gold Signature</span>
        <span style={{ color: accent }}>Fintech & Quantitative Edition</span>
      </footer>
    </div>
  );
};

export default FintechAnalyticsTemplate;