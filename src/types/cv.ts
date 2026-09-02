export type FontFamilyType = 
  | 'DM Sans' | 'Manrope' | 'Roboto' | 'Inter' | 'Lato' | 'Open Sans' | 'Source Sans 3'
  | 'Poppins' | 'Montserrat' | 'IBM Plex Sans';

export type LanguageLevel = 'Básico' | 'Intermedio' | 'Avanzado' | 'Profesional' | 'Nativo';

export interface ContactInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  photoUrl?: string;
  photoShape?: 'circle' | 'square' | 'rounded';
  links?: {
    linkedin?: string;
    portfolio?: string;
    behance?: string;
    github?: string;
    website?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  cityCountry?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  responsibilities: string[] | string;
  achievements?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  cityCountry?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  category?: 'technical' | 'soft';
}

export interface Language {
  id: string;
  language: string;
  proficiency: LanguageLevel | string;
}

export interface Certification {
  id: string;
  title: string;
  institution: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  year: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tools: string;
  link?: string;
}

export interface Reference {
  id: string;
  name: string;
  position?: string;
  relationship?: string;
  company: string;
  phone: string;
  email: string;
}

export interface AdditionalInfo {
  driverLicense?: boolean;
  ownVehicle?: boolean;
  travelAvailability?: boolean;
  remoteWork?: boolean;
  availability?: string;
  nationality?: string;
}

export interface CVData {
  templateId?: string;
  contact: ContactInfo;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  softSkills?: string[];
  languages: Language[];
  certifications?: Certification[];
  courses?: Course[];
  projects?: Project[];
  references: Reference[];
  additionalInfo?: AdditionalInfo;
  
  // Visuales
  fontFamily: FontFamilyType;
  colorScheme: string;
  fontSizeScale: number;
  showPhoto: boolean;
  marginInches: number;
  hiddenSections?: string[];
}