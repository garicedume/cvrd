'use client';

import React, { createContext, useContext, useState } from 'react';
import { 
  CVData, Experience, Education, Skill, Language, 
  Certification, Project, Reference 
} from '../types/cv';
import { SAMPLE_CV_DATA } from '../lib/templateRegistry';

interface CVContextType {
  cvData: CVData;
  activeTemplateId: string;
  setActiveTemplateId: (id: string) => void;
  updateCVData: (newData: Partial<CVData>) => void;
  updateContact: (contact: Partial<CVData['contact']>) => void;
  
  handlePhotoUpload: (file: File) => { success: boolean; error?: string };
  removePhoto: () => void;

  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  addSkill: (category: 'technical' | 'soft') => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, lang: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addReference: () => void;
  updateReference: (id: string, ref: Partial<Reference>) => void;
  removeReference: (id: string) => void;
}

const DEFAULT_BUILDER_DATA: CVData = {
  ...SAMPLE_CV_DATA,
  certifications: [],
  courses: [],
  projects: [],
  additionalInfo: { driverLicense: false, ownVehicle: false, travelAvailability: false },
  fontSizeScale: 1.0,
  showPhoto: true,
  marginInches: 0.6,
  hiddenSections: [],
};

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCvData] = useState<CVData>(DEFAULT_BUILDER_DATA);
  const [activeTemplateId, setActiveTemplateId] = useState<string>('AcademicResearchTemplate');

  const updateCVData = (newData: Partial<CVData>) => {
    setCvData((prev) => ({ ...prev, ...newData }));
  };

  const updateContact = (contact: Partial<CVData['contact']>) => {
    setCvData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contact },
    }));
  };

  const handlePhotoUpload = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      return { success: false, error: 'Formato no permitido. Utiliza exclusivamente JPG o PNG.' };
    }
    if (file.size > 2 * 1024 * 1024) {
      return { success: false, error: 'La imagen supera el límite de 2MB.' };
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const photoUrl = e.target?.result as string;
      setCvData((prev) => ({
        ...prev,
        showPhoto: true,
        contact: { ...prev.contact, photoUrl },
      }));
    };
    reader.readAsDataURL(file);
    return { success: true };
  };

  const removePhoto = () => {
    setCvData((prev) => ({
      ...prev,
      showPhoto: false,
      contact: { ...prev.contact, photoUrl: undefined },
    }));
  };

  // Experiencia
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      cityCountry: 'Santo Domingo, RD',
      startDate: '',
      endDate: 'Presente',
      isCurrent: true,
      responsibilities: [''],
      achievements: '',
    };
    setCvData((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) => (item.id === id ? { ...item, ...exp } : item)),
    }));
  };

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  // Educación
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      cityCountry: 'Santo Domingo, RD',
      startDate: '',
      endDate: '',
      isCurrent: false,
    };
    setCvData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...edu } : item)),
    }));
  };

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // Habilidades
  const addSkill = (category: 'technical' | 'soft') => {
    const newSkill: Skill = { id: `sk-${Date.now()}`, name: '', level: 'Avanzado', category };
    setCvData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, ...skill } : item)),
    }));
  };

  const removeSkill = (id: string) => {
    setCvData((prev) => ({ ...prev, skills: prev.skills.filter((item) => item.id !== id) }));
  };

  // Idiomas
  const addLanguage = () => {
    const newLang: Language = { id: `lang-${Date.now()}`, language: '', proficiency: 'Intermedio' };
    setCvData((prev) => ({ ...prev, languages: [...prev.languages, newLang] }));
  };

  const updateLanguage = (id: string, lang: Partial<Language>) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((item) => (item.id === id ? { ...item, ...lang } : item)),
    }));
  };

  const removeLanguage = (id: string) => {
    setCvData((prev) => ({ ...prev, languages: prev.languages.filter((item) => item.id !== id) }));
  };

  // Certificaciones
  const addCertification = () => {
    const newCert: Certification = { id: `cert-${Date.now()}`, title: '', institution: '', date: '' };
    setCvData((prev) => ({ ...prev, certifications: [...(prev.certifications || []), newCert] }));
  };

  const updateCertification = (id: string, cert: Partial<Certification>) => {
    setCvData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).map((item) => (item.id === id ? { ...item, ...cert } : item)),
    }));
  };

  const removeCertification = (id: string) => {
    setCvData((prev) => ({ ...prev, certifications: (prev.certifications || []).filter((item) => item.id !== id) }));
  };

  // Proyectos
  const addProject = () => {
    const newProj: Project = { id: `proj-${Date.now()}`, name: '', description: '', tools: '' };
    setCvData((prev) => ({ ...prev, projects: [...(prev.projects || []), newProj] }));
  };

  const updateProject = (id: string, proj: Partial<Project>) => {
    setCvData((prev) => ({
      ...prev,
      projects: (prev.projects || []).map((item) => (item.id === id ? { ...item, ...proj } : item)),
    }));
  };

  const removeProject = (id: string) => {
    setCvData((prev) => ({ ...prev, projects: (prev.projects || []).filter((item) => item.id !== id) }));
  };

  // Referencias
  const addReference = () => {
    const newRef: Reference = { id: `ref-${Date.now()}`, name: '', position: '', relationship: 'Laboral', company: '', phone: '', email: '' };
    setCvData((prev) => ({ ...prev, references: [...prev.references, newRef] }));
  };

  const updateReference = (id: string, ref: Partial<Reference>) => {
    setCvData((prev) => ({
      ...prev,
      references: prev.references.map((item) => (item.id === id ? { ...item, ...ref } : item)),
    }));
  };

  const removeReference = (id: string) => {
    setCvData((prev) => ({ ...prev, references: prev.references.filter((item) => item.id !== id) }));
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        activeTemplateId,
        setActiveTemplateId,
        updateCVData,
        updateContact,
        handlePhotoUpload,
        removePhoto,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addCertification,
        updateCertification,
        removeCertification,
        addProject,
        updateProject,
        removeProject,
        addReference,
        updateReference,
        removeReference,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useCV debe ser utilizado dentro de un CVProvider');
  return context;
};