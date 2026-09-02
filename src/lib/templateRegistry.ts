import React from 'react';
import { CVData } from '../types/cv';

import { AcademicResearchTemplate } from '../components/templates/standard/AcademicResearchTemplate';
import { ATSDirectClassicTemplate } from '../components/templates/standard/ATSDirectClassicTemplate';
import { ATSMinimalTemplate } from '../components/templates/standard/ATSMinimalTemplate';
import { CharcoalCompactTemplate } from '../components/templates/standard/CharcoalCompactTemplate';
import { CommercialSalesTemplate } from '../components/templates/standard/CommercialSalesTemplate';
import { CustomerCareTemplate } from '../components/templates/standard/CustomerCareTemplate';
import { EmeraldCleanTemplate } from '../components/templates/standard/EmeraldCleanTemplate';
import { HospitalityTourismTemplate } from '../components/templates/standard/HospitalityTourismTemplate';
import { LegalCounselTemplate } from '../components/templates/standard/LegalCounselTemplate';
import { LogisticsProTemplate } from '../components/templates/standard/LogisticsProTemplate';
import { MedicalHealthTemplate } from '../components/templates/standard/MedicalHealthTemplate';
import { NavyCorporateTemplate } from '../components/templates/standard/NavyCorporateTemplate';
import { OperationsLeadTemplate } from '../components/templates/standard/OperationsLeadTemplate';
import { SlateModernTemplate } from '../components/templates/standard/SlateModernTemplate';
import { TechDeveloperTemplate } from '../components/templates/standard/TechDeveloperTemplate';

import { CorporateArchTemplate } from '../components/templates/premium/CorporateArchTemplate';
import { DarkMonolithTemplate } from '../components/templates/premium/DarkMonolithTemplate';
import { ExecutiveGoldTemplate } from '../components/templates/premium/ExecutiveGoldTemplate';
import { FintechAnalyticsTemplate } from '../components/templates/premium/FintechAnalyticsTemplate';
import { MinimalLuxeTemplate } from '../components/templates/premium/MinimalLuxeTemplate';
import { NordicMinimalTemplate } from '../components/templates/premium/NordicMinimalTemplate';
import { PortfolioShowcaseTemplate } from '../components/templates/premium/PortfolioShowcaseTemplate';
import { SeniorConsultantTemplate } from '../components/templates/premium/SeniorConsultantTemplate';
import { StrategicDirectorTemplate } from '../components/templates/premium/StrategicDirectorTemplate';
import { StudioHorizonTemplate } from '../components/templates/premium/StudioHorizonTemplate';

