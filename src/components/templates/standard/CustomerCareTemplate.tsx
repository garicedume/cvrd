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

export const CustomerCareTemplate: React.FC<Props> = ({ data }) => {
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

  // Color de acento dinámico (Amarillo ámbar por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#f59e0b'
      : colorScheme || '#f59e0b';

  // Separación del nombre: Primer nombre en BOLD y Apellidos en LIGHT
  const rawName = (contact.fullName || 'Laura Parker').trim();
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
      case 'square':
        return 'rounded-none';
      case 'rounded-rect':
        return 'rounded-2xl';
      default:
        return 'rounded-full';
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

  // Porcentaje numérico para habilidades
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
      {/* 1. COLUMNA IZQUIERDA (~35% - BLOQUE OSCURO CURVO + BLOQUE AMARILLO REF)   */}
      {/* ========================================================================= */}
      <aside className="w-[35%] flex flex-col justify-between shrink-0 bg-neutral-100">
        {/* Bloque superior oscuro con terminación inferior en arco curvo */}
        <div className="bg-[#181e28] text-white p-6 pb-8 rounded-b-[44px] space-y-6 shadow-md">
          {/* Avatar Circular con Borde de Acento Grueso */}
          <div className="flex justify-center pt-2">
            {contact.photoUrl ? (
              <div
                className="w-32 h-32 p-1 rounded-full border-4 shadow-xl"
                style={{ borderColor: accent }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-neutral-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={contact.photoUrl}
                    alt={rawName}
                    className={`w-full h-full object-cover grayscale contrast-125 ${getPhotoRadius()}`}
                  />
                </div>
              </div>
            ) : (
              <div
                className="w-32 h-32 rounded-full border-4 bg-neutral-900 flex flex-col items-center justify-center text-white shadow-xl"
                style={{ borderColor: accent }}
              >
                <User className="w-10 h-10 mb-1 opacity-70" style={{ color: accent }} />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* EDUCATION */}
          {validEducation.length > 0 && (
            <section className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: accent }} />
                <h2 className="text-[13px] font-black uppercase tracking-wider text-white">
                  Education
                </h2>
              </div>

              <div className="space-y-3 pl-3 border-l border-neutral-700">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="space-y-0.5 text-[10px]">
                    <h3 className="font-bold uppercase tracking-wide text-white leading-tight">
                      {edu.degree || 'Enter Your Major'}
                    </h3>
                    {edu.institution && (
                      <p className="text-neutral-400 italic leading-tight">
                        {edu.institution}
                      </p>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[9px] text-neutral-500">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CONTACT */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: accent }} />
              <h2 className="text-[13px] font-black uppercase tracking-wider text-white">
                Contact
              </h2>
            </div>

            <div className="space-y-2 text-[10px] text-neutral-300 pl-3 border-l border-neutral-700">
              {(contact.city || contact.country) && (
                <div className="space-y-0.5">
                  <p className="font-bold text-white">Address</p>
                  <p className="text-neutral-400">
                    {[contact.city, contact.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}
              {contact.phone && (
                <div className="space-y-0.5">
                  <p className="font-bold text-white">Phone</p>
                  <p className="text-neutral-400">{contact.phone}</p>
                </div>
              )}
              {contact.email && (
                <div className="space-y-0.5">
                  <p className="font-bold text-white">Email</p>
                  <p className="text-neutral-400 break-all">{contact.email}</p>
                </div>
              )}
              {contact.links?.portfolio && (
                <div className="space-y-0.5">
                  <p className="font-bold text-white">Website</p>
                  <p className="text-neutral-400 truncate">{contact.links.portfolio}</p>
                </div>
              )}
            </div>
          </section>

          {/* LANGUAGES (Si existen) */}
          {validLanguages.length > 0 && (
            <section className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: accent }} />
                <h2 className="text-[13px] font-black uppercase tracking-wider text-white">
                  Languages
                </h2>
              </div>
              <div className="space-y-1 text-[10px] text-neutral-300 pl-3 border-l border-neutral-700">
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

        {/* Bloque inferior de Referencias en fondo Amarillo/Acento */}
        <div
          className="p-6 pt-5 space-y-2.5 flex-1 flex flex-col justify-center"
          style={{ backgroundColor: accent }}
        >
          <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950 border-b border-neutral-950/30 pb-1">
            Reference
          </h2>
          <div className="space-y-3 text-[9.5px] text-neutral-900">
            {validReferences.slice(0, 2).map((ref) => (
              <div key={ref.id} className="space-y-0.5">
                <p className="font-black text-neutral-950 text-[10.5px] uppercase">
                  {ref.name}
                </p>
                <p className="text-neutral-800 font-medium">
                  {ref.relationship} {ref.company ? `| ${ref.company}` : ''}
                </p>
                {ref.phone && <p className="text-neutral-900 font-bold">T: {ref.phone}</p>}
                {ref.email && <p className="text-neutral-800 break-all">{ref.email}</p>}
              </div>
            ))}
            {validReferences.length === 0 && (
              <p className="italic text-neutral-800 text-[9px]">
                Referencias disponibles a solicitud.
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~65% - HEADER OSCURO + ABOUT + WORK + SKILLS)          */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col justify-between">
        {/* Cabecera Oscura Superior */}
        <header className="bg-[#181e28] text-white p-8 py-7 space-y-1 shadow-sm">
          <h1
            className="text-3xl sm:text-4xl tracking-tight uppercase leading-none"
            style={{ color: accent }}
          >
            <span className="font-black">{firstName}</span>{' '}
            <span className="font-light text-white">{lastName}</span>
          </h1>
          {contact.professionalTitle && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-300 pt-1">
              {contact.professionalTitle}
            </p>
          )}
        </header>

        {/* Contenido Principal con Banners */}
        <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            {/* ABOUT ME */}
            {summary && (
              <section className="space-y-2">
                <div className="bg-neutral-100 py-1.5 px-3 rounded-xs flex items-center gap-2 border-l-4" style={{ borderColor: accent }}>
                  <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                    About Me
                  </h2>
                </div>
                <p className="text-[10.5px] text-neutral-700 leading-relaxed text-justify px-1">
                  {summary}
                </p>
              </section>
            )}

            {/* WORK EXPERIENCE */}
            {validExperiences.length > 0 && (
              <section className="space-y-3">
                <div className="bg-neutral-100 py-1.5 px-3 rounded-xs flex items-center gap-2 border-l-4" style={{ borderColor: accent }}>
                  <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                    Work Experience
                  </h2>
                </div>

                <div className="space-y-4 px-1">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-12 gap-3 items-start">
                      {/* Fechas a la izquierda */}
                      <div className="col-span-3 pt-0.5">
                        {(exp.startDate || exp.endDate) && (
                          <p className="text-[9.5px] font-bold text-neutral-500">
                            {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                          </p>
                        )}
                      </div>

                      {/* Cargo, Empresa y Viñetas a la derecha */}
                      <div className="col-span-9 space-y-1 border-l border-neutral-200 pl-3">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                          {exp.position || 'Job Position Here'}
                        </h3>
                        {exp.company && (
                          <p className="text-[10px] font-semibold text-neutral-600 italic">
                            {exp.company}
                          </p>
                        )}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <ul className="space-y-1 pt-1 text-[10.5px] text-neutral-600 leading-relaxed">
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

          {/* SOFTWARE SKILL */}
          {validSkills.length > 0 && (
            <section className="space-y-2.5 pt-2">
              <div className="bg-neutral-100 py-1.5 px-3 rounded-xs flex items-center gap-2 border-l-4" style={{ borderColor: accent }}>
                <h2 className="text-[13px] font-black uppercase tracking-wider text-neutral-950">
                  Software Skill
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 px-1 pt-1">
                {validSkills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <p className="text-[10px] font-semibold text-neutral-800 truncate">
                      {skill.name}
                    </p>
                    <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
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
      </main>
    </div>
  );
};