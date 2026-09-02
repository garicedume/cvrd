'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const CharcoalCompactTemplate: React.FC<Props> = ({ data }) => {
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

  // Acento dinámico para la barra inferior y los detalles
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#0284c7'
      : colorScheme || '#0284c7';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact.fullName || 'James Brown').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

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

  return (
    <div
      className={`relative bg-white text-neutral-900 font-${
        fontFamily || 'Inter'
      } text-[10.5px] leading-relaxed w-full min-h-264 flex flex-col justify-between selection:bg-neutral-200 overflow-hidden`}
    >
      <div>
        {/* ========================================================================= */}
        {/* 1. CABECERA DUAL (BLOQUE CHARCOAL OSCURO + BANDA DE ACENTO DE CONTACTO)   */}
        {/* ========================================================================= */}
        <header className="w-full">
          {/* Bloque Superior Charcoal */}
          <div className="bg-[#2b3548] text-white py-8 px-6 text-center space-y-1.5 shadow-xs">
            <h1 className="text-3xl sm:text-4xl tracking-[0.15em] text-white uppercase leading-none">
              <span className="font-black">{firstName}</span>{' '}
              <span className="font-light text-slate-200">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 pt-1">
                {contact.professionalTitle}
              </p>
            )}
          </div>

          {/* Banda de Acento con Contacto */}
          <div
            className="py-2.5 px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-white text-[10px] font-medium shadow-sm"
            style={{ backgroundColor: accent }}
          >
            {contact.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 shrink-0 text-white" />
                <span>{contact.phone}</span>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 shrink-0 text-white" />
                <span>{contact.email}</span>
              </div>
            )}
            {contact.links?.portfolio && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 shrink-0 text-white" />
                <span className="truncate max-w-[200px]">{contact.links.portfolio}</span>
              </div>
            )}
            {(contact.city || contact.country) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 shrink-0 text-white" />
                <span>
                  {[contact.city, contact.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. CUERPO PRINCIPAL EN 2 COLUMNAS (60% IZQUIERDA / 40% DERECHA)           */}
        {/* ========================================================================= */}
        <div className="p-8 grid grid-cols-12 gap-8 items-start">
          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA (~60%): PROFILE + EXPERIENCE                          */}
          {/* ----------------------------------------------------------------------- */}
          <main className="col-span-7 space-y-6">
            {/* PROFILE */}
            {summary && (
              <section className="space-y-2 pb-5 border-b border-neutral-300">
                <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-900">
                  Profile
                </h2>
                <p className="text-[10.5px] text-neutral-600 leading-relaxed text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* EXPERIENCE */}
            {validExperiences.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-900">
                  Experience
                </h2>
                <div className="space-y-5">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-[9.5px] font-semibold text-neutral-400 uppercase tracking-wider">
                          {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                        </p>
                      )}
                      <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-900">
                        {exp.position || 'Enter Your Job Position'}
                      </h3>
                      {exp.company && (
                        <p className="text-[10px] text-neutral-500 italic">
                          {exp.company}
                        </p>
                      )}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="space-y-1 pt-1 text-[10.5px] text-neutral-600 leading-relaxed">
                          {exp.responsibilities
                            .filter((r) => r.trim())
                            .map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="font-bold text-neutral-900 shrink-0 mt-0.5">•</span>
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

          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA DERECHA (~40%): EDUCATION + EXPERTISES + REFERENCES             */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="col-span-5 border-l border-neutral-300 pl-8 space-y-6 flex flex-col justify-between min-h-full">
            <div className="space-y-6">
              {/* EDUCATION */}
              {validEducation.length > 0 && (
                <section className="space-y-3 pb-5 border-b border-neutral-300">
                  <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-900">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {validEducation.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-900 leading-tight">
                          {edu.degree || 'Degree Title'}
                        </h3>
                        {edu.institution && (
                          <p className="text-[10px] text-neutral-600 italic leading-tight">
                            {edu.institution}
                          </p>
                        )}
                        {(edu.startDate || edu.endDate) && (
                          <p className="text-[9.5px] text-neutral-400 font-medium">
                            {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* EXPERTISES / SKILLS */}
              {validSkills.length > 0 && (
                <section className="space-y-3 pb-5 border-b border-neutral-300">
                  <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-900">
                    Expertises
                  </h2>
                  <ul className="space-y-1.5 text-[10.5px] text-neutral-700">
                    {validSkills.map((skill) => (
                      <li key={skill.id} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" />
                        <span className="font-medium text-neutral-800">
                          {skill.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* LANGUAGES (Si existen) */}
              {validLanguages.length > 0 && (
                <section className="space-y-2 pb-4 border-b border-neutral-300">
                  <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-900">
                    Languages
                  </h2>
                  <div className="space-y-1 text-[10px] text-neutral-600">
                    {validLanguages.map((lang) => (
                      <div key={lang.id} className="flex justify-between">
                        <span className="font-semibold text-neutral-800">
                          {lang.language}
                        </span>
                        <span className="text-neutral-500">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* REFERENCES */}
            {validReferences.length > 0 && (
              <footer className="space-y-2 pt-1">
                <h2 className="text-[14px] font-black uppercase tracking-[0.18em] text-neutral-900">
                  References
                </h2>
                <div className="space-y-3 text-[10px] text-neutral-600">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-[11px] text-neutral-900 uppercase">
                        {ref.name}
                      </p>
                      <p className="text-neutral-500 italic">
                        {ref.relationship} {ref.company ? `/ ${ref.company}` : ''}
                      </p>
                      {ref.phone && (
                        <p className="text-neutral-700">
                          <span className="font-semibold">Phone:</span> {ref.phone}
                        </p>
                      )}
                      {ref.email && (
                        <p className="text-neutral-700">
                          <span className="font-semibold">Email:</span> {ref.email}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </footer>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};