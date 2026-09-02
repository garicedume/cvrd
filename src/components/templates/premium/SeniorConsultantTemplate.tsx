'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Phone,
  Globe,
  MapPin,
  Mail,
  User,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const SeniorConsultantTemplate: React.FC<Props> = ({ data }) => {
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

  // Color de acento dinámico (Amarillo Oro / Ámbar por defecto)
  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#f59e0b'
      : colorScheme || '#f59e0b';

  // Separación del nombre
  const rawName = (contact.fullName || 'RAYMOND. JOSE').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  // Iniciales de respaldo sin foto
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  // Filtrado de elementos válidos[cite: 6]
  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  // Porcentaje numérico para barras de habilidades[cite: 6]
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
      {/* 1. COLUMNA IZQUIERDA (~34% - FOTO + PÍLDORAS CONTACT & REFERENCE)          */}
      {/* ========================================================================= */}
      <aside className="w-[34%] bg-[#15181e] text-white flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          {/* Foto Superior */}
          <div className="w-full h-60 bg-[#0e1015] overflow-hidden relative">
            {contact.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={contact.photoUrl}
                alt={rawName}
                className="w-full h-full object-cover grayscale contrast-125 object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white bg-[#0e1015]">
                <User className="w-14 h-14 mb-2 opacity-60" style={{ color: accent }} />
                <span className="text-sm font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* Barra divisoria amarilla debajo de la foto */}
          <div className="px-6">
            <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          </div>

          <div className="px-6 space-y-5">
            {/* PÍLDORA CONTACT */}
            <section className="space-y-3">
              <div
                className="w-full py-1.5 text-center font-black uppercase tracking-[0.2em] text-white text-[11px] rounded-full border-2"
                style={{ borderColor: accent }}
              >
                Contact
              </div>

              <div className="space-y-2.5 text-[9.5px] text-neutral-300">
                {contact.phone && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-4 rounded-r-full flex items-center justify-center text-neutral-950 shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      <Phone className="w-2.5 h-2.5" />
                    </div>
                    <span>{contact.phone}</span>
                  </div>
                )}

                {contact.links?.portfolio && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-4 rounded-r-full flex items-center justify-center text-neutral-950 shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      <Globe className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[150px]">{contact.links.portfolio}</span>
                  </div>
                )}

                {(contact.city || contact.country) && (
                  <div className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-4 rounded-r-full flex items-center justify-center text-neutral-950 shrink-0 mt-0.5"
                      style={{ backgroundColor: accent }}
                    >
                      <MapPin className="w-2.5 h-2.5" />
                    </div>
                    <span className="leading-tight">
                      {[contact.city, contact.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-4 rounded-r-full flex items-center justify-center text-neutral-950 shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      <Mail className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[150px]">{contact.email}</span>
                  </div>
                )}
              </div>
            </section>

            {/* PÍLDORA REFERENCE */}
            <section className="space-y-3">
              <div
                className="w-full py-1.5 text-center font-black uppercase tracking-[0.2em] text-white text-[11px] rounded-full border-2"
                style={{ borderColor: accent }}
              >
                Reference
              </div>

              <div className="space-y-3 text-[9px] text-neutral-300">
                {validReferences.length > 0 ? (
                  validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-2 rounded-r-full" style={{ backgroundColor: accent }} />
                        <p className="font-black text-white text-[10px] uppercase tracking-wide">
                          {ref.name}
                        </p>
                      </div>
                      <p className="text-neutral-400 pl-5 italic">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="text-neutral-300 pl-5">Tel: {ref.phone}</p>}
                      {ref.email && <p className="text-neutral-400 pl-5 truncate">{ref.email}</p>}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-2 rounded-r-full" style={{ backgroundColor: accent }} />
                        <p className="font-black text-white text-[10px] uppercase tracking-wide">
                          Alexander. RJ
                        </p>
                      </div>
                      <p className="text-neutral-400 pl-5">Creative Director • Agency Studio</p>
                      <p className="text-neutral-300 pl-5">Tel: +1-000-555-5553</p>
                    </div>
                    <div className="space-y-0.5 pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-2 rounded-r-full" style={{ backgroundColor: accent }} />
                        <p className="font-black text-white text-[10px] uppercase tracking-wide">
                          Christopher
                        </p>
                      </div>
                      <p className="text-neutral-400 pl-5">General Manager • Media Corp</p>
                      <p className="text-neutral-300 pl-5">Tel: +1-970-533-3383</p>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Pie lateral */}
        <footer className="p-3 text-center text-[8.5px] text-neutral-500 uppercase tracking-widest">
          Senior Consultant Prestige
        </footer>
      </aside>

      {/* ========================================================================= */}
      {/* 2. COLUMNA DERECHA (~66% - CABECERA CON PESTAÑA + SECCIONES EN BANNER)    */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col justify-between">
        {/* Cabecera Negra con Pestaña Amarilla a la Derecha */}
        <header className="relative bg-[#15181e] text-white p-7 py-6 pr-12 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-[0.14em] leading-none">
            {firstName} {lastName}
          </h1>
          {contact.professionalTitle && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-300 pt-1.5">
              {contact.professionalTitle}
            </p>
          )}

          {/* Pestaña de Acento Flotante a la Derecha */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-12 shadow-md"
            style={{ backgroundColor: accent }}
          />
        </header>

        {/* Cuerpo Principal */}
        <div className="p-7 py-6 space-y-5 flex-1 flex flex-col justify-between">
          <div className="space-y-5">
            {/* JOB EXPERIANCE */}
            {validExperiences.length > 0 && (
              <section className="space-y-2.5">
                {/* Banner de Sección */}
                <div>
                  <div className="bg-[#15181e] px-4 py-1 inline-block">
                    <h2
                      className="text-[11.5px] font-black uppercase tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      Job Experiance
                    </h2>
                  </div>
                  <div className="w-full h-0.5" style={{ backgroundColor: accent }} />
                </div>

                <div className="space-y-3.5 pt-1">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[11px] uppercase tracking-wide text-neutral-950">
                          {exp.position || 'Senior Web Designer'}
                        </h3>
                        {(exp.startDate || exp.endDate) && (
                          <span className="text-[9px] font-bold text-neutral-600 font-mono">
                            {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        )}
                      </div>

                      {exp.company && (
                        <p className="text-[9.5px] font-semibold text-neutral-600 italic">
                          {exp.company}
                        </p>
                      )}

                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <p className="text-[9.5px] text-neutral-600 leading-relaxed text-justify pt-0.5 line-clamp-3">
                          {exp.responsibilities.join(' ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ABOUT ME[cite: 6] */}
            {summary && (
              <section className="space-y-2">
                <div>
                  <div className="bg-[#15181e] px-4 py-1 inline-block">
                    <h2
                      className="text-[11.5px] font-black uppercase tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      About Me
                    </h2>
                  </div>
                  <div className="w-full h-0.5" style={{ backgroundColor: accent }} />
                </div>
                <p className="text-[9.5px] text-neutral-700 leading-relaxed text-justify pt-0.5">
                  {summary}
                </p>
              </section>
            )}

            {/* EDUCATION (Si existe)[cite: 6] */}
            {validEducation.length > 0 && (
              <section className="space-y-2">
                <div>
                  <div className="bg-[#15181e] px-4 py-1 inline-block">
                    <h2
                      className="text-[11.5px] font-black uppercase tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      Education
                    </h2>
                  </div>
                  <div className="w-full h-0.5" style={{ backgroundColor: accent }} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-0.5">
                  {validEducation.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-[10px] uppercase tracking-wide text-neutral-950">
                          {edu.degree || 'Bachelor Degree'}
                        </h3>
                      </div>
                      {edu.institution && (
                        <p className="text-[9px] text-neutral-500 italic">
                          {edu.institution}
                        </p>
                      )}
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[8.5px] text-neutral-400 font-mono">
                          {edu.startDate} – {edu.isCurrent ? 'Actual' : edu.endDate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* SKILLS[cite: 6] */}
          {validSkills.length > 0 && (
            <section className="space-y-2.5 pt-1">
              <div>
                <div className="bg-[#15181e] px-4 py-1 inline-block">
                  <h2
                    className="text-[11.5px] font-black uppercase tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    Skills
                  </h2>
                </div>
                <div className="w-full h-0.5" style={{ backgroundColor: accent }} />
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-1">
                {validSkills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                      <span className="text-[10px] font-bold text-neutral-800">
                        {skill.name}
                      </span>
                    </div>
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

          {/* IDIOMAS (En la base) */}
          {validLanguages.length > 0 && (
            <footer className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[9px] text-neutral-600">
              <span className="font-bold uppercase tracking-wider text-neutral-900">Languages:</span>
              <div className="flex gap-4">
                {validLanguages.map((l) => (
                  <span key={l.id}>
                    <strong>{l.language}</strong> ({l.proficiency})
                  </span>
                ))}
              </div>
            </footer>
          )}
        </div>
      </main>
    </div>
  );
};

export default SeniorConsultantTemplate;