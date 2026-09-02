'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Scale,
  Award,
  BookOpen,
  Briefcase,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const LegalCounselTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Merriweather',
    colorScheme = '#0f172a',
  } = data;

  const accent = colorScheme || '#0f172a';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact.fullName || 'Lic. Roberto M. Beltrán').trim();
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
      case 'rounded-rect':
        return 'rounded-xl';
      default:
        return 'rounded-xs';
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

  return (
    <div
      className={`relative bg-white text-neutral-900 font-${
        fontFamily || 'Merriweather'
      } text-[10.5px] leading-relaxed w-full min-h-264 p-9 flex flex-col justify-between selection:bg-neutral-200 overflow-hidden`}
    >
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* 1. CABECERA JURÍDICA FORMAL CON FILETE DOBLE CLÁSICO                       */}
        {/* ========================================================================= */}
        <header className="border-b-2 border-neutral-900 pb-4 space-y-3">
          <div className="flex items-center justify-between gap-6">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 shrink-0" style={{ color: accent }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">
                  Despacho Jurídico & Consultoría Legal
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl tracking-tight text-neutral-950 uppercase leading-none">
                <span className="font-black">{firstName}</span>{' '}
                <span className="font-light text-neutral-700">{lastName}</span>
              </h1>

              {contact.professionalTitle && (
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] pt-0.5"
                  style={{ color: accent }}
                >
                  {contact.professionalTitle}
                </p>
              )}
            </div>

            {/* Foto Formal o Monograma */}
            {contact.photoUrl ? (
              <div
                className={`w-24 h-28 overflow-hidden border-2 border-neutral-900 shadow-sm shrink-0 ${getPhotoRadius()}`}
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
                className={`w-24 h-28 border-2 border-neutral-900 bg-neutral-100 flex flex-col items-center justify-center text-neutral-900 shadow-sm shrink-0 ${getPhotoRadius()}`}
              >
                <Scale className="w-6 h-6 mb-1 opacity-70" style={{ color: accent }} />
                <span className="text-xs font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* Barra de Contacto con Divisores en Rombo */}
          <div className="pt-2 border-t border-neutral-300 flex flex-wrap items-center justify-between text-[10px] text-neutral-700">
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
            {contact.links?.linkedin && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-neutral-900" />
                <span className="truncate max-w-[170px]">{contact.links.linkedin}</span>
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
        {/* 2. CUERPO EN 2 COLUMNAS (ÁREAS DE PRÁCTICA vs EXPERIENCIA Y FORMACIÓN)    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA (~34%): PERFIL, ÁREAS DE PRÁCTICA, IDIOMAS            */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="col-span-4 space-y-6 border-r border-neutral-300 pr-6">
            {/* ÁREAS DE PRÁCTICA */}
            {validSkills.length > 0 && (
              <section className="space-y-3">
                <div className="border-b-2 pb-1" style={{ borderColor: accent }}>
                  <h2 className="text-[14.5px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
                    <Award className="w-4 h-4 shrink-0" style={{ color: accent }} />
                    <span>Áreas de Práctica</span>
                  </h2>
                </div>
                <ul className="space-y-2 text-[10.5px] text-neutral-800">
                  {validSkills.map((skill) => (
                    <li key={skill.id} className="flex items-start gap-2">
                      <span
                        className="font-bold text-xs shrink-0 mt-0.5"
                        style={{ color: accent }}
                      >
                        §
                      </span>
                      <div>
                        <p className="font-bold text-neutral-900 leading-tight">
                          {skill.name}
                        </p>
                        {skill.level && (
                          <p className="text-[9px] text-neutral-500 italic">
                            Especialidad: {skill.level}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* IDIOMAS */}
            {validLanguages.length > 0 && (
              <section className="space-y-3">
                <div className="border-b-2 pb-1" style={{ borderColor: accent }}>
                  <h2 className="text-[14.5px] font-black uppercase tracking-wider text-neutral-950">
                    Idiomas Jurídicos
                  </h2>
                </div>
                <div className="space-y-1.5 text-[10px] text-neutral-700">
                  {validLanguages.map((l) => (
                    <div key={l.id} className="flex justify-between border-b border-neutral-100 pb-0.5">
                      <span className="font-bold text-neutral-900">{l.language}</span>
                      <span className="text-neutral-500 italic">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* REFERENCIAS / CLIENTES INSTITUCIONALES */}
            {validReferences.length > 0 && (
              <section className="space-y-3">
                <div className="border-b-2 pb-1" style={{ borderColor: accent }}>
                  <h2 className="text-[14.5px] font-black uppercase tracking-wider text-neutral-950">
                    Referencias
                  </h2>
                </div>
                <div className="space-y-2.5 text-[10px] text-neutral-700">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-neutral-900">{ref.name}</p>
                      <p className="text-neutral-500 italic text-[9.5px]">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="font-medium text-neutral-800">{ref.phone}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* COLUMNA DERECHA (~66%): PERFIL, EXPERIENCIA LABORAL, FORMACIÓN          */}
          {/* ----------------------------------------------------------------------- */}
          <main className="col-span-8 space-y-6">
            {/* PERFIL PROFESIONAL */}
            {summary && (
              <section className="space-y-2">
                <div className="border-b-2 pb-1" style={{ borderColor: accent }}>
                  <h2 className="text-[14.5px] font-black uppercase tracking-wider text-neutral-950">
                    Perfil Profesional
                  </h2>
                </div>
                <p className="text-[10.5px] text-neutral-700 leading-relaxed text-justify">
                  {summary}
                </p>
              </section>
            )}

            {/* EXPERIENCIA LABORAL & LITIGIOS */}
            {validExperiences.length > 0 && (
              <section className="space-y-3">
                <div className="border-b-2 pb-1" style={{ borderColor: accent }}>
                  <h2 className="text-[14.5px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 shrink-0" style={{ color: accent }} />
                    <span>Práctica Profesional & Experiencia</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[11.5px] text-neutral-950 uppercase">
                          {exp.position || 'Abogado / Consultor'}
                        </h3>
                        {(exp.startDate || exp.endDate) && (
                          <span className="text-[10px] font-bold text-neutral-500">
                            {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Presente' : exp.endDate}
                          </span>
                        )}
                      </div>

                      {exp.company && (
                        <p
                          className="text-[10.5px] font-semibold italic"
                          style={{ color: accent }}
                        >
                          {exp.company}
                        </p>
                      )}

                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="space-y-1 pt-1 text-[10.5px] text-neutral-700 leading-relaxed">
                          {exp.responsibilities
                            .filter((r) => r.trim())
                            .map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2">
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
              </section>
            )}

            {/* FORMACIÓN ACADÉMICA & POSGRADOS */}
            {validEducation.length > 0 && (
              <section className="space-y-3">
                <div className="border-b-2 pb-1" style={{ borderColor: accent }}>
                  <h2 className="text-[14.5px] font-black uppercase tracking-wider text-neutral-950 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 shrink-0" style={{ color: accent }} />
                    <span>Formación Académica & Posgrados</span>
                  </h2>
                </div>

                <div className="space-y-3">
                  {validEducation.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[11px] text-neutral-950">
                          {edu.degree || 'Licenciatura en Derecho'}
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
          </main>
        </div>
      </div>
    </div>
  );
};