export const SAMPLE_CV_DATA: CVData = {
  contact: {
    fullName: 'Carlos Mendoza',
    professionalTitle: 'Ingeniero de Sistemas',
    email: 'carlos.mendoza@email.com',
    phone: '+1 (809) 555-0192',
    city: 'Santo Domingo',
    country: 'Rep. Dominicana',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    photoShape: 'circle',
    links: {
      portfolio: 'carlosmendoza.dev',
      linkedin: 'linkedin.com/in/carlosmendozard',
    },
  },
  summary: 'Ingeniero de Sistemas con más de 6 años de experiencia liderando proyectos de transformación digital y desarrollo de software escalable en el sector corporativo de República Dominicana.',
  experiences: [
    {
      id: 'exp1',
      company: 'TechCorp Dominicana',
      position: 'Senior Software Engineer & Tech Lead',
      startDate: '2022',
      endDate: 'Presente',
      isCurrent: true,
      responsibilities: [
        'Liderazgo técnico de un equipo de 8 desarrolladores.',
        'Optimización de arquitectura reduciendo tiempos de respuesta un 40%.',
        'Implementación de procesos automatizados de despliegue cloud.',
      ],
    },
    {
      id: 'exp2',
      company: 'Grupo Empresarial Caribe',
      position: 'Desarrollador Full Stack',
      startDate: '2019',
      endDate: '2022',
      isCurrent: false,
      responsibilities: [
        'Integración de pasarelas de pago e interfaces web responsivas.',
        'Mejora del rendimiento web incrementando la tasa de conversión.',
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'INTEC',
      degree: 'Ingeniería en Sistemas Computacionales',
      startDate: '2015',
      endDate: '2019',
      isCurrent: false,
    },
    {
      id: 'edu2',
      institution: 'PUCMM',
      degree: 'Maestría en Gestión de TI',
      startDate: '2020',
      endDate: '2022',
      isCurrent: false,
    },
  ],
  skills: [
    { id: 's1', name: 'TypeScript / React', level: 'Experto' },
    { id: 's2', name: 'Next.js & Tailwind CSS', level: 'Experto' },
    { id: 's3', name: 'Arquitectura Cloud & AWS', level: 'Avanzado' },
    { id: 's4', name: 'Gestión de Proyectos', level: 'Avanzado' },
  ],
  languages: [
    { id: 'l1', language: 'Español', proficiency: 'Nativo' },
    { id: 'l2', language: 'Inglés', proficiency: 'Avanzado' },
  ],
  references: [
    {
      id: 'r1',
      name: 'Lic. Roberto Gómez',
      relationship: 'Director de Tecnología',
      company: 'TechCorp RD',
      phone: '+1 (809) 555-9988',
      email: 'rgomez@techcorp.do',
    },
    {
      id: 'r2',
      name: 'Ing. Laura Fernández',
      relationship: 'Gerente de Operaciones',
      company: 'Grupo Caribe',
      phone: '+1 (809) 555-3344',
      email: 'lfernandez@grupocaribe.do',
    },
  ],
  fontFamily: 'Poppins',
  colorScheme: '#fbbf24',
  fontSizeScale: 1.0,
  showPhoto: true,
  marginInches: 0.6,
  hiddenSections: [],
};

export const TEMPLATE_COMPONENTS: Record<string, React.FC<{ data: CVData }>> = {
  AcademicResearchTemplate: AcademicResearchTemplate as React.FC<{ data: CVData }>,
  ATSDirectClassicTemplate: ATSDirectClassicTemplate as React.FC<{ data: CVData }>,
  ATSMinimalTemplate: ATSMinimalTemplate as React.FC<{ data: CVData }>,
  CharcoalCompactTemplate: CharcoalCompactTemplate as React.FC<{ data: CVData }>,
  CommercialSalesTemplate: CommercialSalesTemplate as React.FC<{ data: CVData }>,
  CustomerCareTemplate: CustomerCareTemplate as React.FC<{ data: CVData }>,
  EmeraldCleanTemplate: EmeraldCleanTemplate as React.FC<{ data: CVData }>,
  HospitalityTourismTemplate: HospitalityTourismTemplate as React.FC<{ data: CVData }>,
  LegalCounselTemplate: LegalCounselTemplate as React.FC<{ data: CVData }>,
  LogisticsProTemplate: LogisticsProTemplate as React.FC<{ data: CVData }>,
  MedicalHealthTemplate: MedicalHealthTemplate as React.FC<{ data: CVData }>,
  NavyCorporateTemplate: NavyCorporateTemplate as React.FC<{ data: CVData }>,
  OperationsLeadTemplate: OperationsLeadTemplate as React.FC<{ data: CVData }>,
  SlateModernTemplate: SlateModernTemplate as React.FC<{ data: CVData }>,
  TechDeveloperTemplate: TechDeveloperTemplate as React.FC<{ data: CVData }>,

  CorporateArchTemplate: CorporateArchTemplate as React.FC<{ data: CVData }>,
  DarkMonolithTemplate: DarkMonolithTemplate as React.FC<{ data: CVData }>,
  ExecutiveGoldTemplate: ExecutiveGoldTemplate as React.FC<{ data: CVData }>,
  FintechAnalyticsTemplate: FintechAnalyticsTemplate as React.FC<{ data: CVData }>,
  MinimalLuxeTemplate: MinimalLuxeTemplate as React.FC<{ data: CVData }>,
  NordicMinimalTemplate: NordicMinimalTemplate as React.FC<{ data: CVData }>,
  PortfolioShowcaseTemplate: PortfolioShowcaseTemplate as React.FC<{ data: CVData }>,
  SeniorConsultantTemplate: SeniorConsultantTemplate as React.FC<{ data: CVData }>,
  StrategicDirectorTemplate: StrategicDirectorTemplate as React.FC<{ data: CVData }>,
  StudioHorizonTemplate: StudioHorizonTemplate as React.FC<{ data: CVData }>,
};