'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const CommercialSalesTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#f59e0b',
  } = data;

  // Acento dinámico (Amarillo ámbar / dorado por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#f59e0b'
      : colorScheme || '#f59e0b';

  // Separación del nombre[cite: 13]
  const rawName = (contact.fullName || 'Travis Anderson').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo sin foto[cite: 13]
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Radio dinámico de la foto[cite: 13]
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

  // Filtrado de elementos con contenido real[cite: 13]
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  // Porcentaje numérico para barras de habilidades[cite: 13]
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
      } text-[10.5px] leading-relaxed w-full min-h-264 flex flex-col justify-between selection:bg-neutral-200 overflow-hidden`}
    >
      {/* Franja vertical de acento izquierda */}
      <div
        className="absolute top-0 left-0 w-8 h-full z-0"
        style={{ backgroundColor: accent }}
      />

      <div className="relative z-10 p-8 pl-12 flex-1 flex flex-col justify-between space-y-6">
        {/* ========================================================================= */}
        {/* 1. CABECERA: RETRATO CIRCULAR + MARCO RECTANGULAR DE NOMBRE (*BOXED*)     */}
        {/* ========================================================================= */}
        <header className="flex items-center justify-between gap-8 pt-2">
          {/* Avatar Circular */}
          <div className="shrink-0 -ml-8">
            {contact.photoUrl ? (
              <div className="w-32 h-32 p-1.5 rounded-full bg-white shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={contact.photoUrl}
                    alt={rawName}
                    className={`w-full h-full object-cover grayscale contrast-125 ${getPhotoRadius()}`}
                  />
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white bg-neutral-900 flex flex-col items-center justify-center text-white shadow-lg">
                <User className="w-10 h-10 mb-1 opacity-70" style={{ color: accent }} />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* Nombre dentro de marco rectangular editorial */}
          <div className="flex-1 max-w-xl">
            <div className="border-2 border-neutral-900 p-4 py-3 text-center space-y-1">
              <h1 className="text-2xl sm:text-3xl tracking-[0.2em] text-neutral-950 uppercase leading-none">
                <span className="font-black">{firstName}</span>{' '}
                <span className="font-light text-neutral-700">{lastName}</span>
              </h1>
            </div>
            {contact.professionalTitle && (
              <div className="text-center pt-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-800">
                  {contact.professionalTitle}
                </p>
              </div>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. CUERPO EN 2 COLUMNAS (IZQUIERDA: CONTACTO/SKILLS | DERECHA: ABOUT/EDU/EXP) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-8 items-start pt-2">
          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA (~34%): CONTACTO, SKILLS, LANGUAGES, REFERENCES        */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="col-span-4 space-y-6">
            {/* CONTACT ME */}
            <div className="space-y-3 text-[10px] text-neutral-800">
              {contact.phone && (
                <div className="space-y-0.5">
                  <p className="font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-neutral-900 shrink-0" />
                    Phone
                  </p>
                  <p className="text-neutral-600 pl-4">{contact.phone}</p>
                </div>
              )}

              {contact.email && (
                <div className="space-y-0.5">
                  <p className="font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-neutral-900 shrink-0" />
                    Email
                  </p>
                  <p className="text-neutral-600 pl-4 break-all">{contact.email}</p>
                </div>
              )}

              {contact.links?.portfolio && (
                <div className="space-y-0.5">
                  <p className="font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-neutral-900 shrink-0" />
                    Website
                  </p>
                  <p className="text-neutral-600 pl-4 truncate">{contact.links.portfolio}</p>
                </div>
              )}

              {(contact.city || contact.country) && (
                <div className="space-y-0.5">
                  <p className="font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-neutral-900 shrink-0" />
                    Area
                  </p>
                  <p className="text-neutral-600 pl-4">
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}
            </div>

            {/* SKILLS */}
            {validSkills.length > 0 && (
              <section className="space-y-2.5 border-t border-neutral-300 pt-4">
                <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                  Skills
                </h2>
                <div className="space-y-2 pt-0.5">
                  {validSkills.map((skill) => (
                    <div key={skill.id} className="space-y-1">
                      <p className="text-[10px] font-semibold text-neutral-800 truncate">
                        {skill.name}
                      </p>
                      <div className="w-full h-1.5 bg-neutral-200 rounded-xs overflow-hidden">
                        <div
                          className="h-full bg-neutral-900 rounded-xs transition-all duration-300"
                          style={{ width: getSkillPercent(skill.level) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUAGES */}
            {validLanguages.length > 0 && (
              <section className="space-y-2.5 border-t border-neutral-300 pt-4">
                <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                  Languages
                </h2>
                <div className="space-y-2 pt-0.5">
                  {validLanguages.map((l) => (
                    <div key={l.id} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-neutral-800">
                        <span>{l.language}</span>
                        {l.proficiency && (
                          <span className="text-neutral-500 text-[9px]">
                            {l.proficiency}
                          </span>
                        )}
                      </div>
                      <div className="w-full h-1.5 bg-neutral-200 rounded-xs overflow-hidden">
                        <div
                          className="h-full bg-neutral-900 rounded-xs transition-all duration-300"
                          style={{ width: getSkillPercent(l.proficiency) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* REFERENCE */}
            {validReferences.length > 0 && (
              <footer className="space-y-2 border-t border-neutral-300 pt-4">
                <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                  Reference
                </h2>
                <div className="space-y-2.5 text-[9.5px] text-neutral-700">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-neutral-900 text-[10px] uppercase">
                        {ref.name}
                      </p>
                      <p className="text-neutral-500 italic">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="text-neutral-700">Phone: {ref.phone}</p>}
                      {ref.email && <p className="text-neutral-500 break-all">Email: {ref.email}</p>}
                    </div>
                  ))}
                </div>
              </footer>
            )}
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA DERECHA (~66%): ABOUT ME, EDUCATION (PRIMERO), WORK EXPERIENCE  */}
          {/* ----------------------------------------------------------------------- */}
          <main className="col-span-8 space-y-6">
            {/* ABOUT ME */}
            {summary && (
              <section className="space-y-2">
                <h2 className="text-[14px] font-black uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1">
                  About Me
                </h2>
                <p className="text-[10.5px] text-neutral-600 leading-relaxed text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* EDUCATION (Ahora ubicado arriba) */}
            {validEducation.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-[14px] font-black uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1">
                  Education
                </h2>
                <div className="space-y-3">
                  {validEducation.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                          {edu.degree || 'Bachelor Degree'}
                        </h3>
                        {(edu.startDate || edu.endDate) && (
                          <span className="text-[9.5px] font-bold text-neutral-500">
                            {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                          </span>
                        )}
                      </div>
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

            {/* WORK EXPERIENCE */}
            {validExperiences.length > 0 && (
              <section className="space-y-3 pt-1">
                <h2 className="text-[14px] font-black uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                          {exp.position || 'Graphic Designer'}
                        </h3>
                        {(exp.startDate || exp.endDate) && (
                          <span className="text-[9.5px] font-bold text-neutral-500">
                            {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        )}
                      </div>

                      {exp.company && (
                        <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
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
          </main>
        </div>
      </div>

      {/* Barra de Acento Horizontal en el Pie */}
      <footer
        className="w-full h-3 z-10"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
};