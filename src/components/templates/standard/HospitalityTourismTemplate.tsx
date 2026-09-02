'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages as LanguagesIcon,
  User,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const HospitalityTourismTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#e11d48',
  } = data;

  // Acento dinámico (Rojo Rubí / Coral por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#e11d48'
      : colorScheme || '#e11d48';

  // Separación del nombre[cite: 9]
  const rawName = (contact.fullName || 'Carlos R. Mendoza').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo sin foto[cite: 9]
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Radio dinámico de la fotografía[cite: 9]
  const getPhotoRadius = () => {
    switch (contact.photoShape) {
      case 'square':
        return 'rounded-none';
      case 'rounded-rect':
        return 'rounded-2xl';
      default:
        return 'rounded-full';
    }
  };

  // Filtrado de elementos válidos[cite: 9]
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  // Porcentaje numérico para habilidades[cite: 9]
  const getSkillPercent = (level?: string) => {
    switch (level) {
      case 'Experto':
        return 92;
      case 'Avanzado':
        return 80;
      case 'Intermedio':
        return 65;
      case 'Básico':
        return 45;
      default:
        return 75;
    }
  };

  // Porcentaje numérico para idiomas[cite: 9]
  const getLangPercent = (proficiency?: string) => {
    switch (proficiency) {
      case 'Nativo':
        return 95;
      case 'Avanzado':
        return 80;
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
      } text-[10.5px] leading-relaxed w-full min-h-264 flex selection:bg-neutral-200 overflow-hidden`}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA IZQUIERDA (~34% - FOTO AUMENTADA 25% + CONTACT + REFERENCIAS)  */}
      {/* ========================================================================= */}
      <aside className="w-[34%] bg-[#f4f4f6] p-6 flex flex-col justify-between shrink-0 space-y-6 border-r border-neutral-200">
        <div className="space-y-6">
          {/* Avatar Circular (+25% más grande: w-40 h-40)[cite: 9] */}
          <div className="flex justify-center pt-1">
            {contact.photoUrl ? (
              <div className="w-40 h-40 p-1.5 rounded-full bg-white shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-neutral-200">
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
                className="w-40 h-40 rounded-full border-4 border-white flex flex-col items-center justify-center text-white shadow-md"
                style={{ backgroundColor: accent }}
              >
                <User className="w-12 h-12 mb-1 opacity-80" />
                <span className="text-base font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* CONTACT ME[cite: 9] */}
          <section className="space-y-3">
            <h2
              className="text-[13px] font-black uppercase tracking-wider text-center"
              style={{ color: accent }}
            >
              Contact Me
            </h2>

            <div className="space-y-2.5 text-[10px] text-neutral-700 pt-0.5">
              {contact.phone && (
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Phone className="w-2.5 h-2.5" />
                  </div>
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.links?.portfolio && (
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Globe className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate">{contact.links.portfolio}</span>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center gap-2.5 break-all">
                  <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Mail className="w-2.5 h-2.5" />
                  </div>
                  <span>{contact.email}</span>
                </div>
              )}
              {(contact.city || contact.country) && (
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <MapPin className="w-2.5 h-2.5" />
                  </div>
                  <span>
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Separador sutil[cite: 9] */}
          <div className="flex justify-center items-center gap-1.5 py-0.5">
            <div className="w-10 h-0.5 bg-neutral-300 rounded-full" />
            <div className="w-2 h-0.5 bg-neutral-400 rounded-full" />
            <div className="w-10 h-0.5 bg-neutral-300 rounded-full" />
          </div>

          {/* REFERENCES[cite: 9] */}
          {validReferences.length > 0 && (
            <section className="space-y-3">
              <div
                className="py-1 px-3 text-white text-[12px] font-black uppercase tracking-wider text-center rounded-xs shadow-xs"
                style={{ backgroundColor: accent }}
              >
                References
              </div>
              <div className="space-y-3.5 text-[9.5px] text-neutral-700 pt-1">
                {validReferences.slice(0, 3).map((ref) => (
                  <div key={ref.id} className="space-y-0.5 text-center">
                    <p className="font-bold text-neutral-900 uppercase text-[10px]">
                      {ref.name}
                    </p>
                    <p className="text-neutral-500 italic">
                      {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                    </p>
                    {ref.phone && <p className="text-neutral-700">{ref.phone}</p>}
                    {ref.email && <p className="text-neutral-500 text-[9px]">{ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Pie de Columna Izquierda[cite: 9] */}
        <footer className="pt-2 text-center text-[9px] text-neutral-400 font-semibold uppercase tracking-widest">
          Hospitality & Tourism
        </footer>
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~66% - CABECERA + ABOUT + EXP & EDU + SKILLS + LANG)  */}
      {/* ========================================================================= */}
      <main className="flex-1 p-7 space-y-5 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Nombre & Título[cite: 9] */}
          <header className="space-y-0.5">
            <h1 className="text-3xl sm:text-4xl tracking-tight uppercase leading-none">
              <span className="font-black" style={{ color: accent }}>
                {firstName}
              </span>{' '}
              <span className="font-black text-neutral-950">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-700 pt-0.5">
                {contact.professionalTitle}
              </p>
            )}
          </header>

          {/* ABOUT ME[cite: 9] */}
          {summary && (
            <section className="space-y-1.5">
              <div
                className="px-4 py-1 rounded-full text-white text-[12px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: accent }}
              >
                <User className="w-3 h-3" />
                <span>About Me</span>
              </div>
              <p className="text-[10.5px] text-neutral-600 leading-relaxed text-justify pl-1">
                {summary}
              </p>
            </section>
          )}

          {/* GRILLA PARALELA: JOB EXPERIENCE & EDUCATION[cite: 9] */}
          <div className="grid grid-cols-12 gap-6 items-start pt-1">
            {/* Subcolumna 1: Job Experience[cite: 9] */}
            <section className="col-span-6 space-y-2.5">
              <div
                className="py-1 px-3 text-white text-[12px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xs shadow-xs"
                style={{ backgroundColor: accent }}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Job Experience</span>
              </div>

              <div className="space-y-3 pl-1">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="space-y-0.5">
                    <h3 className="font-bold text-[11px] text-neutral-950 leading-tight">
                      {exp.position || 'Job Position'}
                    </h3>
                    {exp.company && (
                      <p className="text-[9.5px] text-neutral-500 italic">
                        {exp.company}
                      </p>
                    )}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <p className="text-[10px] text-neutral-600 leading-relaxed pt-0.5">
                        {exp.responsibilities[0]}
                      </p>
                    )}
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-[8.5px] font-bold text-neutral-400 uppercase pt-0.5">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Subcolumna 2: Education[cite: 9] */}
            <section className="col-span-6 space-y-2.5">
              <div
                className="py-1 px-3 text-white text-[12px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-xs shadow-xs"
                style={{ backgroundColor: accent }}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </div>

              <div className="space-y-3 pl-1">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="font-bold text-[11px] text-neutral-950 leading-tight">
                      {edu.degree || 'Degree Title'}
                    </h3>
                    {edu.institution && (
                      <p className="text-[9.5px] text-neutral-500 italic">
                        {edu.institution}
                      </p>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[8.5px] font-bold text-neutral-400 uppercase pt-0.5">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SKILLS CON DESLIZADORES Y PERILLA CIRCULAR[cite: 9] */}
          {validSkills.length > 0 && (
            <section className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2 border-b border-neutral-300 pb-1">
                <Wrench className="w-3.5 h-3.5" style={{ color: accent }} />
                <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                  Skills
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-3 pl-1 pt-0.5">
                {validSkills.map((skill) => {
                  const percent = getSkillPercent(skill.level);
                  return (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-800">
                        <span>{skill.name}</span>
                      </div>
                      <div className="relative w-full h-1.5 bg-neutral-200 rounded-full flex items-center">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: accent,
                            width: `${percent}%`,
                          }}
                        />
                        <div
                          className="absolute w-2.5 h-2.5 bg-neutral-950 rounded-full shadow-xs -ml-1 border border-white"
                          style={{ left: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* LANGUAGES[cite: 9] */}
        {validLanguages.length > 0 && (
          <footer className="space-y-2 border-t border-neutral-300 pt-3">
            <div className="flex items-center gap-2">
              <LanguagesIcon className="w-3.5 h-3.5" style={{ color: accent }} />
              <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                Languages
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 pl-1 pt-0.5">
              {validLanguages.map((l) => {
                const percent = getLangPercent(l.proficiency);
                return (
                  <div key={l.id} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-800">
                      <span>{l.language}</span>
                      <span className="text-[9px] text-neutral-500 font-mono">
                        {percent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: accent,
                          width: `${percent}%`,
                        }}
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