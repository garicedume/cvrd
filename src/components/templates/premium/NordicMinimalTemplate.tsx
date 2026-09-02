'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  User,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const NordicMinimalTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#b91c1c',
  } = data;

  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#b91c1c'
      : colorScheme || '#b91c1c';

  const rawName = (contact.fullName || 'Oliver Reynolds').trim();
  const nameParts = rawName.split(' ');
  const splitIndex = nameParts.length > 1 ? Math.ceil(nameParts.length / 2) : 1;
  const firstName = nameParts.slice(0, splitIndex).join(' ');
  const lastName = nameParts.slice(splitIndex).join(' ');

  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : rawName.slice(0, 2).toUpperCase();

  const validExperiences = experiences.filter(
    (exp) => exp.position?.trim() || exp.company?.trim()
  );
  const validEducation = education.filter(
    (edu) => edu.degree?.trim() || edu.institution?.trim()
  );
  const validSkills = skills.filter((s) => s.name?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

  const getSkillDots = (level?: string) => {
    switch (level) {
      case 'Experto':
        return 7;
      case 'Avanzado':
        return 6;
      case 'Intermedio':
        return 5;
      case 'Básico':
        return 3;
      default:
        return 5;
    }
  };

  return (
    <div
      className={`relative bg-white text-neutral-900 font-${
        fontFamily || 'Inter'
      } text-[10px] leading-relaxed w-full min-h-264 flex selection:bg-neutral-200 overflow-hidden`}
    >
      {/* COLUMNA IZQUIERDA (~34%) */}
      <aside className="w-[34%] bg-[#181b22] text-white flex flex-col justify-between shrink-0 relative">
        <div className="space-y-4">
          {/* Retrato con Listones Diagonales Top-Left */}
          <div className="relative w-full h-56 bg-[#14171d] overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute -top-8 -left-8 w-24 h-24 pointer-events-none z-20 overflow-hidden">
              <div
                className="w-36 h-3.5 mt-6 -ml-6 transform -rotate-45"
                style={{ backgroundColor: accent }}
              />
              <div
                className="w-36 h-1.5 mt-1.5 -ml-6 transform -rotate-45"
                style={{ backgroundColor: accent }}
              />
            </div>

            {contact.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={contact.photoUrl}
                alt={rawName}
                className="w-full h-full object-cover grayscale contrast-125 object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white bg-[#14171d]">
                <User className="w-12 h-12 mb-1 opacity-70" style={{ color: accent }} />
                <span className="text-xs font-black tracking-widest">{initials}</span>
              </div>
            )}
          </div>

          {/* Secciones con Banners Sólidos */}
          <div className="space-y-4">
            {/* CONTACT */}
            <section className="space-y-2.5">
              <div
                className="w-full py-1 text-center font-black uppercase tracking-[0.2em] text-white text-[10.5px] shadow-sm"
                style={{ backgroundColor: accent }}
              >
                Contact
              </div>

              <div className="px-5 space-y-2 text-[9px] text-neutral-300">
                {contact.phone && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
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
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: accent }}
                    >
                      <Mail className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[140px]">{contact.email}</span>
                  </div>
                )}

                {(contact.city || contact.country) && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: accent }}
                    >
                      <MapPin className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[140px]">
                      {[contact.city, contact.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}

                {contact.links?.portfolio && (
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: accent }}
                    >
                      <Globe className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[140px]">{contact.links.portfolio}</span>
                  </div>
                )}
              </div>
            </section>

            {/* EDUCATION */}
            {validEducation.length > 0 && (
              <section className="space-y-2.5">
                <div
                  className="w-full py-1 text-center font-black uppercase tracking-[0.2em] text-white text-[10.5px] shadow-sm"
                  style={{ backgroundColor: accent }}
                >
                  Education
                </div>

                <div className="px-5 space-y-2.5 text-center">
                  {validEducation.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <h3 className="font-bold text-white text-[9.5px] uppercase">
                        {edu.degree || 'Bachelor of Arts'}
                      </h3>
                      {edu.institution && (
                        <p className="text-neutral-400 italic text-[8.5px]">
                          {edu.institution}
                        </p>
                      )}
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[8px] text-neutral-400 font-mono">
                          [{edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}]
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SKILL CON MEDIDOR DE PUNTOS */}
            {validSkills.length > 0 && (
              <section className="space-y-2">
                <div
                  className="w-full py-1 text-center font-black uppercase tracking-[0.2em] text-white text-[10.5px] shadow-sm"
                  style={{ backgroundColor: accent }}
                >
                  Skill
                </div>

                <div className="px-5 space-y-1.5 pt-0.5">
                  {validSkills.slice(0, 6).map((skill) => {
                    const filledDots = getSkillDots(skill.level);
                    return (
                      <div key={skill.id} className="flex items-center justify-between gap-2">
                        <span className="text-[8.5px] font-medium text-neutral-200 truncate flex-1">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: i < filledDots ? accent : '#374151',
                              }}
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
        </div>

        <footer className="p-3 text-center text-[7.5px] text-neutral-500 uppercase tracking-widest border-t border-neutral-800">
          Nordic Minimal Edition
        </footer>
      </aside>

      {/* COLUMNA DERECHA (~66%) */}
      <main className="flex-1 flex flex-col justify-between bg-white relative">
        {/* Header Oscuro */}
        <header className="bg-[#181b22] text-white p-6 py-5 space-y-2.5 shrink-0 border-l border-neutral-800">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl tracking-tight uppercase leading-none">
              <span className="font-bold text-white">{firstName}</span>{' '}
              <span className="font-black" style={{ color: accent }}>
                {lastName}
              </span>
            </h1>

            {contact.professionalTitle && (
              <div className="pt-0.5">
                <div
                  className="border px-3.5 py-0.5 inline-block text-[9.5px] font-bold uppercase tracking-[0.2em]"
                  style={{ borderColor: accent, color: 'white' }}
                >
                  {contact.professionalTitle}
                </div>
              </div>
            )}
          </div>

          {summary && (
            <div className="space-y-0.5 pt-1 border-t border-neutral-700/60">
              <h2 className="text-[10px] font-black uppercase tracking-wider text-white">
                About Me
              </h2>
              <p className="text-[8.5px] text-neutral-300 leading-relaxed text-justify line-clamp-3">
                {summary}
              </p>
            </div>
          )}
        </header>

        {/* Cuerpo Blanco */}
        <div className="p-6 py-5 space-y-4 flex-1 flex flex-col justify-between relative">
          <div className="space-y-4">
            {/* EXPERIENCE ENMARCADO */}
            {validExperiences.length > 0 && (
              <section className="space-y-2.5">
                <div className="flex justify-center">
                  <div
                    className="border-2 px-7 py-0.5 text-center font-black uppercase tracking-[0.2em] text-neutral-950 text-[10.5px]"
                    style={{ borderColor: accent }}
                  >
                    Experience
                  </div>
                </div>

                <div className="space-y-3 pt-0.5">
                  {validExperiences.map((exp) => (
                    <div key={exp.id} className="space-y-0.5">
                      <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-neutral-950">
                        {exp.position || 'Creative Director'}
                      </h3>
                      <p className="text-[9px] font-semibold text-neutral-600 italic">
                        {exp.company}{' '}
                        {(exp.startDate || exp.endDate) && (
                          <span className="font-normal font-mono text-neutral-500 not-italic">
                            ({exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate})
                          </span>
                        )}
                      </p>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <p className="text-[9px] text-neutral-600 leading-relaxed text-justify pt-0.5 line-clamp-2">
                          {exp.responsibilities.join(' ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* REFERENCE ENMARCADO */}
            {validReferences.length > 0 && (
              <section className="space-y-2 pt-0.5">
                <div className="flex justify-center">
                  <div
                    className="border-2 px-7 py-0.5 text-center font-black uppercase tracking-[0.2em] text-neutral-950 text-[10.5px]"
                    style={{ borderColor: accent }}
                  >
                    Reference
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-0.5 text-[8.5px] text-neutral-700">
                  {validReferences.slice(0, 2).map((ref) => (
                    <div key={ref.id} className="space-y-0.5">
                      <p className="font-bold text-neutral-950 text-[9.5px] uppercase">
                        {ref.name}
                      </p>
                      <p className="text-neutral-500 font-medium italic">
                        {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                      </p>
                      {ref.phone && <p className="text-neutral-600">P : {ref.phone}</p>}
                      {ref.email && <p className="text-neutral-600 break-all">E : {ref.email}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Listones Diagonales Bottom-Right */}
          <div className="absolute -bottom-8 -right-8 w-24 h-24 pointer-events-none z-20 overflow-hidden">
            <div
              className="w-36 h-1.5 mt-6 -ml-6 transform -rotate-45"
              style={{ backgroundColor: accent }}
            />
            <div
              className="w-36 h-3.5 mt-1.5 -ml-6 transform -rotate-45"
              style={{ backgroundColor: accent }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NordicMinimalTemplate;