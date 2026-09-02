'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Home,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const ATSMinimalTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#171717',
  } = data;

  const accent = colorScheme || '#171717';

  // Separación inteligente de Nombre y Apellidos
  const rawName = (contact.fullName || 'Tu Nombre Completo').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales para cuando no hay foto subida
  const initials = nameParts.length > 1
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : rawName.slice(0, 2).toUpperCase();

  // Radio dinámico de la fotografía
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

  // Filtrado de elementos válidos (sin campos vacíos fantasmas)
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validReferences = references.filter((r) => r.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());

  return (
    <div
      className={`relative bg-white text-neutral-900 font-${fontFamily || 'Inter'} text-[10.5px] leading-relaxed w-full min-h-264 px-9 py-8 flex flex-col justify-between selection:bg-neutral-200`}
    >
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* 1. CABECERA EDITORIAL (FOTO O MONOGRAMA + SALUDO + NOMBRE DUAL + SUMMARY)  */}
        {/* ========================================================================= */}
        <header className="flex items-start gap-6">
          {/* Foto o Monograma Circular */}
          {contact.photoUrl ? (
            <div className="relative shrink-0 w-28 h-28 p-1 rounded-full border border-neutral-300">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contact.photoUrl}
                  alt={rawName}
                  className={`w-full h-full object-cover ${getPhotoRadius()}`}
                />
              </div>
            </div>
          ) : (
            <div className="relative shrink-0 w-24 h-24 p-1 rounded-full border border-neutral-200">
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-white text-xl font-black shadow-inner"
                style={{ backgroundColor: accent }}
              >
                {initials}
              </div>
            </div>
          )}

          {/* Bloque de Nombre, Título y Descripción */}
          <div className="flex-1 space-y-1.5 pt-1">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              Hello I&apos;m
            </p>
            <h1 className="text-2xl sm:text-3xl tracking-tight text-neutral-950 leading-none">
              <span className="font-black">{firstName}</span>{' '}
              <span className="font-light text-neutral-700">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p
                className="text-[11px] font-bold uppercase tracking-widest pt-0.5"
                style={{ color: accent }}
              >
                {contact.professionalTitle}
              </p>
            )}
            {summary && (
              <p className="text-[10.5px] text-neutral-600 leading-relaxed text-justify pt-1">
                {summary}
              </p>
            )}
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. LÍNEA DE TIEMPO HORIZONTAL: EDUCACIÓN                                  */}
        {/* ========================================================================= */}
        {validEducation.length > 0 && (
          <section className="space-y-3 pt-2">
            <h2 className="text-[15px] font-black uppercase tracking-widest text-neutral-950">
              Education
            </h2>

            <div className="relative pt-2 pb-1">
              <div className="absolute top-[13px] left-3 right-3 h-[1.5px] bg-neutral-300" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative">
                {validEducation.slice(0, 3).map((edu) => (
                  <div key={edu.id} className="space-y-1.5 relative">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full bg-white border-2 shadow-xs z-10 shrink-0"
                        style={{ borderColor: accent }}
                      />
                    </div>
                    <div className="space-y-0.5 pr-2">
                      <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-900 leading-tight">
                        {edu.degree || 'Título Obtenido'}
                      </h3>
                      {edu.institution && (
                        <p className="text-[10px] text-neutral-600 leading-tight">
                          {edu.institution}
                        </p>
                      )}
                      {(edu.startDate || edu.endDate) && (
                        <p
                          className="text-[9.5px] font-semibold"
                          style={{ color: accent }}
                        >
                          {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. CUERPO PRINCIPAL EN 2 COLUMNAS (CONTACT/SKILLS vs WORK EXPERIENCE)      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-8 pt-1">
          {/* COLUMNA IZQUIERDA: Contacto + Habilidades */}
          <aside className="col-span-4 space-y-6">
            {/* Contacto */}
            <div className="space-y-3">
              <h2 className="text-[14px] font-black uppercase tracking-widest text-neutral-950">
                Contact
              </h2>
              <div className="space-y-2 text-[10.5px] text-neutral-700">
                {(contact.city || contact.country) && (
                  <div className="flex items-center gap-2.5">
                    <Home className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                    <span>
                      {[contact.city, contact.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center gap-2.5 break-all">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                    <span>{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.links?.portfolio && (
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                    <span className="truncate">{contact.links.portfolio}</span>
                  </div>
                )}
                {contact.links?.linkedin && (
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-800" />
                    <span className="truncate">{contact.links.linkedin}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Habilidades con Monograma + Slider */}
            {validSkills.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-[14px] font-black uppercase tracking-widest text-neutral-950">
                  Skills
                </h2>
                <div className="space-y-2.5">
                  {validSkills.map((skill) => {
                    const words = skill.name.trim().split(' ');
                    const skillInitials =
                      words.length > 1
                        ? (words[0][0] + words[1][0]).toUpperCase()
                        : skill.name.slice(0, 2).toUpperCase();

                    const progressPercent =
                      skill.level === 'Experto'
                        ? 95
                        : skill.level === 'Avanzado'
                        ? 85
                        : skill.level === 'Intermedio'
                        ? 65
                        : 50;

                    return (
                      <div key={skill.id} className="flex items-center gap-2.5">
                        <div
                          className="w-5 h-5 rounded text-white flex items-center justify-center text-[9px] font-black uppercase shrink-0"
                          style={{ backgroundColor: accent }}
                        >
                          {skillInitials}
                        </div>

                        <div className="flex-1 space-y-0.5">
                          <div className="flex justify-between text-[10px] font-bold text-neutral-800">
                            <span>{skill.name}</span>
                          </div>
                          <div className="relative w-full h-1.5 bg-neutral-200 rounded-full flex items-center">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                backgroundColor: accent,
                                width: `${progressPercent}%`,
                              }}
                            />
                            <div
                              className="absolute w-2.5 h-2.5 rounded-full bg-white border-2 shadow-xs"
                              style={{
                                borderColor: accent,
                                left: `calc(${progressPercent}% - 5px)`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* COLUMNA DERECHA: Experiencia con Timeline Vertical */}
          <main className="col-span-8 space-y-3">
            <h2 className="text-[14px] font-black uppercase tracking-widest text-neutral-950">
              Work Experience
            </h2>

            {validExperiences.length > 0 && (
              <div className="relative border-l-[1.5px] border-neutral-300 ml-2 pl-5 space-y-5">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="relative space-y-1">
                    <div
                      className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-white border-2 shadow-xs"
                      style={{ borderColor: accent }}
                    />

                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                        {exp.position || 'Cargo Desempeñado'}
                        {(exp.startDate || exp.endDate) && (
                          <>
                            {' '}
                            <span className="font-normal text-neutral-400">|</span>{' '}
                            <span
                              className="font-semibold text-[10px]"
                              style={{ color: accent }}
                            >
                              {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Presente' : exp.endDate}
                            </span>
                          </>
                        )}
                      </h3>
                    </div>

                    {exp.company && (
                      <p className="text-[10px] font-medium text-neutral-600 italic">
                        {exp.company}
                      </p>
                    )}

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-1 pt-1 text-[10.5px] text-neutral-600 leading-relaxed">
                        {exp.responsibilities
                          .filter((resp) => resp.trim())
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
            )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. SECCIÓN INFERIOR: REFERENCIAS E IDIOMAS                                 */}
      {/* ========================================================================= */}
      {(validReferences.length > 0 || validLanguages.length > 0) && (
        <footer className="pt-4 border-t border-neutral-200 mt-4 space-y-3">
          <h2 className="text-[14px] font-black uppercase tracking-widest text-neutral-950">
            {validReferences.length > 0 ? 'References & Languages' : 'Languages'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {validReferences.slice(0, 2).map((ref) => (
              <div key={ref.id} className="space-y-0.5 text-[10px]">
                <p className="font-bold text-neutral-900 leading-tight">{ref.name}</p>
                <p className="text-neutral-500 leading-tight">
                  {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                </p>
                {ref.phone && (
                  <p className="font-semibold" style={{ color: accent }}>
                    {ref.phone}
                  </p>
                )}
              </div>
            ))}

            {validLanguages.length > 0 && (
              <div className="space-y-1 text-[10px]">
                <p className="font-bold text-neutral-900">Idiomas:</p>
                <div className="flex flex-wrap gap-2 text-neutral-600">
                  {validLanguages.map((l) => (
                    <span key={l.id} className="bg-neutral-100 px-2 py-0.5 rounded">
                      {l.language} ({l.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};