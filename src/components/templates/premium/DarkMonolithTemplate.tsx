'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  Users,
  Languages as LanguagesIcon,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const DarkMonolithTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#fbbf24',
  } = data;

  // Acento dinámico (Amarillo Oro / Ámbar por defecto)
  const accent =
    colorScheme === '#000000' || colorScheme === '#171717'
      ? '#fbbf24'
      : colorScheme || '#fbbf24';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact.fullName || 'Carlos R. Mendoza').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo sin foto
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Radio dinámico de la foto
  const getPhotoRadius = () => {
    switch (contact.photoShape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-none';
      default:
        return 'rounded-xl';
    }
  };

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
      } text-[10.5px] leading-relaxed w-full min-h-264 flex selection:bg-neutral-200 overflow-hidden`}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA IZQUIERDA (~35% - BLOQUE OSCURO MONOLÍTICO DE ALTA DENSIDAD)    */}
      {/* ========================================================================= */}
      <aside className="w-[35%] bg-[#12161f] text-white p-7 flex flex-col justify-between shrink-0 space-y-6">
        <div className="space-y-6">
          {/* Foto de Perfil con Marco de Acento */}
          <div className="flex justify-center">
            {contact.photoUrl ? (
              <div
                className={`w-full aspect-4/5 max-w-[190px] overflow-hidden border-2 shadow-2xl bg-neutral-900 ${getPhotoRadius()}`}
                style={{ borderColor: accent }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contact.photoUrl}
                  alt={rawName}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            ) : (
              <div
                className={`w-full aspect-4/5 max-w-[190px] border-2 bg-neutral-900 flex flex-col items-center justify-center text-white shadow-2xl ${getPhotoRadius()}`}
                style={{ borderColor: accent }}
              >
                <User className="w-12 h-12 mb-2 opacity-60" style={{ color: accent }} />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* CONTACTO: Bloque superior con iconos de acento */}
          <section className="space-y-2.5">
            <h2
              className="text-[12px] font-black uppercase tracking-[0.2em] border-b pb-1 flex items-center gap-1.5"
              style={{ color: accent, borderColor: `${accent}40` }}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Contacto</span>
            </h2>

            <div className="space-y-2 text-[9.5px] text-neutral-300 pl-0.5">
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-xs flex items-center justify-center text-neutral-950 shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    <Phone className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate">{contact.phone}</span>
                </div>
              )}

              {contact.email && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-xs flex items-center justify-center text-neutral-950 shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    <Mail className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate max-w-[155px]">{contact.email}</span>
                </div>
              )}

              {contact.links?.portfolio && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-xs flex items-center justify-center text-neutral-950 shrink-0"
                    style={{ backgroundColor: accent }}
                  >
                    <Globe className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate max-w-[155px]">{contact.links.portfolio}</span>
                </div>
              )}

              {(contact.city || contact.country) && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-xs flex items-center justify-center text-neutral-950 shrink-0"
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
          </section>

          {/* EDUCACIÓN */}
          {validEducation.length > 0 && (
            <section className="space-y-2.5">
              <h2
                className="text-[12px] font-black uppercase tracking-[0.2em] border-b pb-1 flex items-center gap-1.5"
                style={{ color: accent, borderColor: `${accent}40` }}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span>Educación</span>
              </h2>

              <div className="space-y-3 pl-0.5">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="font-bold text-[10px] uppercase tracking-wide text-white leading-tight">
                      {edu.degree || 'Título Académico'}
                    </h3>
                    {edu.institution && (
                      <p className="text-[9px] text-neutral-400 italic leading-tight">
                        {edu.institution}
                      </p>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[8.5px] font-semibold" style={{ color: accent }}>
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* IDIOMAS */}
          {validLanguages.length > 0 && (
            <section className="space-y-2">
              <h2
                className="text-[12px] font-black uppercase tracking-[0.2em] border-b pb-1 flex items-center gap-1.5"
                style={{ color: accent, borderColor: `${accent}40` }}
              >
                <LanguagesIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Idiomas</span>
              </h2>

              <div className="space-y-1.5 text-[9.5px] text-neutral-300 pl-0.5">
                {validLanguages.map((l) => (
                  <div key={l.id} className="flex justify-between border-b border-neutral-800/80 pb-0.5">
                    <span className="font-semibold text-white">{l.language}</span>
                    <span className="text-neutral-400 text-[9px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* REFERENCIAS[cite: 11] */}
        {validReferences.length > 0 && (
          <footer className="space-y-2 border-t border-neutral-800 pt-3">
            <h2
              className="text-[12px] font-black uppercase tracking-[0.2em] border-b pb-1 flex items-center gap-1.5"
              style={{ color: accent, borderColor: `${accent}40` }}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>Referencias</span>
            </h2>

            <div className="space-y-2.5 text-[9px] text-neutral-300 pl-0.5">
              {validReferences.slice(0, 2).map((ref) => (
                <div key={ref.id} className="space-y-0.5">
                  <p className="font-bold text-white text-[9.5px] uppercase">{ref.name}</p>
                  <p className="text-neutral-400 italic">
                    {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                  </p>
                  {ref.phone && <p className="font-medium" style={{ color: accent }}>T: {ref.phone}</p>}
                </div>
              ))}
            </div>
          </footer>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~65% - BANNER SUPERIOR DE ACENTO + CUERPO EDITORIAL)   */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col justify-between">
        {/* Banner Superior de Acento[cite: 11] */}
        <header
          className="p-8 py-7 space-y-1 shadow-sm"
          style={{ backgroundColor: accent }}
        >
          <h1 className="text-3xl sm:text-4xl tracking-tight text-neutral-950 uppercase leading-none">
            <span className="font-black">{firstName}</span>{' '}
            <span className="font-light text-neutral-900">{lastName}</span>
          </h1>
          {contact.professionalTitle && (
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-950 pt-1">
              {contact.professionalTitle}
            </p>
          )}
        </header>

        {/* Contenido Principal[cite: 11] */}
        <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            {/* SOBRE MÍ / PROFILE[cite: 11] */}
            {summary && (
              <section className="space-y-2">
                <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-neutral-950 border-b-2 border-neutral-900 pb-1">
                  Sobre Mí
                </h2>
                <p className="text-[10.5px] text-neutral-700 leading-relaxed text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* EXPERIENCIA LABORAL[cite: 11] */}
            {validExperiences.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-neutral-950 border-b-2 border-neutral-900 pb-1">
                  Experiencia Laboral
                </h2>

                <div className="space-y-4 pt-1">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                          {exp.position || 'Puesto Laboral'}
                        </h3>
                        {(exp.startDate || exp.endDate) && (
                          <span className="text-[9.5px] font-bold text-neutral-500">
                            {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Presente' : exp.endDate}
                          </span>
                        )}
                      </div>

                      {exp.company && (
                        <p className="text-[10px] font-semibold text-neutral-600 italic">
                          {exp.company}
                        </p>
                      )}

                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="space-y-1 pt-0.5 text-[10.5px] text-neutral-600 leading-relaxed">
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
          </div>

          {/* DOMINIO DE SOFTWARE / COMPETENCIAS[cite: 11] */}
          {validSkills.length > 0 && (
            <section className="space-y-2.5 pt-2 border-t border-neutral-200">
              <h2 className="text-[13px] font-black uppercase tracking-[0.18em] text-neutral-950 pb-1">
                Dominio de Software
              </h2>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 pt-1">
                {validSkills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-neutral-800">
                      <span>{skill.name}</span>
                      <span className="text-[9px] text-neutral-500">{skill.level}</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-950 rounded-full transition-all duration-300"
                        style={{ width: getSkillPercent(skill.level) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};