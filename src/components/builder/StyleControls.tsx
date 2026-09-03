'use client';

import React from 'react';
import { useCV } from '../../context/CVContext';
import { FontFamilyType } from '../../types/cv';
import { Type, Palette, Check, Pipette } from 'lucide-react';

const COLOR_PALETTES = [
  { name: 'Dorado Ámbar', value: '#fbbf24' },
  { name: 'Azul Corporativo', value: '#2563eb' },
  { name: 'Verde Esmeralda', value: '#059669' },
  { name: 'Gris Pizarra', value: '#475569' },
  { name: 'Rojo Ejecutivo', value: '#dc2626' },
  { name: 'Negro Monolito', value: '#0f172a' },
];

const FONTS_MODERNO: FontFamilyType[] = [
  'DM Sans', 'Manrope', 'Roboto', 'Inter', 'Lato', 'Open Sans', 'Source Sans 3'
];

const FONTS_CREATIVO: FontFamilyType[] = [
  'Poppins', 'Montserrat', 'IBM Plex Sans'
];

export const StyleControls: React.FC = () => {
  const { cvData, updateCVData } = useCV();

  return (
    <div className="space-y-6 text-gray-900 font-poppins">
      
      {/* 1. SECTOR TIPOGRAFÍAS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <label className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-wider">
            <Type className="w-4 h-4 text-amber-500" />
            Tipografías del CV
          </label>
          <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full uppercase">
            {cvData.fontFamily || 'DM Sans'}
          </span>
        </div>

        {/* Estilo Moderno / ATS */}
        <div className="space-y-2">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block">
            Estilo Moderno / ATS
          </span>
          <div className="grid grid-cols-2 gap-2">
            {FONTS_MODERNO.map((font) => {
              const isSelected = cvData.fontFamily === font;
              return (
                <button
                  key={font}
                  type="button"
                  onClick={() => updateCVData({ fontFamily: font })}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left border flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400/20 text-gray-950 shadow-xs ring-2 ring-amber-400/50 scale-[1.01]'
                      : 'border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100 hover:text-gray-950'
                  }`}
                >
                  <span className="truncate">{font}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Estilo Creativo */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block">
            Estilo Creativo
          </span>
          <div className="grid grid-cols-2 gap-2">
            {FONTS_CREATIVO.map((font) => {
              const isSelected = cvData.fontFamily === font;
              return (
                <button
                  key={font}
                  type="button"
                  onClick={() => updateCVData({ fontFamily: font })}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left border flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400/20 text-gray-950 shadow-xs ring-2 ring-amber-400/50 scale-[1.01]'
                      : 'border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100 hover:text-gray-950'
                  }`}
                >
                  <span className="truncate">{font}</span>
                  {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* 2. COLOR DE ACENTO */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-wider">
          <Palette className="w-4 h-4 text-amber-500" />
          Color de Acento
        </label>

        <div className="flex flex-wrap gap-2.5">
          {COLOR_PALETTES.map((color) => {
            const isSelected = cvData.colorScheme === color.value;
            return (
              <button
                key={color.value}
                type="button"
                onClick={() => updateCVData({ colorScheme: color.value })}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isSelected ? 'scale-110 ring-4 ring-amber-400/40 shadow-sm' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-gray-300 shadow-xs flex items-center justify-center">
              <input
                type="color"
                value={cvData.colorScheme || '#059669'}
                onChange={(e) => updateCVData({ colorScheme: e.target.value })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: cvData.colorScheme || '#059669' }}
              >
                <Pipette className="w-4 h-4 text-white drop-shadow-md" />
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-gray-900">Color Libre</p>
              <p className="text-[10px] text-gray-500">Rueda o código HEX</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs font-mono font-bold text-gray-400">#</span>
            <input
              type="text"
              value={(cvData.colorScheme || '#059669').replace('#', '')}
              onChange={(e) => {
                const hex = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
                updateCVData({ colorScheme: hex });
              }}
              className="w-20 px-2 py-1 bg-gray-900 border border-gray-800 rounded-xl text-xs font-mono font-black text-amber-400 text-center uppercase focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

    </div>
  );
};