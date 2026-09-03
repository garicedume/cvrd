import React from 'react';

interface PromoBannerProps {
  id: 'promocion_01' | 'promocion_02' | 'promocion_03';
  altText?: string;
  linkHref?: string;
}

export default function PromoBanner({ id, altText = 'Promoción especial', linkHref = '#' }: PromoBannerProps) {
  return (
    <div className="w-full my-6 overflow-hidden rounded-xl shadow-md border border-zinc-800/50 bg-zinc-900/50">
      <a href={linkHref} target="_blank" rel="noopener noreferrer" className="block relative group">
        <img
          src={`/${id}.gif`}
          alt={altText}
          className="w-full h-24 sm:h-32 object-cover group-hover:scale-[1.01] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      </a>
    </div>
  );
}