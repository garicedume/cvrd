'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  GraduationCap,
  Briefcase,
  Sliders,
  Languages as LanguagesIcon,
  User,
  Quote,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const AcademicResearchTemplate: React.FC<Props> = ({ data }) => {
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

  // Acento dinámico
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#6b21a8'
      : colorScheme || '#6b21a8';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact?.fullName || 'Carlos Mendoza').trim();
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

  // Porcentaje para barras y sliders
  const getSkillPercent = (level?: string) => {
    switch (level) {
      case 'Experto':
        return 92;
      case 'Avanzado':
        return 78;
      case 'Intermedio':
        return 62;
      case 'Básico':
        return 45;
      default:
        return 70;
    }
  };

  // Helper seguro para procesar responsabilidades (soporta string[] y string)
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
      className={`relative bg-white text-neutral-900 font-${
        fontFamily || 'Inter'
      } text-[10.5px] leading-relaxed w-full min-h-264 flex p-7 gap-6 selection:bg-neutral-200 overflow-hidden`}
    >
      {/* 1. COLUMNA IZQUIERDA */}
      <aside className="w-[36%] bg-[#1a1829] text-white rounded-t-[48px] rounded-b-2xl p-6 flex flex-col justify-between shrink-0 space-y-6">
        <div className="space-y-6">
          {/* Avatar Circular */}
          <div className="flex justify-center pt-2">
            {contact?.photoUrl ? (
              <div
                className="w-32 h-32 p-1.5 rounded-full border-2 border-white/20 shadow-xl"
                style={{ borderColor: accent }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
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
                className="w-32 h-32 rounded-full border-4 border-white/30 bg-neutral-900 flex flex-col items-center justify-center text-white shadow-xl"
                style={{ borderColor: accent }}
              >
                <User className="w-10 h-10 mb-1 opacity-70" />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* EDUCATION */}
          {validEducation.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b border-white/20 pb-1">
                <div
                  className="w-4 h-4 rounded-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: accent }}
                >
                  <GraduationCap className="w-2.5 h-2.5" />
                </div>
                <h2 className="text-[13px] font-black uppercase tracking-wider text-white">
                  Education
                </h2>
              </div>

              <div className="space-y-3 pl-1">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    {edu.institution && (
                      <p className="text-[9.5px] font-semibold text-neutral-400 italic">
                        {edu.institution}
                      </p>
                    )}
                    <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-white">
                      {edu.degree || 'Degree Title'}
                    </h3>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[9px] text-neutral-400">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REFERENCES */}
          {validReferences.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 border-b border-white/20 pb-1">
                <div
                  className="w-4 h-4 rounded-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: accent }}
                >
                  <Quote className="w-2.5 h-2.5" />
                </div>
                <h2 className="text-[13px] font-black uppercase tracking-wider text-white">
                  References
                </h2>
              </div>

              <div className="space-y-3 pl-1 text-[9.5px] text-neutral-300">
                {validReferences.slice(0, 2).map((ref) => (
                  <div key={ref.id} className="space-y-0.5">
                    <p className="font-bold text-white text-[10.5px]">{ref.name}</p>
                    <p className="text-neutral-400 italic">
                      {ref.relationship} {ref.company ? `/ ${ref.company}` : ''}
                    </p>
                    {ref.phone && <p className="text-neutral-300">Tel: {ref.phone}</p>}
                    {ref.email && <p className="text-neutral-400 break-all">Email: {ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* LANGUAGES */}
        {validLanguages.length > 0 && (
          <footer className="space-y-2 border-t border-white/20 pt-3">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-xs flex items-center justify-center text-white"
                style={{ backgroundColor: accent }}
              >
                <LanguagesIcon className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[13px] font-black uppercase tracking-wider text-white">
                Languages
              </h2>
            </div>

            <div className="space-y-2.5 pt-1">
              {validLanguages.map((lang) => {
                const percent = getSkillPercent(lang.proficiency);
                return (
                  <div key={lang.id} className="space-y-1">
                    <div className="flex justify-between text-[9.5px]">
                      <span className="font-semibold text-white">{lang.language}</span>
                      <span className="text-neutral-400 text-[8.5px]">{lang.proficiency}</span>
                    </div>
                    <div className="relative w-full h-1 bg-white/20 rounded-full flex items-center">
                      <div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accent, width: `${percent}%` }}
                      />
                      <div
                        className="absolute w-2 h-2 bg-white rounded-full shadow-xs -ml-1 border border-neutral-900"
                        style={{ left: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </footer>
        )}
      </aside>

      {/* 2. COLUMNA DERECHA */}
      <main className="flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-4">
          {/* Header Nombre */}
          <header className="space-y-2">
            <h1 className="text-3xl sm:text-4xl tracking-tight text-neutral-950 uppercase leading-none">
              <span className="font-black">{firstName}</span>{' '}
              <span className="font-light text-neutral-700">{lastName}</span>
            </h1>

            {contact?.professionalTitle && (
              <div>
                <span
                  className="inline-block px-4 py-1 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full shadow-xs"
                  style={{ backgroundColor: accent }}
                >
                  {contact.professionalTitle}
                </span>
              </div>
            )}

            {summary && (
              <p className="text-[10.5px] text-neutral-600 leading-relaxed text-justify pt-1">
                {summary}
              </p>
            )}
          </header>

          {/* Banda de Contacto */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {contact?.phone && (
              <div
                className="px-3 py-1 rounded-full text-white text-[9.5px] font-medium flex items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: accent }}
              >
                <Phone className="w-3 h-3" />
                <span>{contact.phone}</span>
              </div>
            )}
            {contact?.email && (
              <div
                className="px-3 py-1 rounded-full text-white text-[9.5px] font-medium flex items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: accent }}
              >
                <Mail className="w-3 h-3" />
                <span className="truncate max-w-44">{contact.email}</span>
              </div>
            )}
            {contact?.links?.website && (
              <div
                className="px-3 py-1 rounded-full text-white text-[9.5px] font-medium flex items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: accent }}
              >
                <Globe className="w-3 h-3" />
                <span className="truncate max-w-36">{contact.links.website}</span>
              </div>
            )}
            {(contact?.city || contact?.country) && (
              <div
                className="px-3 py-1 rounded-full text-white text-[9.5px] font-medium flex items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: accent }}
              >
                <MapPin className="w-3 h-3" />
                <span>{[contact.city, contact.country].filter(Boolean).join(', ')}</span>
              </div>
            )}
          </div>

          {/* JOB EXPERIENCE */}
          {validExperiences.length > 0 && (
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2 border-b border-neutral-300 pb-1">
                <div
                  className="w-4 h-4 rounded-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: accent }}
                >
                  <Briefcase className="w-2.5 h-2.5" />
                </div>
                <h2 className="text-[14px] font-black uppercase tracking-wider text-neutral-950">
                  Job Experience
                </h2>
              </div>

              <div className="space-y-4">
                {validExperiences.map((exp) => {
                  const respList = getResponsibilitiesArray(exp.responsibilities);
                  return (
                    <div key={exp.id} className="flex items-start gap-3">
                      {/* Badge de Fecha */}
                      <div
                        className="shrink-0 w-6 py-2 px-1 rounded-full text-white text-[8px] font-black uppercase tracking-widest flex items-center justify-center text-center shadow-xs"
                        style={{
                          backgroundColor: accent,
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        {exp.startDate || '2022'}
                      </div>

                      {/* Contenido del Cargo */}
                      <div className="flex-1 space-y-0.5">
                        {exp.company && (
                          <p className="text-[10px] font-semibold text-neutral-500 italic">
                            {exp.company}
                          </p>
                        )}
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                          {exp.position || 'Senior Web Designer'}
                        </h3>
                        {respList.length > 0 && (
                          <ul className="space-y-1 pt-1 text-[10.5px] text-neutral-600 leading-relaxed">
                            {respList.map((resp: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span
                                  className="font-bold shrink-0 mt-0.5"
                                  style={{ color: accent }}
                                >
                                  •
                                </span>
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
        </div>

        {/* SKILLS */}
        {validSkills.length > 0 && (
          <footer className="space-y-2 border-t border-neutral-300 pt-3">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-xs flex items-center justify-center text-white"
                style={{ backgroundColor: accent }}
              >
                <Sliders className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[14px] font-black uppercase tracking-wider text-neutral-950">
                Skills
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 pt-1">
              {validSkills.map((skill) => {
                const percent = getSkillPercent(skill.level);
                return (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between text-[9.5px] font-bold text-neutral-800">
                      <span>{skill.name}</span>
                    </div>
                    <div className="relative w-full h-1 bg-neutral-200 rounded-full flex items-center">
                      <div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accent, width: `${percent}%` }}
                      />
                      <div
                        className="absolute w-2 h-2 rounded-full shadow-xs -ml-1 border border-white"
                        style={{ backgroundColor: accent, left: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </footer>
        )}
      </main>
    </div>
  );
};