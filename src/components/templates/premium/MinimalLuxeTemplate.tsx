'use client';

import React from 'react';
import { CVData } from '@/types/cv';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sparkles,
} from 'lucide-react';

interface Props {
  data: CVData;
}

export const MinimalLuxeTemplate: React.FC<Props> = ({ data }) => {
  const {
    contact,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
    fontFamily = 'Inter',
    colorScheme = '#b47b44',
  } = data;

  const accent =
    colorScheme === '#171717' || colorScheme === '#000000'
      ? '#b47b44'
      : colorScheme || '#b47b44';

  const rawName = (contact.fullName || 'DICKY PRAYUDAWANTO').trim();
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
  const validLanguages = languages.filter((l) => l.language?.trim());
  const validReferences = references.filter((r) => r.name?.trim());

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
      {/* COLUMNA IZQUIERDA (~35%) */}
      <aside className="w-[35%] bg-[#272a31] text-white flex flex-col justify-between shrink-0 relative">
        <div className="space-y-4">
          {/* Domo Arqueado Concéntrico en Bronce */}
          <div
            className="relative w-full pt-6 pb-4 flex justify-center bg-[#1f2228] rounded-b-[48px] border-b-4 shadow-lg overflow-hidden"
            style={{ borderColor: accent }}
          >
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border-8 opacity-40 pointer-events-none"
              style={{ borderColor: accent }}
            />

            <div
              className="relative z-10 w-32 h-32 rounded-full p-1 border-2 shadow-2xl bg-[#272a31]"
              style={{ borderColor: accent }}
            >
              {contact.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={contact.photoUrl}
                  alt={rawName}
                  className="w-full h-full rounded-full object-cover grayscale contrast-125"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#181a1f] flex flex-col items-center justify-center text-white">
                  <User className="w-10 h-10 mb-1 opacity-70" style={{ color: accent }} />
                  <span className="text-xs font-black tracking-widest">{initials}</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-5 space-y-4">
            {/* PROFILE */}
            {summary && (
              <section className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <User className="w-3 h-3" />
                  </div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                    Profile
                  </h2>
                </div>
                <div className="w-full h-px" style={{ backgroundColor: `${accent}80` }} />
                <p className="text-[8.5px] text-neutral-300 leading-relaxed text-justify line-clamp-4 pt-0.5">
                  {summary}
                </p>
              </section>
            )}

            {/* CONTACT */}
            <section className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0"
                  style={{ borderColor: accent, color: accent }}
                >
                  <Phone className="w-3 h-3" />
                </div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                  Contact
                </h2>
              </div>
              <div className="w-full h-px" style={{ backgroundColor: `${accent}80` }} />

              <div className="space-y-2 pt-1 text-[8.5px] text-neutral-200">
                {contact.phone && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-2.5 h-2.5" />
                    </div>
                    <span>{contact.phone}</span>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center shrink-0 shadow-xs">
                      <Mail className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[140px]">{contact.email}</span>
                  </div>
                )}

                {(contact.city || contact.country) && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center shrink-0 shadow-xs">
                      <MapPin className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[140px]">
                      {[contact.city, contact.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}

                {contact.links?.portfolio && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center shrink-0 shadow-xs">
                      <Globe className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate max-w-[140px]">{contact.links.portfolio}</span>
                  </div>
                )}
              </div>
            </section>

            {/* SKILLS */}
            {validSkills.length > 0 && (
              <section className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                    Skills
                  </h2>
                </div>
                <div className="w-full h-px" style={{ backgroundColor: `${accent}80` }} />

                <div className="space-y-2 pt-1">
                  {validSkills.slice(0, 5).map((skill) => (
                    <div key={skill.id} className="space-y-0.5">
                      <p className="text-[8.5px] font-medium text-neutral-200 truncate">
                        {skill.name}
                      </p>
                      <div className="w-full h-1.5 bg-white rounded-xs overflow-hidden">
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
        </div>

        <footer className="p-3 text-center text-[7.5px] text-neutral-400 uppercase tracking-widest border-t border-neutral-700/60">
          Minimal Luxe Signature
        </footer>
      </aside>

      {/* COLUMNA DERECHA (~65%) */}
      <main className="flex-1 p-7 py-6 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Nombre & Título */}
          <header className="space-y-1">
            <h1 className="text-3xl sm:text-4xl tracking-tight uppercase leading-none">
              <span className="font-bold block" style={{ color: accent }}>
                {firstName}
              </span>
              <span className="font-black text-neutral-950 block mt-0.5">
                {lastName}
              </span>
            </h1>
            {contact.professionalTitle && (
              <p className="text-[10.5px] font-bold uppercase tracking-[0.25em] text-neutral-700 pt-1">
                {contact.professionalTitle}
              </p>
            )}
          </header>

          {/* Barra Social Segmentada */}
          <div className="border border-neutral-300 grid grid-cols-3 divide-x divide-neutral-300 text-[8.5px] text-neutral-700 font-medium">
            <div className="py-1 px-2 flex items-center justify-center gap-1.5 truncate">
              <svg className="w-2.5 h-2.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.54a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
              </svg>
              <span className="truncate">
                {contact.links?.linkedin ? `in/${contact.links.linkedin}` : '@socialMedia'}
              </span>
            </div>
            <div className="py-1 px-2 flex items-center justify-center gap-1.5 truncate">
              <Globe className="w-2.5 h-2.5 shrink-0 text-neutral-800" />
              <span className="truncate">
                {contact.links?.portfolio || '@webPortfolio'}
              </span>
            </div>
            <div className="py-1 px-2 flex items-center justify-center gap-1.5 truncate">
              <Mail className="w-2.5 h-2.5 shrink-0 text-neutral-800" />
              <span className="truncate">
                {contact.email || '@mailDirect'}
              </span>
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          {validExperiences.length > 0 && (
            <section className="space-y-2">
              <h2
                className="text-[12px] font-bold uppercase tracking-[0.14em]"
                style={{ color: accent }}
              >
                Work Experience
              </h2>
              <div className="w-full h-px bg-neutral-200" />

              <div className="space-y-2.5 pt-0.5">
                {validExperiences.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-3 text-right pt-0.5">
                      <span className="text-[8.5px] font-bold text-neutral-600 font-mono">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.isCurrent) ? '–' : ''} {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>

                    <div className="col-span-1 flex flex-col items-center self-stretch relative">
                      <div
                        className="w-2 h-2 rounded-full z-10 shrink-0 mt-1 shadow-xs"
                        style={{ backgroundColor: accent }}
                      />
                      <div className="w-px h-full bg-neutral-300 absolute top-2 bottom-0" />
                    </div>

                    <div className="col-span-8 space-y-0.5 pb-1">
                      <h3 className="font-bold text-[10.5px] uppercase tracking-wide text-neutral-950">
                        {exp.position || 'Job Position'}
                      </h3>
                      {exp.company && (
                        <p className="text-[9px] font-semibold text-neutral-600 italic">
                          {exp.company}
                        </p>
                      )}
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <p className="text-[8.5px] text-neutral-600 leading-relaxed text-justify line-clamp-2 pt-0.5">
                          {exp.responsibilities.join(' ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {validEducation.length > 0 && (
            <section className="space-y-2">
              <h2
                className="text-[12px] font-bold uppercase tracking-[0.14em]"
                style={{ color: accent }}
              >
                Education
              </h2>
              <div className="w-full h-px bg-neutral-200" />

              <div className="space-y-2 pt-0.5">
                {validEducation.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-3 text-right pt-0.5">
                      <span className="text-[8.5px] font-bold text-neutral-600 font-mono">
                        {edu.startDate} {edu.startDate && (edu.endDate || edu.isCurrent) ? '–' : ''} {edu.isCurrent ? 'Actual' : edu.endDate}
                      </span>
                    </div>

                    <div className="col-span-1 flex flex-col items-center self-stretch relative">
                      <div
                        className="w-2 h-2 rounded-full z-10 shrink-0 mt-1 shadow-xs"
                        style={{ backgroundColor: accent }}
                      />
                      <div className="w-px h-full bg-neutral-300 absolute top-2 bottom-0" />
                    </div>

                    <div className="col-span-8 space-y-0.5 pb-1">
                      <h3 className="font-bold text-[10px] uppercase tracking-wide text-neutral-950">
                        {edu.degree || 'Masters Degree'}
                      </h3>
                      {edu.institution && (
                        <p className="text-[8.5px] text-neutral-600 italic">
                          {edu.institution}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REFERENCE */}
          {validReferences.length > 0 && (
            <section className="space-y-2">
              <h2
                className="text-[12px] font-bold uppercase tracking-[0.14em]"
                style={{ color: accent }}
              >
                Reference
              </h2>
              <div className="w-full h-px bg-neutral-200" />

              <div className="grid grid-cols-2 gap-4 pt-0.5 text-[8.5px] text-neutral-700">
                {validReferences.slice(0, 2).map((ref) => (
                  <div key={ref.id} className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <p className="font-bold text-neutral-950 text-[9.5px] uppercase">{ref.name}</p>
                    </div>
                    <p className="text-neutral-500 italic pl-3">
                      {ref.relationship} {ref.company ? `• ${ref.company}` : ''}
                    </p>
                    {ref.phone && <p className="text-neutral-600 pl-3">Phone : {ref.phone}</p>}
                    {ref.email && <p className="text-neutral-600 pl-3 break-all">Email : {ref.email}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Idiomas */}
        {validLanguages.length > 0 && (
          <footer className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[8px] text-neutral-600">
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
      </main>
    </div>
  );
};

export default MinimalLuxeTemplate;