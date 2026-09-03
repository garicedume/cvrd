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

  // Acento dinámico seguro en HEX
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

  // Control de forma de la foto
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

  // Filtrado de elementos
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  // Porcentaje para barras
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
      style={{ width: '816px', height: '1056px', padding: '0.6in', color: '#171717', backgroundColor: '#ffffff' }}
    >
      {/* ========================================================================= */}
      {/* FILA 1: Avatar / Identidad (Izq) vs Encabezado y Datos Vitales (Der)      */}
      {/* ========================================================================= */}
      <div className="bg-[#1a1829] text-[#ffffff] p-4 rounded-t-[28px] flex flex-col justify-center items-center shadow-md">
        {contact?.photoUrl ? (
          <div className="flex justify-center">
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
            className="w-28 h-28 border-4 bg-[#171717] flex flex-col items-center justify-center text-[#ffffff] shadow-xl"
            style={{
              borderColor: accent,
              borderRadius: contact.photoShape === 'square' ? '0px' : contact.photoShape === 'rounded' ? '16px' : '9999px'
            }}
          >
            <User className="w-9 h-9 mb-1 opacity-70" style={{ color: accent }} />
            <span className="text-xs font-black tracking-widest">{initials}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center space-y-2.5">
        <header className="space-y-1">
          <h1 className="text-2xl sm:text-3xl tracking-tight text-[#0a0a0a] uppercase leading-none">
            <span className="font-black">{firstName}</span>{' '}
            <span className="font-light text-[#404040]">{lastName}</span>
          </h1>

          {contact?.professionalTitle && (
            <div>
              <span
                className="inline-block px-3.5 py-0.5 text-[#ffffff] text-[10px] font-black uppercase tracking-[0.18em] rounded-full shadow-xs"
                style={{ backgroundColor: accent }}
              >
                {contact.professionalTitle}
              </span>
            </div>
          )}
        </header>

        {/* Datos Personales con Estilo Mejorado */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {contact?.phone && (
            <div
              className="px-3 py-1 rounded-full text-[#ffffff] text-[9px] font-medium flex items-center gap-1.5 shadow-xs"
              style={{ backgroundColor: accent }}
            >
              <Phone className="w-3 h-3" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact?.email && (
            <div
              className="px-3 py-1 rounded-full text-[#ffffff] text-[9px] font-medium flex items-center gap-1.5 shadow-xs"
              style={{ backgroundColor: accent }}
            >
              <Mail className="w-3 h-3" />
              <span className="truncate max-w-40">{contact.email}</span>
            </div>
          )}
          {contact?.links?.website && (
            <div
              className="px-3 py-1 rounded-full text-[#ffffff] text-[9px] font-medium flex items-center gap-1.5 shadow-xs"
              style={{ backgroundColor: accent }}
            >
              <Globe className="w-3 h-3" />
              <span className="truncate max-w-32">{contact.links.website}</span>
            </div>
          )}
          {(contact?.city || contact?.country) && (
            <div
              className="px-3 py-1 rounded-full text-[#ffffff] text-[9px] font-medium flex items-center gap-1.5 shadow-xs"
              style={{ backgroundColor: accent }}
            >
              <MapPin className="w-3 h-3" />
              <span>{[contact.city, contact.country].filter(Boolean).join(', ')}</span>
            </div>
          )}
        </div>

        {summary && (
          <p className="text-[9.5px] text-[#525252] leading-relaxed text-justify pt-1">
            {summary}
          </p>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FILA 2: Educación (Izq) vs Experiencia Laboral (Der)                      */}
      {/* ========================================================================= */}
      <div className="bg-[#1a1829] text-[#ffffff] p-4 flex flex-col justify-start space-y-2 shadow-md">
        {validEducation.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <div
                className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]"
                style={{ backgroundColor: accent }}
              >
                <GraduationCap className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[11.5px] font-black uppercase tracking-wider text-[#ffffff]">
                Educación
              </h2>
            </div>

            <div className="space-y-2 pl-0.5">
              {validEducation.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  {edu.institution && (
                    <p className="text-[8.5px] font-semibold text-[#a3a3a3] italic">
                      {edu.institution}
                    </p>
                  )}
                  <h3 className="font-bold text-[9.5px] uppercase tracking-wide text-[#ffffff]">
                    {edu.degree || 'Título Académico'}
                  </h3>
                  {/* Año de educación corregido y visible */}
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-[9px] font-bold tracking-wide" style={{ color: accent }}>
                      {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="flex flex-col justify-start space-y-2">
        {validExperiences.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#d4d4d4] pb-1">
              <div
                className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]"
                style={{ backgroundColor: accent }}
              >
                <Briefcase className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[12px] font-black uppercase tracking-wider text-[#0a0a0a]">
                Experiencia Laboral
              </h2>
            </div>

            <div className="space-y-2.5">
              {validExperiences.map((exp) => {
                const respList = getResponsibilitiesArray(exp.responsibilities);
                return (
                  <div key={exp.id} className="flex items-start gap-2.5">
                    {/* Año en Experiencia Laboral con ancho corregido para que no se pierda */}
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
                        <p className="text-[9px] font-semibold text-[#737373] italic">
                          {exp.company}
                        </p>
                      )}
                      <h3 className="font-bold text-[9.5px] uppercase tracking-wide text-[#0a0a0a]">
                        {exp.position || 'Puesto Laboral'}
                      </h3>
                      {respList.length > 0 && (
                        <ul className="space-y-0.5 pt-0.5 text-[9px] text-[#525252] leading-relaxed">
                          {respList.map((resp: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1">
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

      {/* ========================================================================= */}
      {/* FILA 3: Idiomas y Referencias (Izq) vs Habilidades (Der)                  */}
      {/* ========================================================================= */}
      <div className="bg-[#1a1829] text-[#ffffff] p-4 rounded-b-[28px] flex flex-col justify-start space-y-3 shadow-md">
        {validLanguages.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <div
                className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]"
                style={{ backgroundColor: accent }}
              >
                <LanguagesIcon className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[11.5px] font-black uppercase tracking-wider text-[#ffffff]">
                Idiomas
              </h2>
            </div>

            <div className="space-y-2 pt-0.5">
              {validLanguages.map((lang) => {
                const percent = getSkillPercent(lang.proficiency);
                return (
                  <div key={lang.id} className="space-y-0.5">
                    <div className="flex justify-between text-[9px]">
                      <span className="font-semibold text-[#ffffff]">{lang.language}</span>
                      <span className="text-[#a3a3a3] text-[8px]">{lang.proficiency}</span>
                    </div>
                    <div className="relative w-full h-1 bg-white/20 rounded-full flex items-center">
                      <div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accent, width: `${percent}%` }}
                      />
                      <div
                        className="absolute w-2 h-2 bg-[#ffffff] rounded-full shadow-xs -ml-1 border border-[#171717]"
                        style={{ left: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {validReferences.length > 0 && (
          <section className="space-y-2 pt-1 border-t border-white/20">
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <div
                className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]"
                style={{ backgroundColor: accent }}
              >
                <Quote className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[11.5px] font-black uppercase tracking-wider text-[#ffffff]">
                Referencias
              </h2>
            </div>

            <div className="space-y-2 pl-0.5 text-[9px] text-[#d4d4d4]">
              {validReferences.slice(0, 2).map((ref) => (
                <div key={ref.id} className="space-y-0.5 border-b border-white/10 pb-1">
                  <p className="font-bold text-[#ffffff] text-[9.5px]">{ref.name}</p>
                  <p className="text-[#a3a3a3] italic">
                    {ref.relationship} {ref.company ? `/ ${ref.company}` : ''}
                  </p>
                  {ref.phone && <p style={{ color: accent }}>Tel: {ref.phone}</p>}
                  {ref.email && <p className="text-[#a3a3a3] break-all text-[8px]">{ref.email}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="flex flex-col justify-start space-y-2">
        {validSkills.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#d4d4d4] pb-1">
              <div
                className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-[#ffffff]"
                style={{ backgroundColor: accent }}
              >
                <Sliders className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[12px] font-black uppercase tracking-wider text-[#0a0a0a]">
                Habilidades
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-0.5">
              {validSkills.map((skill) => {
                const percent = getSkillPercent(skill.level);
                return (
                  <div key={skill.id} className="space-y-0.5">
                    <div className="flex justify-between text-[9px] font-bold text-[#262626]">
                      <span>{skill.name}</span>
                    </div>
                    <div className="relative w-full h-1 bg-[#e5e5e5] rounded-full flex items-center">
                      <div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accent, width: `${percent}%` }}
                      />
                      <div
                        className="absolute w-2 h-2 rounded-full shadow-xs -ml-1 border border-[#ffffff]"
                        style={{ backgroundColor: accent, left: `${percent}%` }}
                      />
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
};