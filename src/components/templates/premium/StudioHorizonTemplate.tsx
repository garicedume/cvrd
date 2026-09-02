'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import { User, Plus } from 'lucide-react';

interface Props {
  data: CVData;
}

export const StudioHorizonTemplate: React.FC<Props> = ({ data }) => {
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

  // Acento dinámico (Coral / Rojo Rubí editorial por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#e11d48'
      : colorScheme || '#e11d48';

  // Separación del nombre
  const rawName = (contact.fullName || 'Henry Watson').trim();
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

  // Porcentaje numérico para las barras de habilidades
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
      {/* Barra de acento superior fija */}
      <div className="w-full h-1.5 shrink-0" style={{ backgroundColor: accent }} />

      <div className="p-10 pt-8 flex-1 flex flex-col justify-between space-y-7">
        {/* ========================================================================= */}
        {/* 1. CABECERA EDITORIAL (AVATAR CIRCULAR + NOMBRE + RESUME DATE)             */}
        {/* ========================================================================= */}
        <header className="flex items-start justify-between gap-8 pb-4">
          <div className="flex items-center gap-7">
            {/* Avatar Circular con Doble Borde Concéntrico */}
            <div className="shrink-0">
              {contact.photoUrl ? (
                <div className="w-32 h-32 p-1.5 rounded-full bg-neutral-100 border border-neutral-300 shadow-xs">
                  <div className="w-full h-full rounded-full overflow-hidden border border-neutral-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={contact.photoUrl}
                      alt={rawName}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-32 h-32 p-1.5 rounded-full bg-neutral-100 border border-neutral-300 shadow-xs">
                  <div
                    className="w-full h-full rounded-full flex flex-col items-center justify-center text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <User className="w-10 h-10 mb-1 opacity-80" />
                    <span className="text-xs font-black tracking-widest">{initials}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Nombre, Cargo y Barra de Acento */}
            <div className="space-y-1.5 pt-1">
              <h1 className="text-3xl sm:text-4xl tracking-[0.14em] text-neutral-950 uppercase leading-none">
                <span className="font-light">{firstName}</span>{' '}
                <span className="font-bold">{lastName}</span>
              </h1>
              {contact.professionalTitle && (
                <p className="text-xs font-semibold tracking-wider text-neutral-700">
                  {contact.professionalTitle}
                </p>
              )}
              {/* Barra de acento inferior al cargo */}
              <div className="w-10 h-0.5 rounded-full mt-2" style={{ backgroundColor: accent }} />
            </div>
          </div>

          {/* Fecha / Metadatos Superiores */}
          <div className="text-right space-y-0.5 pt-1 shrink-0">
            <p className="text-[11px] font-black uppercase tracking-wider text-neutral-950">
              Resume
            </p>
            <p className="text-[9px] text-neutral-400 font-medium font-mono">
              Curriculum Vitae
            </p>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL (2 COLUMNAS: IZQUIERDA ~40% | DERECHA ~60%)            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-10 items-start flex-1">
          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA (~40%): ABOUT ME + EDUCATION + SKILLS                 */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="col-span-5 space-y-7">
            {/* ABOUT ME */}
            {summary && (
              <section className="space-y-2.5">
                <div className="space-y-1 border-b border-dotted border-neutral-300 pb-1">
                  <div className="flex items-center gap-1.5" style={{ color: accent }}>
                    <Plus className="w-3.5 h-3.5 stroke-3" />
                    <h2 className="text-[12px] font-bold uppercase tracking-wider">
                      About Me
                    </h2>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-600 leading-relaxed text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* EDUCATION */}
            {validEducation.length > 0 && (
              <section className="space-y-3">
                <div className="space-y-1 border-b border-dotted border-neutral-300 pb-1">
                  <div className="flex items-center gap-1.5" style={{ color: accent }}>
                    <Plus className="w-3.5 h-3.5 stroke-3" />
                    <h2 className="text-[12px] font-bold uppercase tracking-wider">
                      Education
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 pt-1">
                  {validEducation.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[9px] font-medium text-neutral-400 font-mono">
                          {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                        </p>
                      )}
                      {edu.institution && (
                        <p className="text-[9.5px] text-neutral-600 italic leading-tight">
                          {edu.institution}
                        </p>
                      )}
                      <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-neutral-950 leading-tight">
                        {edu.degree || 'Degree Title'}
                      </h3>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SKILLS CON BARRAS HORIZONTALES ROJAS/ACENTO */}
            {validSkills.length > 0 && (
              <section className="space-y-3">
                <div className="space-y-1 border-b border-dotted border-neutral-300 pb-1">
                  <div className="flex items-center gap-1.5" style={{ color: accent }}>
                    <Plus className="w-3.5 h-3.5 stroke-3" />
                    <h2 className="text-[12px] font-bold uppercase tracking-wider">
                      Skills
                    </h2>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {validSkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between gap-4">
                      <span className="text-[9.5px] font-semibold text-neutral-800 truncate w-28">
                        {skill.name}
                      </span>
                      <div className="flex-1 h-2 bg-neutral-200 rounded-xs overflow-hidden">
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
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA DERECHA (~60%): MY PROFILE + EXPERIENCE + REFERENCES            */}
          {/* ----------------------------------------------------------------------- */}
          <main className="col-span-7 space-y-7">
            {/* MY PROFILE (DATOS DE CONTACTO E IDIOMAS) */}
            <section className="space-y-2.5">
              <div className="space-y-1 border-b border-dotted border-neutral-300 pb-1">
                <div className="flex items-center gap-1.5" style={{ color: accent }}>
                  <Plus className="w-3.5 h-3.5 stroke-3" />
                  <h2 className="text-[12px] font-bold uppercase tracking-wider">
                    My Profile
                  </h2>
                </div>
              </div>

              <div className="space-y-1.5 text-[9.5px] text-neutral-600 leading-relaxed pt-0.5">
                {(contact.city || contact.country) && (
                  <p className="text-neutral-700">
                    <span className="font-semibold text-neutral-900">Ubicación:</span>{' '}
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </p>
                )}
                {(contact.phone || contact.email || contact.links?.portfolio) && (
                  <p className="text-neutral-700">
                    {[
                      contact.phone,
                      contact.email,
                      contact.links?.portfolio,
                    ]
                      .filter(Boolean)
                      .join('  |  ')}
                  </p>
                )}
                {validLanguages.length > 0 && (
                  <p className="pt-0.5">
                    <span className="font-bold text-neutral-900">Idiomas:</span>{' '}
                    {validLanguages
                      .map((l) => `${l.language} (${l.proficiency})`)
                      .join(', ')}
                  </p>
                )}
              </div>
            </section>

            {/* EXPERIENCE */}
            {validExperiences.length > 0 && (
              <section className="space-y-3.5">
                <div className="space-y-1 border-b border-dotted border-neutral-300 pb-1">
                  <div className="flex items-center gap-1.5" style={{ color: accent }}>
                    <Plus className="w-3.5 h-3.5 stroke-3" />
                    <h2 className="text-[12px] font-bold uppercase tracking-wider">
                      Experience
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 pt-1">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-[9px] font-medium text-neutral-400 font-mono">
                          {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                        </p>
                      )}
                      <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                        {exp.position || 'Project Manager'}
                      </h3>
                      {exp.company && (
                        <p className="text-[9.5px] font-semibold text-neutral-500 italic">
                          {exp.company}
                        </p>
                      )}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="space-y-1 pt-0.5 text-[10px] text-neutral-600 leading-relaxed">
                          {exp.responsibilities
                            .filter((r) => r.trim())
                            .map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="font-bold shrink-0 mt-0.5" style={{ color: accent }}>
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

            {/* REFERENCES */}
            {validReferences.length > 0 && (
              <section className="space-y-3">
                <div className="space-y-1 border-b border-dotted border-neutral-300 pb-1">
                  <div className="flex items-center gap-1.5" style={{ color: accent }}>
                    <Plus className="w-3.5 h-3.5 stroke-3" />
                    <h2 className="text-[12px] font-bold uppercase tracking-wider">
                      References
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1 text-[9.5px] text-neutral-700">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-neutral-950 uppercase">{ref.name}</p>
                      <p className="text-neutral-500 italic">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="text-neutral-800 font-mono">T: {ref.phone}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};