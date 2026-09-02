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
  Users,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const OperationsLeadTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#0d9488',
  } = data;

  // Color de acento dinámico (Verde menta / Teal por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#0d9488'
      : colorScheme || '#0d9488';

  // Separación del nombre[cite: 11]
  const rawName = (contact.fullName || 'Noel Taylor').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo sin foto[cite: 11]
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Radio dinámico de la foto[cite: 11]
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

  // Filtrado de campos válidos[cite: 11]
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  // Porcentaje numérico para habilidades[cite: 11]
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
      } text-[10.5px] leading-relaxed w-full min-h-264 flex border-[6px] selection:bg-neutral-200 overflow-hidden`}
      style={{ borderColor: accent }}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA IZQUIERDA (~36% - FOTO ARRIBA + NOMBRE/CARGO + CONTACT + EDU)   */}
      {/* ========================================================================= */}
      <aside className="w-[36%] bg-[#e9f6f4] p-6 flex flex-col justify-between shrink-0 space-y-5 border-r border-neutral-200">
        <div className="space-y-4">
          {/* 1.1 Avatar Circular Ampliado en la parte superior[cite: 11] */}
          <div className="flex justify-center pt-1">
            {contact.photoUrl ? (
              <div className="w-38 h-38 p-1.5 rounded-full bg-white shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden">
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
                className="w-38 h-38 rounded-full border-4 border-white flex flex-col items-center justify-center text-white shadow-md"
                style={{ backgroundColor: accent }}
              >
                <User className="w-12 h-12 mb-1 opacity-80" />
                <span className="text-base font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* 1.2 Nombre, Apellidos y Cargo por debajo de la foto[cite: 11] */}
          <div className="text-center space-y-0.5 pb-1">
            <h1 className="text-2xl sm:text-3xl tracking-tight text-neutral-950 uppercase leading-none">
              <span className="font-black">{firstName}</span>{' '}
              <span className="font-light text-neutral-700">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 pt-0.5">
                {contact.professionalTitle}
              </p>
            )}
          </div>

          {/* 1.3 CONTACT ME[cite: 11] */}
          <section className="space-y-2 pt-0.5">
            <div className="flex items-center gap-2 border-b border-neutral-300/80 pb-1">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: accent }}
              >
                <User className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                Contact Me
              </h2>
            </div>

            <div className="space-y-2 text-[10px] text-neutral-700 pl-1">
              {contact.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3 h-3 text-neutral-900 shrink-0" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center gap-2.5 break-all">
                  <Mail className="w-3 h-3 text-neutral-900 shrink-0" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.links?.portfolio && (
                <div className="flex items-center gap-2.5">
                  <Globe className="w-3 h-3 text-neutral-900 shrink-0" />
                  <span className="truncate">{contact.links.portfolio}</span>
                </div>
              )}
              {(contact.city || contact.country) && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3 h-3 text-neutral-900 shrink-0" />
                  <span>
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* 1.4 EDUCATION[cite: 11] */}
          {validEducation.length > 0 && (
            <section className="space-y-2">
              <div className="flex items-center gap-2 border-b border-neutral-300/80 pb-1">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  <GraduationCap className="w-2.5 h-2.5" />
                </div>
                <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                  Education
                </h2>
              </div>

              <div className="space-y-2 pl-1">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-neutral-950 leading-tight">
                      {edu.degree || 'Degree Title'}
                    </h3>
                    {edu.institution && (
                      <p className="text-[9.5px] text-neutral-600 italic leading-tight">
                        {edu.institution}
                      </p>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[8.5px] text-neutral-500 font-medium">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* 1.5 REFERENCES[cite: 11] */}
        {validReferences.length > 0 && (
          <footer className="space-y-2 border-t border-neutral-300/80 pt-2.5">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: accent }}
              >
                <Users className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                References
              </h2>
            </div>

            <div className="space-y-2 pl-1 text-[9.5px] text-neutral-700">
              {validReferences.slice(0, 2).map((ref) => (
                <div key={ref.id} className="space-y-0.5">
                  <p className="font-bold text-neutral-900 text-[10px]">{ref.name}</p>
                  <p className="text-neutral-500 italic">
                    {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                  </p>
                  {ref.phone && <p className="text-neutral-800">Tel: {ref.phone}</p>}
                </div>
              ))}
            </div>
          </footer>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~64% - ABOUT, WORK EXPERIENCE, SKILLS, LANGUAGES)     */}
      {/* ========================================================================= */}
      <main className="flex-1 p-7 space-y-5 flex flex-col justify-between">
        <div className="space-y-5">
          {/* ABOUT ME[cite: 11] */}
          {summary && (
            <section className="space-y-1.5">
              <div className="flex items-center gap-2 border-b border-neutral-300 pb-1">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  <User className="w-2.5 h-2.5" />
                </div>
                <h2 className="text-[14px] font-black uppercase tracking-wider text-neutral-950">
                  About Me
                </h2>
              </div>
              <p className="text-[10.5px] text-neutral-600 leading-relaxed text-justify pl-1">
                {summary}
              </p>
            </section>
          )}

          {/* JOB EXPERIENCE[cite: 11] */}
          {validExperiences.length > 0 && (
            <section className="space-y-2.5">
              <div className="flex items-center gap-2 border-b border-neutral-300 pb-1">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  <Briefcase className="w-2.5 h-2.5" />
                </div>
                <h2 className="text-[14px] font-black uppercase tracking-wider text-neutral-950">
                  Job Experience
                </h2>
              </div>

              <div className="space-y-3.5 pl-1">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                        {exp.position || 'Job Position'}
                      </h3>
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-[9.5px] font-semibold text-neutral-400">
                          {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                        </span>
                      )}
                    </div>

                    {exp.company && (
                      <p className="text-[10px] text-neutral-600 italic">
                        {exp.company}
                      </p>
                    )}

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-1 pt-0.5 text-[10.5px] text-neutral-600 leading-relaxed">
                        {exp.responsibilities
                          .filter((r) => r.trim())
                          .map((resp, idx) => (
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
                ))}
              </div>
            </section>
          )}

          {/* SKILLS[cite: 11] */}
          {validSkills.length > 0 && (
            <section className="space-y-2">
              <div className="flex items-center gap-2 border-b border-neutral-300 pb-1">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  <Wrench className="w-2.5 h-2.5" />
                </div>
                <h2 className="text-[14px] font-black uppercase tracking-wider text-neutral-950">
                  Skills
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 pl-1 pt-0.5">
                {validSkills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-neutral-800">
                      <span>{skill.name}</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full p-0.5 border border-neutral-300/50">
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
        </div>

        {/* LANGUAGE & COMPETENCIES[cite: 11] */}
        {validLanguages.length > 0 && (
          <footer className="space-y-1.5 border-t border-neutral-300 pt-3">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: accent }}
              >
                <LanguagesIcon className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                Language & Competencies
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 pl-1 pt-1 text-[10px]">
              {validLanguages.map((l) => (
                <div key={l.id} className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: accent }}
                  />
                  <span className="font-bold text-neutral-900 uppercase">
                    {l.language}
                  </span>
                  {l.proficiency && (
                    <span className="text-neutral-500 text-[9px] italic">
                      ({l.proficiency})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </footer>
        )}
      </main>
    </div>
  );
};