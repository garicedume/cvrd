'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { User } from 'lucide-react';

interface Props {
  data: CVData;
}

export const LogisticsProTemplate: React.FC<Props> = ({ data }) => {
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

  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#f59e0b'
      : colorScheme || '#f59e0b';

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

  // Radio de foto dinámico
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

  // Filtrado de campos válidos
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
      {/* 1. COLUMNA IZQUIERDA (~35% - FOTO COMPACTA + CONTACTO + EDU + REF + IDIOM) */}
      {/* ========================================================================= */}
      <aside className="w-[35%] bg-[#1a1e24] text-white flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          {/* Foto Superior Reducida y Proporcional */}
          <div className="w-full h-40 bg-neutral-800 overflow-hidden flex items-center justify-center">
            {contact.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={contact.photoUrl}
                alt={rawName}
                className={`w-full h-full object-cover grayscale contrast-125 ${getPhotoRadius()}`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white bg-neutral-900">
                <User className="w-10 h-10 mb-1 opacity-60" style={{ color: accent }} />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          <div className="px-6 space-y-5">
            {/* CONTACTO: Subido directamente debajo de la foto */}
            <section className="space-y-2 pb-3 border-b border-neutral-800">
              {contact.phone && (
                <div className="space-y-0.5">
                  <span
                    className="inline-block px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-neutral-950 rounded-xs"
                    style={{ backgroundColor: accent }}
                  >
                    Phone
                  </span>
                  <p className="text-[9.5px] text-neutral-300 pl-0.5">{contact.phone}</p>
                </div>
              )}

              {contact.email && (
                <div className="space-y-0.5">
                  <span
                    className="inline-block px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-neutral-950 rounded-xs"
                    style={{ backgroundColor: accent }}
                  >
                    Email
                  </span>
                  <p className="text-[9.5px] text-neutral-300 pl-0.5 break-all">{contact.email}</p>
                </div>
              )}

              {contact.links?.portfolio && (
                <div className="space-y-0.5">
                  <span
                    className="inline-block px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-neutral-950 rounded-xs"
                    style={{ backgroundColor: accent }}
                  >
                    Website
                  </span>
                  <p className="text-[9.5px] text-neutral-300 pl-0.5 truncate">
                    {contact.links.portfolio}
                  </p>
                </div>
              )}

              {(contact.city || contact.country) && (
                <div className="space-y-0.5">
                  <span
                    className="inline-block px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-neutral-950 rounded-xs"
                    style={{ backgroundColor: accent }}
                  >
                    Address
                  </span>
                  <p className="text-[9.5px] text-neutral-300 pl-0.5">
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}
            </section>

            {/* EDUCATION */}
            {validEducation.length > 0 && (
              <section className="space-y-2">
                <h2
                  className="text-[13px] font-black uppercase tracking-wider text-white border-b-2 pb-0.5"
                  style={{ borderColor: accent }}
                >
                  Education
                </h2>
                <div className="space-y-2.5">
                  {validEducation.map((edu) => (
                    <div key={edu.id} className="space-y-0.5 text-[10px]">
                      <h3 className="font-bold uppercase tracking-wide text-white leading-tight">
                        {edu.degree || 'Enter Your Major'}
                      </h3>
                      {edu.institution && (
                        <p className="text-neutral-400 italic leading-tight text-[9.5px]">
                          {edu.institution}
                        </p>
                      )}
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[8.5px] text-neutral-500">
                          {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* REFERENCE */}
            {validReferences.length > 0 && (
              <section className="space-y-2">
                <h2
                  className="text-[13px] font-black uppercase tracking-wider text-white border-b-2 pb-0.5"
                  style={{ borderColor: accent }}
                >
                  Reference
                </h2>
                <div className="space-y-2.5 text-[9px] text-neutral-300">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-white text-[10px]">{ref.name}</p>
                      <p className="text-neutral-400 italic">
                        {ref.relationship} {ref.company ? `| ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="text-neutral-300">T: {ref.phone}</p>}
                      {ref.email && <p className="text-neutral-400 break-all">{ref.email}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUAGES */}
            {validLanguages.length > 0 && (
              <section className="space-y-1.5 pb-2">
                <h2
                  className="text-[13px] font-black uppercase tracking-wider text-white border-b-2 pb-0.5"
                  style={{ borderColor: accent }}
                >
                  Languages
                </h2>
                <div className="space-y-1 text-[9.5px] text-neutral-300">
                  {validLanguages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span className="font-semibold text-white">{l.language}</span>
                      <span className="text-neutral-400">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~65% - BANNER SUPERIOR + ABOUT + WORK + SKILLS)        */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col justify-between">
        {/* Banner Superior Amarillo/Acento */}
        <header
          className="p-8 py-6 space-y-1 shadow-xs"
          style={{ backgroundColor: accent }}
        >
          <h1 className="text-3xl sm:text-4xl tracking-tight text-neutral-950 uppercase leading-none">
            <span className="font-black">{firstName}</span>{' '}
            <span className="font-light text-neutral-900">{lastName}</span>
          </h1>
          {contact.professionalTitle && (
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-900 pt-1">
              {contact.professionalTitle}
            </p>
          )}
        </header>

        {/* Contenido Principal */}
        <div className="p-8 space-y-5 flex-1 flex flex-col justify-between">
          <div className="space-y-5">
            {/* ABOUT ME */}
            {summary && (
              <section className="space-y-1.5">
                <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-950 border-b border-neutral-300 pb-1">
                  About Me
                </h2>
                <p className="text-[10.5px] text-neutral-700 leading-relaxed text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* WORK EXPERIENCE */}
            {validExperiences.length > 0 && (
              <section className="space-y-2.5">
                <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-950 border-b border-neutral-300 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-3.5">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-12 gap-3 items-start">
                      {/* Subcolumna Fechas */}
                      <div className="col-span-3 pt-0.5">
                        {(exp.startDate || exp.endDate) && (
                          <p className="text-[9.5px] font-bold text-neutral-500">
                            {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                          </p>
                        )}
                      </div>

                      {/* Subcolumna Cargo, Empresa y Tareas */}
                      <div className="col-span-9 space-y-1 border-l border-neutral-200 pl-3">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                          {exp.position || 'Job Position Here'}
                        </h3>
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
                                  <span className="font-bold text-neutral-900 shrink-0 mt-0.5">
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
          </div>

          {/* SOFTWARE SKILLS */}
          {validSkills.length > 0 && (
            <section className="space-y-2 pt-2">
              <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-950 border-b border-neutral-300 pb-1">
                Software Skill
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 pt-1">
                {validSkills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <p className="text-[10px] font-semibold text-neutral-800 truncate">
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
        </div>
      </main>
    </div>
  );
};