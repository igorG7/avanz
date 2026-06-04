"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  fotos: string[];
  alt: string;
  badge?: string;
};

export function Galeria({ fotos, alt, badge }: Props) {
  const [selected, setSelected] = useState(0);
  const hasMultiple = fotos.length > 1;
  const mainSrc = fotos[selected] ?? fotos[0];

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-line shadow-card">
        <Image
          src={mainSrc}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {badge && (
          <span className="absolute left-4 top-4 rounded-pill bg-orange px-3 py-1 text-xs font-semibold text-white shadow-cta">
            {badge}
          </span>
        )}
        {hasMultiple && (
          <span className="absolute bottom-4 right-4 rounded-pill bg-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {selected + 1} / {fotos.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div
          role="tablist"
          aria-label="Galeria de fotos"
          className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3"
        >
          {fotos.slice(0, 8).map((src, i) => {
            const isActive = i === selected;
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelected(i)}
                className={`relative aspect-[4/3] overflow-hidden rounded-card border-2 bg-line transition ${
                  isActive
                    ? "border-orange"
                    : "border-transparent opacity-70 hover:border-line hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`${alt} — foto ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 15vw, 25vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
