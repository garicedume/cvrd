'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Star,
  User,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const NavyCorporateTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#0c2340',
  } = data;

  // Color principal de bloques sólidos (Navy por defecto o color seleccionado)
  const navyColor = colorScheme || '#0c2340';
  const goldAccent = '#f59e0b'; // Acento dorado corporativo

  // Separación de Nombre y Apellidos
  const rawName = (contact.fullName || 'Robert J. Belvin').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo sin foto
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

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

  // Función para calcular estrellas según el nivel
  const getStarCount = (level?: string) => {
    switch (level) {
      case 'Experto':
        return 5;
      case 'Avanzado':
        return 4;
      case 'Intermedio':
        return 3;
      case 'Básico':
        return 2;
      default:
        return 4;
    }
  };

  return (
    <div
      className={`relative bg-white text-neutral-900 font-${
        fontFamily || 'Inter'
      } text-[10.5px] leading-relaxed w-full min-h-264 flex selection:bg-neutral-200`}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA LATERAL IZQUIERDA (AZUL MARINO - CONTACTO, BIO, IDIOMAS)       */}
      {/* ========================================================================= */}
      <aside
        className="w-[34%] text-white p-6 flex flex-col justify-between shrink-0 space-y-6"
        style={{ backgroundColor: navyColor }}
      >
        <div className="space-y-6">
          {/* Foto con capa de desplazamiento (Offset Layer) */}
          <div className="relative mx-auto w-32 h-36 pt-2">
            <div
              className="absolute top-0 left-0 w-28 h-32 bg-blue-500/40 rounded-sm"
              style={{ backgroundColor: `${goldAccent}33` }}
            />
            {contact.photoUrl ? (
              <div className="relative w-28 h-32 ml-3 mt-2 overflow-hidden rounded-xs border-2 border-white shadow-lg bg-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contact.photoUrl}
                  alt={rawName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative w-28 h-32 ml-3 mt-2 overflow-hidden rounded-xs border-2 border-white shadow-lg bg-neutral-900 flex flex-col items-center justify-center text-amber-400">
                <User className="w-8 h-8 mb-1 opacity-80" />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* CONTACT ME */}
          <section className="space-y-2.5">
            <h2 className="text-xs font-black uppercase tracking-widest text-white border-b border-dashed border-amber-400/60 pb-1">
              Contact Me
            </h2>
            <div className="space-y-2 text-[10px] text-neutral-200">
              {contact.phone && (
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Phone Number
                  </p>
                  <p className="pl-3 text-neutral-300">{contact.phone}</p>
                </div>
              )}

              {(contact.city || contact.country) && (
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Location Address
                  </p>
                  <p className="pl-3 text-neutral-300">
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}

              {contact.email && (
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    E-mail
                  </p>
                  <p className="pl-3 text-neutral-300 break-all">{contact.email}</p>
                </div>
              )}

              {contact.links?.portfolio && (
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Website / Portfolio
                  </p>
                  <p className="pl-3 text-neutral-300 truncate">
                    {contact.links.portfolio}
                  </p>
                </div>
              )}

              {contact.links?.linkedin && (
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    LinkedIn
                  </p>
                  <p className="pl-3 text-neutral-300 truncate">
                    {contact.links.linkedin}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* LANGUAGES */}
          {validLanguages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-white border-b border-dashed border-amber-400/60 pb-1">
                Languages
              </h2>
              <div className="space-y-1.5 text-[10px]">
                {validLanguages.map((lang) => (
                  <div key={lang.id} className="flex items-center justify-between text-neutral-200">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      {lang.language}
                    </span>
                    <span className="text-[9px] text-amber-400 font-medium">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* REFERENCES */}
        {validReferences.length > 0 && (
          <footer className="space-y-2 border-t border-dashed border-amber-400/60 pt-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-white">
              References
            </h2>
            <div className="space-y-2 text-[9.5px] text-neutral-300">
              {validReferences.slice(0, 2).map((ref) => (
                <div key={ref.id} className="space-y-0.5">
                  <p className="font-bold text-white">{ref.name}</p>
                  <p className="text-neutral-400 text-[9px]">
                    {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                  </p>
                  {ref.phone && <p className="text-amber-400 text-[8.5px]">{ref.phone}</p>}
                </div>
              ))}
            </div>
          </footer>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* 2. CUERPO PRINCIPAL DERECHO (ENCABEZADO + BANNERS SÓLIDOS + TIMELINE)      */}
      {/* ========================================================================= */}
      <main className="flex-1 py-7 px-8 space-y-5 flex flex-col justify-between border-l-2 border-neutral-100">
        <div className="space-y-5">
          {/* Header Nombre & Título */}
          <header className="space-y-1">
            <h1 className="text-3xl sm:text-4xl tracking-tight text-neutral-900 leading-none">
              <span className="font-black">{firstName}</span>{' '}
              <span className="font-light text-neutral-600">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 pt-1">
                {contact.professionalTitle}
              </p>
            )}
            <div className="w-full h-1 mt-2.5 rounded-full" style={{ backgroundColor: goldAccent }} />
          </header>

          {/* ABOUT ME (Banner Sólido) */}
          {summary && (
            <section className="space-y-1.5">
              <div
                className="px-3.5 py-1 text-white font-black text-[13px] uppercase tracking-wider rounded-xs flex items-center justify-between"
                style={{ backgroundColor: navyColor }}
              >
                <span>About Me</span>
              </div>
              <p className="text-[10.5px] text-neutral-700 leading-relaxed text-justify px-1 pt-0.5">
                {summary}
              </p>
            </section>
          )}

          {/* EDUCATION (Banner Sólido + Nodos de Línea) */}
          {validEducation.length > 0 && (
            <section className="space-y-2">
              <div
                className="px-3.5 py-1 text-white font-black text-[13px] uppercase tracking-wider rounded-xs"
                style={{ backgroundColor: navyColor }}
              >
                <span>Education</span>
              </div>
              <div className="space-y-2.5 px-1 pt-1">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="relative pl-3 border-l-2 border-amber-400 space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11px] text-neutral-900">
                        {edu.degree || 'Título Académico'}
                      </h3>
                      {(edu.startDate || edu.endDate) && (
                        <span className="text-[9.5px] font-semibold text-neutral-500">
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

          {/* JOB EXPERIENCE (Banner Sólido + Nodos de Línea) */}
          {validExperiences.length > 0 && (
            <section className="space-y-2">
              <div
                className="px-3.5 py-1 text-white font-black text-[13px] uppercase tracking-wider rounded-xs"
                style={{ backgroundColor: navyColor }}
              >
                <span>Job Experience</span>
              </div>
              <div className="space-y-3.5 px-1 pt-1">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 border-amber-400 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11px] text-neutral-950">
                        {exp.position || 'Puesto Desempeñado'}
                      </h3>
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-[9.5px] font-semibold text-neutral-500">
                          {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Presente' : exp.endDate}
                        </span>
                      )}
                    </div>

                    {exp.company && (
                      <p className="text-[10px] font-semibold text-neutral-600">
                        {exp.company}
                      </p>
                    )}

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-1 pt-0.5 text-[10.5px] text-neutral-600 leading-relaxed">
                        {exp.responsibilities
                          .filter((r) => r.trim())
                          .map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="font-bold text-amber-500 shrink-0 mt-0.5">•</span>
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

          {/* SKILLS CON RATING DE ESTRELLAS (5 STARS) */}
          {validSkills.length > 0 && (
            <section className="space-y-2">
              <div
                className="px-3.5 py-1 text-white font-black text-[13px] uppercase tracking-wider rounded-xs"
                style={{ backgroundColor: navyColor }}
              >
                <span>Skills</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-1 pt-1">
                {validSkills.map((skill) => {
                  const stars = getStarCount(skill.level);
                  return (
                    <div key={skill.id} className="flex items-center justify-between text-[10.5px]">
                      <span className="font-semibold text-neutral-800 truncate pr-2">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= stars
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-neutral-200 fill-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};