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
  Languages as LanguagesIcon,
  User,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const EmeraldCleanTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#064e3b',
  } = data;

  // Color esmeralda dinámico
  const emeraldColor =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#064e3b'
      : colorScheme || '#064e3b';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact.fullName || 'Torent Smith').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo sin foto
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Radio dinámico de la fotografía
  const getPhotoRadius = () => {
    switch (contact.photoShape) {
      case 'square':
        return 'rounded-none';
      case 'rounded-rect':
        return 'rounded-2xl';
      case 'vertical-rect':
        return 'rounded-xl aspect-[3/4] object-cover';
      default:
        return 'rounded-full';
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

  // Porcentaje numérico para habilidades
  const getSkillPercentNum = (level?: string) => {
    switch (level) {
      case 'Experto':
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

  // Porcentaje numérico para medidores circulares de idioma
  const getLanguagePercent = (proficiency?: string) => {
    switch (proficiency) {
      case 'Nativo':
        return 100;
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
      {/* 1. COLUMNA IZQUIERDA (~58% - NOMBRE, EDUCACIÓN, EXPERIENCIA, IDIOMAS)     */}
      {/* ========================================================================= */}
      <main className="w-[58%] p-7 space-y-5 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Header Nombre & Título */}
          <header className="space-y-0.5 pt-1">
            <h1 className="text-3xl sm:text-4xl tracking-tight text-neutral-950 uppercase leading-none">
              <span className="font-black">{firstName}</span>{' '}
              <span className="font-light text-neutral-600">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] pt-1"
                style={{ color: emeraldColor }}
              >
                {contact.professionalTitle}
              </p>
            )}
          </header>

          {/* EDUCATION (Cápsula Sólida) */}
          {validEducation.length > 0 && (
            <section className="space-y-3">
              <div
                className="px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-white text-[13px] font-black uppercase tracking-wider shadow-xs"
                style={{ backgroundColor: emeraldColor }}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>

              <div className="space-y-3 pl-1">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[9.5px] font-bold text-neutral-500">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </p>
                    )}
                    <h3 className="font-bold text-[11px] text-neutral-950">
                      {edu.degree}
                    </h3>
                    {edu.institution && (
                      <p className="text-[10px] text-neutral-600 italic">
                        {edu.institution}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EXPERIENCE (Cápsula Sólida) */}
          {validExperiences.length > 0 && (
            <section className="space-y-3">
              <div
                className="px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-white text-[13px] font-black uppercase tracking-wider shadow-xs"
                style={{ backgroundColor: emeraldColor }}
              >
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </div>

              <div className="space-y-3.5 pl-1">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-[9.5px] font-bold text-neutral-500">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Presente' : exp.endDate}
                      </p>
                    )}

                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11px] text-neutral-950">
                        {exp.position || 'Puesto Ocupado'}
                      </h3>
                    </div>

                    {exp.company && (
                      <p
                        className="text-[10px] font-semibold italic"
                        style={{ color: emeraldColor }}
                      >
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
                                style={{ color: emeraldColor }}
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
        </div>

        {/* LANGUAGES (Medidores Circulares SVG) */}
        {validLanguages.length > 0 && (
          <footer className="space-y-3 pt-2">
            <div
              className="px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-white text-[13px] font-black uppercase tracking-wider shadow-xs"
              style={{ backgroundColor: emeraldColor }}
            >
              <LanguagesIcon className="w-4 h-4" />
              <span>Languages</span>
            </div>

            <div className="grid grid-cols-3 gap-3 pl-1 pt-1">
              {validLanguages.slice(0, 3).map((lang) => {
                const percent = getLanguagePercent(lang.proficiency);
                const radius = 18;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (percent / 100) * circumference;

                return (
                  <div key={lang.id} className="flex flex-col items-center space-y-1">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                        <circle
                          cx="22"
                          cy="22"
                          r={radius}
                          stroke="#e5e7eb"
                          strokeWidth="3"
                          fill="transparent"
                        />
                        <circle
                          cx="22"
                          cy="22"
                          r={radius}
                          stroke={emeraldColor}
                          strokeWidth="3.5"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <span className="absolute text-[9px] font-black text-neutral-900">
                        {percent}%
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-neutral-800 text-center truncate max-w-[80px]">
                      {lang.language}
                    </p>
                  </div>
                );
              })}
            </div>
          </footer>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~42% - ESMERALDA - FOTO, ABOUT, CONTACT, SKILLS)      */}
      {/* ========================================================================= */}
      <aside
        className="w-[42%] text-white p-6 flex flex-col justify-between shrink-0 space-y-6"
        style={{ backgroundColor: emeraldColor }}
      >
        <div className="space-y-6">
          {/* Avatar Circular Superior */}
          <div className="flex justify-center pt-2">
            {contact.photoUrl ? (
              <div className="w-36 h-36 p-1 rounded-full bg-white/20 shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={contact.photoUrl}
                    alt={rawName}
                    className={`w-full h-full object-cover ${getPhotoRadius()}`}
                  />
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white/10 flex flex-col items-center justify-center text-white shadow-xl">
                <User className="w-10 h-10 mb-1 opacity-80" />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* ABOUT ME (Cápsula Hueca) */}
          {summary && (
            <section className="space-y-2">
              <div className="w-full py-1 border-2 border-white/80 rounded-full text-center text-white text-[13px] font-black uppercase tracking-wider">
                About Me
              </div>
              <p className="text-[10.5px] text-white/90 leading-relaxed text-justify px-1 pt-0.5">
                {summary}
              </p>
            </section>
          )}

          {/* CONTACT ME (Cápsula Hueca) */}
          <section className="space-y-2.5">
            <div className="w-full py-1 border-2 border-white/80 rounded-full text-center text-white text-[13px] font-black uppercase tracking-wider">
              Contact Me
            </div>
            <div className="space-y-2 text-[10px] text-white/90 px-1 pt-1">
              {contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-white" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center gap-3 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-white" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.links?.portfolio && (
                <div className="flex items-center gap-3">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-white" />
                  <span className="truncate">{contact.links.portfolio}</span>
                </div>
              )}
              {(contact.city || contact.country) && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-white" />
                  <span>
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* PRO SKILLS (Cápsula Hueca + Barras de Alto Contraste) */}
          {validSkills.length > 0 && (
            <section className="space-y-2.5">
              <div className="w-full py-1 border-2 border-white/80 rounded-full text-center text-white text-[13px] font-black uppercase tracking-wider">
                Pro Skills
              </div>
              <div className="space-y-2.5 px-1 pt-1">
                {validSkills.map((skill) => {
                  const percent = getSkillPercentNum(skill.level);
                  return (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex justify-between text-[9.5px] font-bold uppercase tracking-wider text-white">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-300 shadow-sm"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* REFERENCES (En caso de existir) */}
        {validReferences.length > 0 && (
          <footer className="space-y-1.5 border-t border-white/20 pt-3">
            <p className="text-[11px] font-black uppercase tracking-wider text-white">
              References
            </p>
            <div className="space-y-1.5 text-[9.5px] text-white/80">
              {validReferences.slice(0, 2).map((ref) => (
                <div key={ref.id}>
                  <p className="font-bold text-white">{ref.name}</p>
                  <p className="text-white/70">
                    {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                  </p>
                  {ref.phone && <p className="text-white font-medium">{ref.phone}</p>}
                </div>
              ))}
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
};