'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Trophy,
  Film,
  Headphones,
  Plane,
  User,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const PortfolioShowcaseTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#e5a93c',
  } = data;

  // Color de acento dinámico (Dorado / Ámbar de la muestra)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#e5a93c'
      : colorScheme || '#e5a93c';

  // Separación del nombre a 2 líneas editoriales
  const rawName = (contact.fullName || 'FULL NAME HERE').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo sin foto
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
      className={`relative bg-white text-neutral-900 font-${
        fontFamily || 'Inter'
      } text-[10px] leading-relaxed w-full min-h-264 flex selection:bg-neutral-200 overflow-hidden`}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA IZQUIERDA (~34% - BARRA LATERAL OSCURA COMPLETA)               */}
      {/* ========================================================================= */}
      <aside className="w-[34%] bg-[#1a1e24] text-white flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          {/* Foto Superior sin cortes artificiales */}
          <div className="w-full h-56 bg-[#13161c] overflow-hidden relative">
            {contact.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={contact.photoUrl}
                alt={rawName}
                className="w-full h-full object-cover grayscale contrast-125 object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white bg-[#13161c]">
                <User className="w-14 h-14 mb-2 opacity-60" style={{ color: accent }} />
                <span className="text-xs font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          <div className="px-6 space-y-4">
            {/* PROFILE */}
            {summary && (
              <section className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white shrink-0">
                    Profile
                  </h2>
                  <div className="h-px bg-neutral-600 flex-1" />
                </div>
                <p className="text-[9px] text-neutral-300 leading-relaxed text-justify line-clamp-5">
                  {summary}
                </p>
              </section>
            )}

            {/* ADDRESS */}
            {(contact.city || contact.country) && (
              <section className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white shrink-0">
                    Address
                  </h2>
                  <div className="h-px bg-neutral-600 flex-1" />
                </div>
                <p className="text-[9px] text-neutral-300 leading-relaxed">
                  {[contact.city, contact.country].filter(Boolean).join(', ')}
                </p>
              </section>
            )}

            {/* CONTACT */}
            <section className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white shrink-0">
                  Contact
                </h2>
                <div className="h-px bg-neutral-600 flex-1" />
              </div>
              <div className="space-y-1 text-[9px] text-neutral-300">
                {contact.phone && (
                  <div>
                    <p className="font-bold text-neutral-400 text-[8px] uppercase">Phone:</p>
                    <p className="text-white">{contact.phone}</p>
                  </div>
                )}
                {contact.email && (
                  <div>
                    <p className="font-bold text-neutral-400 text-[8px] uppercase">Email:</p>
                    <p className="text-white break-all">{contact.email}</p>
                  </div>
                )}
              </div>
            </section>

            {/* SKILLS CON BARRAS HORIZONTALES */}
            {validSkills.length > 0 && (
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white shrink-0">
                    Skills
                  </h2>
                  <div className="h-px bg-neutral-600 flex-1" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  {validSkills.slice(0, 6).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between gap-3">
                      <span className="text-[9px] font-medium text-neutral-200 truncate flex-1">
                        {skill.name}
                      </span>
                      <div className="w-24 h-2 bg-neutral-700 rounded-xs overflow-hidden shrink-0">
                        <div
                          className="h-full rounded-xs transition-all duration-300"
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
        </div>

        {/* Website en el fondo del sidebar */}
        <footer className="p-3.5 px-6 border-t border-neutral-800 bg-[#14161d] text-center">
          <p className="text-[8.5px] font-medium text-neutral-400 truncate tracking-wider">
            {contact.links?.portfolio || 'www.yourwebsite.com'}
          </p>
        </footer>
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~66% - HEADER + TIMELINE CONECTADO + INTERESES)       */}
      {/* ========================================================================= */}
      <main className="flex-1 p-8 py-7 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Nombre & Título */}
          <header className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 leading-none">
              <span className="block">{firstName}</span>
              <span className="block font-black text-neutral-800">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p
                className="text-[11px] font-bold uppercase tracking-[0.2em] pt-1"
                style={{ color: accent }}
              >
                {contact.professionalTitle}
              </p>
            )}
            <div className="w-full h-0.5 mt-2" style={{ backgroundColor: accent }} />
          </header>

          {/* EDUCATION (Línea vertical continua con nodos) */}
          {validEducation.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-[11.5px] font-black uppercase tracking-[0.18em] text-neutral-950">
                Education
              </h2>

              <div className="space-y-2 pt-0.5">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-12 gap-2 items-start">
                    {/* Años */}
                    <div className="col-span-3 text-right pt-0.5">
                      <span className="text-[9px] font-bold text-neutral-700 font-mono">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </span>
                    </div>

                    {/* Nodo y Línea de Conexión */}
                    <div className="col-span-1 flex flex-col items-center self-stretch relative">
                      <div
                        className="w-2.5 h-2.5 rounded-full z-10 shrink-0 mt-0.5 shadow-xs"
                        style={{ backgroundColor: accent }}
                      />
                      <div
                        className="w-px h-full absolute top-2 bottom-0"
                        style={{ backgroundColor: accent }}
                      />
                    </div>

                    {/* Contenido */}
                    <div className="col-span-8 space-y-0.5 pb-1">
                      <h3 className="font-bold text-[10px] uppercase tracking-wide text-neutral-950">
                        {edu.degree || 'Degree Title'}
                      </h3>
                      {edu.institution && (
                        <p className="text-[9px] text-neutral-600 italic">
                          {edu.institution}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="w-full h-px bg-neutral-200" />

          {/* EXPERIENCE (Línea vertical continua con nodos) */}
          {validExperiences.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-[11.5px] font-black uppercase tracking-[0.18em] text-neutral-950">
                Experience
              </h2>

              <div className="space-y-2.5 pt-0.5">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-12 gap-2 items-start">
                    {/* Años */}
                    <div className="col-span-3 text-right pt-0.5">
                      <span className="text-[9px] font-bold text-neutral-700 font-mono">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    {/* Nodo y Línea de Conexión */}
                    <div className="col-span-1 flex flex-col items-center self-stretch relative">
                      <div
                        className="w-2.5 h-2.5 rounded-full z-10 shrink-0 mt-0.5 shadow-xs"
                        style={{ backgroundColor: accent }}
                      />
                      <div
                        className="w-px h-full absolute top-2 bottom-0"
                        style={{ backgroundColor: accent }}
                      />
                    </div>

                    {/* Contenido */}
                    <div className="col-span-8 space-y-0.5 pb-1">
                      <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-neutral-950">
                        {exp.position || 'Senior Specialist'}
                      </h3>
                      {exp.company && (
                        <p className="text-[9px] font-semibold text-neutral-600 italic">
                          {exp.company}
                        </p>
                      )}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="space-y-0.5 pt-0.5 text-[9px] text-neutral-600 leading-relaxed">
                          {exp.responsibilities
                            .filter((r) => r.trim())
                            .slice(0, 2)
                            .map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-1">
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

          <div className="w-full h-px bg-neutral-200" />

          {/* OTHER / REFERENCES */}
          {validReferences.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-[11.5px] font-black uppercase tracking-[0.18em] text-neutral-950">
                Other / References
              </h2>

              <div className="space-y-2 pt-0.5">
                {validReferences.slice(0, 2).map((ref) => (
                  <div key={ref.id} className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-3 text-right pt-0.5">
                      <span className="text-[8.5px] font-bold text-neutral-400 uppercase">
                        Reference
                      </span>
                    </div>
                    <div className="col-span-1 flex flex-col items-center self-stretch relative">
                      <div
                        className="w-2.5 h-2.5 rounded-full z-10 shrink-0 mt-0.5 shadow-xs"
                        style={{ backgroundColor: accent }}
                      />
                      <div
                        className="w-px h-full absolute top-2 bottom-0"
                        style={{ backgroundColor: accent }}
                      />
                    </div>
                    <div className="col-span-8 space-y-0.5 pb-0.5">
                      <p className="font-bold text-neutral-950 text-[10px] uppercase">{ref.name}</p>
                      <p className="text-neutral-500 italic text-[8.5px]">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="text-neutral-700 text-[8.5px]">T: {ref.phone}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* INTERESTS (Banda Horizontal Inferior) */}
        <footer className="pt-2.5 border-t border-neutral-200 space-y-2">
          <h2 className="text-[11.5px] font-black uppercase tracking-[0.18em] text-neutral-950">
            Interests
          </h2>
          <div className="flex items-center justify-around pt-0.5 text-neutral-800">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-xs"
                style={{ backgroundColor: `${accent}20`, color: accent }}
              >
                <Trophy className="w-4 h-4" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-600">Sports</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-xs"
                style={{ backgroundColor: `${accent}20`, color: accent }}
              >
                <Film className="w-4 h-4" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-600">Cinema</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-xs"
                style={{ backgroundColor: `${accent}20`, color: accent }}
              >
                <Headphones className="w-4 h-4" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-600">Music</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-xs"
                style={{ backgroundColor: `${accent}20`, color: accent }}
              >
                <Plane className="w-4 h-4" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-600">Travel</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PortfolioShowcaseTemplate;