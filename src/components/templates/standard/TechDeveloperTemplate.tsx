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
  Quote,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const TechDeveloperTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#0284c7',
  } = data;

  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#0284c7'
      : colorScheme || '#0284c7';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact.fullName || 'Brian S. Neal').trim();
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
      case 'circle':
        return 'rounded-full';
      case 'rounded-rect':
        return 'rounded-xl';
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

  // Porcentaje numérico para habilidades
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

  // Porcentaje para idiomas
  const getLangPercent = (proficiency?: string) => {
    switch (proficiency) {
      case 'Nativo':
        return '100%';
      case 'Avanzado':
        return '85%';
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
      } text-[10.5px] leading-relaxed w-full min-h-264 p-8 flex flex-col justify-between selection:bg-neutral-200 overflow-hidden`}
    >
      <div className="space-y-5">
        {/* ========================================================================= */}
        {/* 1. CABECERA EDITORIAL (FOTO ASIMÉTRICA + NOMBRE + ABOUT ME + CONTACTO)    */}
        {/* ========================================================================= */}
        <header className="space-y-4">
          <div className="flex items-start gap-6">
            {/* Retrato Asimétrico con Bloque de Fondo */}
            <div className="relative shrink-0 w-32 h-36">
              <div
                className="absolute bottom-0 left-0 w-28 h-28 rounded-xs shadow-md"
                style={{ backgroundColor: accent }}
              />
              {contact.photoUrl ? (
                <div
                  className={`relative w-28 h-32 ml-3 mt-1 overflow-hidden border-2 border-white shadow-xl bg-neutral-200 ${getPhotoRadius()}`}
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
                  className={`relative w-28 h-32 ml-3 mt-1 overflow-hidden border-2 border-white shadow-xl bg-neutral-900 flex flex-col items-center justify-center text-white ${getPhotoRadius()}`}
                >
                  <User className="w-8 h-8 mb-1 opacity-70" />
                  <span className="text-xs font-black tracking-widest">{initials}</span>
                </div>
              )}
            </div>

            {/* Nombre, Título y About Me */}
            <div className="flex-1 space-y-2 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl tracking-tight text-neutral-950 uppercase leading-none">
                  <span className="font-semibold text-neutral-500">HELLO. I&apos;M </span>
                  <span className="font-black text-neutral-950">{firstName}</span>{' '}
                  <span className="font-light text-neutral-700">{lastName}</span>
                </h1>
                {contact.professionalTitle && (
                  <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-500 uppercase pt-1">
                    {contact.professionalTitle}
                  </p>
                )}
              </div>

              {summary && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center gap-1.5 text-neutral-900 font-black text-xs uppercase tracking-wider">
                    <div
                      className="w-4 h-4 rounded-xs flex items-center justify-center text-white text-[9px]"
                      style={{ backgroundColor: accent }}
                    >
                      <User className="w-2.5 h-2.5" />
                    </div>
                    <span>About Me</span>
                  </div>
                  <p className="text-[10.5px] text-neutral-600 leading-relaxed text-justify">
                    {summary}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Banda de Contacto Horizontal */}
          <div className="border-y border-neutral-200 py-2 flex flex-wrap items-center justify-between text-[10px] text-neutral-700 font-medium">
            <span className="font-black uppercase tracking-wider text-neutral-950">
              Contact Me
            </span>
            {contact.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-neutral-900" />
                <span>{contact.phone}</span>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-neutral-900" />
                <span>{contact.email}</span>
              </div>
            )}
            {contact.links?.portfolio && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-neutral-900" />
                <span className="truncate max-w-[150px]">{contact.links.portfolio}</span>
              </div>
            )}
            {(contact.city || contact.country) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-neutral-900" />
                <span>
                  {[contact.city, contact.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. CUERPO EN 2 COLUMNAS (WORK EXPERIENCE & MY EDUCATION CON TIMELINES)     */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          {/* Franja de Títulos con Fondo Gris Suave */}
          <div className="grid grid-cols-12 gap-6 bg-neutral-100/90 py-1.5 px-3 rounded-xs border border-neutral-200">
            <div className="col-span-6 flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-xs flex items-center justify-center text-white"
                style={{ backgroundColor: accent }}
              >
                <Briefcase className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                Work Experience
              </h2>
            </div>
            <div className="col-span-6 flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-xs flex items-center justify-center text-white"
                style={{ backgroundColor: accent }}
              >
                <GraduationCap className="w-2.5 h-2.5" />
              </div>
              <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                My Education
              </h2>
            </div>
          </div>

          {/* Grid de Experiencia y Educación */}
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Columna Izquierda: Experiencia */}
            <div className="col-span-6 border-l-2 border-neutral-200 pl-4 space-y-4">
              {validExperiences.map((exp) => (
                <div key={exp.id} className="relative space-y-1">
                  {/* Notch / Tick Rectangular */}
                  <div
                    className="absolute -left-[21px] top-1 w-2 h-3.5 rounded-xs"
                    style={{ backgroundColor: accent }}
                  />

                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                      {exp.position || 'Job Position'}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-neutral-600 font-semibold">{exp.company}</span>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-[9.5px] font-medium text-neutral-400">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    )}
                  </div>

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

            {/* Columna Derecha: Educación */}
            <div className="col-span-6 border-l-2 border-neutral-200 pl-4 space-y-4">
              {validEducation.map((edu) => (
                <div key={edu.id} className="relative space-y-1">
                  {/* Notch / Tick Rectangular */}
                  <div
                    className="absolute -left-[21px] top-1 w-2 h-3.5 rounded-xs"
                    style={{ backgroundColor: accent }}
                  />

                  <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                    {edu.degree || 'Degree'}
                  </h3>

                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-neutral-600 italic">{edu.institution}</span>
                    {(edu.startDate || edu.endDate) && (
                      <span className="text-[9.5px] font-medium text-neutral-400">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PIE MODULAR EN 3 COLUMNAS (SKILLS, REFERENCES / BIO, LANGUAGES)        */}
      {/* ========================================================================= */}
      <footer className="bg-neutral-100/90 border border-neutral-200 rounded-xs p-4 mt-4 space-y-3">
        <div className="grid grid-cols-12 gap-6">
          {/* Columna 1: My Skills */}
          <div className="col-span-4 space-y-2">
            <div className="flex items-center gap-1.5 border-b border-neutral-300 pb-1">
              <Wrench className="w-3.5 h-3.5 text-neutral-800" />
              <h3 className="text-[12px] font-black uppercase tracking-wider text-neutral-950">
                My Skills
              </h3>
            </div>
            <div className="space-y-1.5 pt-0.5">
              {validSkills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="space-y-0.5">
                  <div className="flex justify-between text-[9.5px] font-bold text-neutral-800">
                    <span>{skill.name}</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-300 rounded-full overflow-hidden">
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
          </div>

          {/* Columna 2: References / Direct Contact */}
          <div className="col-span-4 space-y-2">
            <div className="flex items-center gap-1.5 border-b border-neutral-300 pb-1">
              <Quote className="w-3.5 h-3.5 text-neutral-800" />
              <h3 className="text-[12px] font-black uppercase tracking-wider text-neutral-950">
                References
              </h3>
            </div>
            <div className="space-y-2 pt-0.5 text-[9.5px] text-neutral-700">
              {validReferences.slice(0, 2).map((ref) => (
                <div key={ref.id} className="space-y-0.5">
                  <p className="font-bold text-neutral-900">{ref.name}</p>
                  <p className="text-neutral-500 italic">
                    {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                  </p>
                  {ref.phone && <p className="font-semibold text-neutral-800">{ref.phone}</p>}
                </div>
              ))}
              {validReferences.length === 0 && (
                <p className="text-neutral-500 italic text-[9px]">
                  Disponibles a solicitud del empleador.
                </p>
              )}
            </div>
          </div>

          {/* Columna 3: Languages */}
          <div className="col-span-4 space-y-2">
            <div className="flex items-center gap-1.5 border-b border-neutral-300 pb-1">
              <LanguagesIcon className="w-3.5 h-3.5 text-neutral-800" />
              <h3 className="text-[12px] font-black uppercase tracking-wider text-neutral-950">
                Languages
              </h3>
            </div>
            <div className="space-y-2 pt-0.5 text-[9.5px]">
              {validLanguages.slice(0, 3).map((lang) => (
                <div key={lang.id} className="space-y-0.5">
                  <div className="flex justify-between font-bold text-neutral-800">
                    <span>{lang.language}</span>
                    <span className="text-neutral-500 font-mono text-[8.5px]">
                      {lang.proficiency}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-300 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: accent,
                        width: getLangPercent(lang.proficiency),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};