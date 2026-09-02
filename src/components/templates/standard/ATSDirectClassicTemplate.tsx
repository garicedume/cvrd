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

export const ATSDirectClassicTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#1e3a8a',
  } = data;

  const accent = colorScheme || '#1e3a8a';

  // Separación del nombre: Primer(os) nombre(s) en BOLD y Apellido(s) en LIGHT
  const rawName = (contact.fullName || 'Millie Smith').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales para fallback sin foto
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Radio de fotografía dinámico
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

  // Filtrado de campos con contenido real
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
      className={`relative bg-white text-neutral-800 font-${
        fontFamily || 'Inter'
      } text-[10.5px] leading-relaxed w-full min-h-264 px-10 py-9 flex flex-col justify-between selection:bg-neutral-200`}
    >
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* 1. CABECERA EDITORIAL CENTRADA (NOMBRE DUAL + TÍTULO PROFESIONAL)         */}
        {/* ========================================================================= */}
        <header className="text-center space-y-2 pb-5 border-b border-neutral-300">
          <h1 className="text-3xl sm:text-4xl tracking-[0.18em] text-neutral-900 uppercase">
            <span className="font-black">{firstName}</span>{' '}
            <span className="font-light text-neutral-600">{lastName}</span>
          </h1>
          {contact.professionalTitle && (
            <p
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: accent }}
            >
              {contact.professionalTitle}
            </p>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. CUERPO EN 2 COLUMNAS CON LÍNEA DIVISORIA VERTICAL CONTINUA             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-8 items-stretch">
          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA (~36%): FOTO + ABOUT + CONTACT + SKILLS + IDIOMAS     */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="col-span-5 pr-4 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Foto de Perfil o Monograma Centrado */}
              <div className="flex justify-center pt-1">
                {contact.photoUrl ? (
                  <div className="w-32 h-32 p-1 rounded-full border border-neutral-200 shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={contact.photoUrl}
                        alt={rawName}
                        className={`w-full h-full object-cover ${getPhotoRadius()}`}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-inner"
                    style={{ backgroundColor: accent }}
                  >
                    {initials}
                  </div>
                )}
              </div>

              {/* ABOUT (Perfil Profesional) */}
              {summary && (
                <section className="space-y-2">
                  <h2
                    className="text-[15px] font-black uppercase tracking-widest border-b border-neutral-200 pb-1"
                    style={{ color: accent }}
                  >
                    About
                  </h2>
                  <p className="text-[10.5px] text-neutral-600 leading-relaxed text-justify">
                    {summary}
                  </p>
                </section>
              )}

              {/* CONTACT */}
              <section className="space-y-2.5">
                <h2
                  className="text-[15px] font-black uppercase tracking-widest border-b border-neutral-200 pb-1"
                  style={{ color: accent }}
                >
                  Contact
                </h2>
                <div className="space-y-2 text-[10.5px] text-neutral-700">
                  {contact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center gap-3 break-all">
                      <Mail className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                      <span>{contact.email}</span>
                    </div>
                  )}
                  {contact.links?.portfolio && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                      <span className="truncate">{contact.links.portfolio}</span>
                    </div>
                  )}
                  {(contact.city || contact.country) && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                      <span>
                        {[contact.city, contact.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                  {contact.links?.linkedin && (
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-3.5 h-3.5 shrink-0 fill-current text-neutral-800"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                      </svg>
                      <span className="truncate">{contact.links.linkedin}</span>
                    </div>
                  )}
                </div>
              </section>

              {/* SKILLS */}
              {validSkills.length > 0 && (
                <section className="space-y-2.5">
                  <h2
                    className="text-[15px] font-black uppercase tracking-widest border-b border-neutral-200 pb-1"
                    style={{ color: accent }}
                  >
                    Skills
                  </h2>
                  <ul className="space-y-1.5 text-[10.5px] text-neutral-700">
                    {validSkills.map((skill) => (
                      <li key={skill.id} className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-xs shrink-0"
                          style={{ backgroundColor: accent }}
                        />
                        <span className="font-medium text-neutral-900">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="text-[9.5px] text-neutral-400">
                            ({skill.level})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* IDIOMAS (Ubicados al pie de la columna izquierda si existen) */}
            {validLanguages.length > 0 && (
              <div className="pt-3 border-t border-neutral-200 space-y-1.5">
                <h3
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  Languages
                </h3>
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
              </div>
            )}
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA DERECHA (~64%): EDUCATION + DIVIDER + EXPERIENCE + REFERENCIAS  */}
          {/* ----------------------------------------------------------------------- */}
          <main className="col-span-7 border-l border-neutral-300 pl-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* EDUCATION */}
              {validEducation.length > 0 && (
                <section className="space-y-3">
                  <h2
                    className="text-[15px] font-black uppercase tracking-widest border-b border-neutral-200 pb-1"
                    style={{ color: accent }}
                  >
                    Education
                  </h2>
                  <div className="space-y-3">
                    {validEducation.map((edu) => (
                      <div key={edu.id} className="space-y-0.5">
                        {(edu.startDate || edu.endDate) && (
                          <p className="text-[9.5px] font-semibold text-neutral-500">
                            {edu.startDate}{' '}
                            {edu.startDate && (edu.endDate || edu.isCurrent)
                              ? '–'
                              : ''}{' '}
                            {edu.isCurrent ? 'Actual' : edu.endDate}
                          </p>
                        )}
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-900">
                          • {edu.degree || 'Título Universitario'}
                        </h3>
                        {edu.institution && (
                          <p className="text-[10px] text-neutral-600 pl-3">
                            {edu.institution}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* EXPERIENCE */}
              {validExperiences.length > 0 && (
                <section className="space-y-3 pt-1">
                  <h2
                    className="text-[15px] font-black uppercase tracking-widest border-b border-neutral-200 pb-1"
                    style={{ color: accent }}
                  >
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {validExperiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-900">
                            • {exp.position || 'Puesto Desempeñado'}
                          </h3>
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-neutral-600 pl-3">
                          <span className="font-semibold" style={{ color: accent }}>
                            {exp.company}
                          </span>
                          {(exp.startDate || exp.endDate) && (
                            <span className="text-[9.5px] text-neutral-500">
                              {exp.startDate}{' '}
                              {exp.startDate && (exp.endDate || exp.isCurrent)
                                ? '–'
                                : ''}{' '}
                              {exp.isCurrent ? 'Presente' : exp.endDate}
                            </span>
                          )}
                        </div>

                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <ul className="space-y-1 pt-1 pl-3 text-[10.5px] text-neutral-600 leading-relaxed">
                            {exp.responsibilities
                              .filter((r) => r.trim())
                              .map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span
                                    className="font-bold shrink-0 mt-0.5"
                                    style={{ color: accent }}
                                  >
                                    -
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

            {/* REFERENCIAS (Al pie de la columna derecha si existen) */}
            {validReferences.length > 0 && (
              <footer className="pt-3 border-t border-neutral-200 space-y-1.5">
                <h3
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  References
                </h3>
                <div className="grid grid-cols-2 gap-3 text-[10px] text-neutral-600">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-neutral-900">{ref.name}</p>
                      <p className="text-neutral-500">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && (
                        <p className="font-semibold" style={{ color: accent }}>
                          {ref.phone}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </footer>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};