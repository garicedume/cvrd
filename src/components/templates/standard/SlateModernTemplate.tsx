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

export const SlateModernTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#18181b',
  } = data;

  const accent = colorScheme || '#18181b';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact.fullName || 'Lorna Alvarado').trim();
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
        return 'rounded-none';
    }
  };

  // Filtrado de elementos válidos sin campos vacíos
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  // Porcentaje de barra para habilidades
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
      } text-[10.5px] leading-relaxed w-full min-h-264 flex selection:bg-neutral-200`}
    >
      {/* ========================================================================= */}
      {/* 1. COLUMNA IZQUIERDA (FOTO SUPERIOR + CONTACTO + EDU + SKILLS + IDIOMAS)   */}
      {/* ========================================================================= */}
      <aside className="w-[35%] bg-neutral-100/90 border-r border-neutral-200 p-6 flex flex-col justify-between shrink-0 space-y-6">
        <div className="space-y-6">
          {/* 1.1 FOTO SUPERIOR: Retrato Asimétrico con Fondo Geométrico */}
          <div className="relative mx-auto w-36 h-44 pt-1">
            <div
              className="absolute top-0 left-0 w-24 h-36 rounded-xs shadow-md"
              style={{ backgroundColor: accent }}
            />
            {contact.photoUrl ? (
              <div
                className={`relative w-28 h-36 ml-6 mt-4 overflow-hidden border-2 border-white shadow-xl bg-neutral-200 ${getPhotoRadius()}`}
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
                className={`relative w-28 h-36 ml-6 mt-4 overflow-hidden border-2 border-white shadow-xl bg-neutral-900 flex flex-col items-center justify-center text-white ${getPhotoRadius()}`}
              >
                <User className="w-8 h-8 mb-1 opacity-70" />
                <span className="text-xs font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* 1.2 CONTACTO: Ubicado debajo de la foto */}
          <div className="space-y-2 text-[10px] text-neutral-700 pt-1">
            {contact.phone && (
              <div className="flex items-center gap-2.5">
                <div
                  className="w-4 h-4 rounded-xs flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: accent }}
                >
                  <Phone className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">{contact.phone}</span>
              </div>
            )}

            {contact.email && (
              <div className="flex items-center gap-2.5">
                <div
                  className="w-4 h-4 rounded-xs flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: accent }}
                >
                  <Mail className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">{contact.email}</span>
              </div>
            )}

            {contact.links?.portfolio && (
              <div className="flex items-center gap-2.5">
                <div
                  className="w-4 h-4 rounded-xs flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: accent }}
                >
                  <Globe className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">{contact.links.portfolio}</span>
              </div>
            )}

            {(contact.city || contact.country) && (
              <div className="flex items-center gap-2.5">
                <div
                  className="w-4 h-4 rounded-xs flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: accent }}
                >
                  <MapPin className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">
                  {[contact.city, contact.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>

          {/* 1.3 EDUCACIÓN */}
          {validEducation.length > 0 && (
            <section className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-neutral-300 pb-1">
                <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-900">
                  Education
                </h2>
              </div>
              <div className="space-y-3">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <h3 className="font-bold text-[10.5px] text-neutral-900 leading-tight">
                      {edu.degree}
                    </h3>
                    {edu.institution && (
                      <p className="text-[10px] text-neutral-600 italic leading-tight">
                        {edu.institution}
                      </p>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[9px] text-neutral-500 font-medium">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 1.4 HABILIDADES */}
          {validSkills.length > 0 && (
            <section className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-neutral-300 pb-1">
                <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-900">
                  Skills
                </h2>
              </div>
              <div className="space-y-2 pt-0.5">
                {validSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-medium text-neutral-800 truncate">
                      {skill.name}
                    </span>
                    <div className="w-20 h-2 bg-neutral-300 rounded-xs overflow-hidden shrink-0">
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

        {/* 1.5 IDIOMAS */}
        {validLanguages.length > 0 && (
          <footer className="space-y-1.5 border-t border-neutral-300 pt-3">
            <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-900">
              Language
            </h2>
            <ul className="space-y-1 text-[10px] text-neutral-700 pl-1">
              {validLanguages.map((l) => (
                <li key={l.id} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-neutral-900 shrink-0" />
                  <span>
                    {l.language}{' '}
                    {l.proficiency && (
                      <span className="text-neutral-500 text-[9px]">
                        ({l.proficiency})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (NOMBRE, ABOUT, EXPERIENCIA, REFERENCIAS)              */}
      {/* ========================================================================= */}
      <main className="flex-1 p-8 space-y-5 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Header Nombre & Título */}
          <header className="space-y-1">
            <h1 className="text-3xl sm:text-4xl tracking-tight text-neutral-900 leading-none">
              <span className="font-black">{firstName}</span>{' '}
              <span className="font-light text-neutral-600">{lastName}</span>
            </h1>
            {contact.professionalTitle && (
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] pt-0.5"
                style={{ color: accent }}
              >
                {contact.professionalTitle}
              </p>
            )}
          </header>

          {/* About Me */}
          {summary && (
            <section className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-[14px] font-black uppercase tracking-widest text-neutral-950 shrink-0">
                  About Me
                </h2>
                <div className="flex-1 h-px bg-neutral-300" />
              </div>
              <p className="text-[10.5px] text-neutral-700 leading-relaxed text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {validExperiences.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-[14px] font-black uppercase tracking-widest text-neutral-950 shrink-0">
                  Experience
                </h2>
                <div className="flex-1 h-px bg-neutral-300" />
              </div>

              <div className="relative border-l border-neutral-300 ml-2 pl-5 space-y-4 pt-1">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="relative space-y-1">
                    <div
                      className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 shadow-xs"
                      style={{ borderColor: accent }}
                    />

                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11px] text-neutral-950">
                        {exp.position || 'Product Design Manager'}
                      </h3>
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-[9.5px] font-semibold text-neutral-500 italic">
                          {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Actual' : exp.endDate}
                        </span>
                      )}
                    </div>

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
        </div>

        {/* References */}
        {validReferences.length > 0 && (
          <footer className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3">
              <h2 className="text-[14px] font-black uppercase tracking-widest text-neutral-950 shrink-0">
                References
              </h2>
              <div className="flex-1 h-px bg-neutral-300" />
            </div>

            <div className="grid grid-cols-2 gap-6 text-[10px]">
              {validReferences.slice(0, 2).map((ref) => (
                <div key={ref.id} className="space-y-0.5">
                  <p className="font-bold text-[11px] text-neutral-900">{ref.name}</p>
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
      </main>
    </div>
  );
};