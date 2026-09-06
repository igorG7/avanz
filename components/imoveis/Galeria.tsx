"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";

type Props = {
  fotos: string[];
  alt: string;
  badge?: string;
  /** Miniaturas visíveis antes de aparecer o "+N". */
  maxThumbs?: number;
};

export function Galeria({ fotos, alt, badge, maxThumbs = 8 }: Props) {
  const [selected, setSelected] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);

  const hasMultiple = fotos.length > 1;
  const mainSrc = fotos[selected] ?? fotos[0];

  const excede = fotos.length > maxThumbs;
  // Com excesso, a última vaga vira o "+N", então uma miniatura a menos aparece.
  const visiveis = excede ? fotos.slice(0, maxThumbs - 1) : fotos;
  const restantes = fotos.length - visiveis.length;
  const capaDoResto = fotos[visiveis.length];

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
          role="group"
          aria-label="Galeria de fotos"
          className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3"
        >
          {visiveis.map((src, i) => {
            const isActive = i === selected;
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                aria-pressed={isActive}
                aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
                onClick={() => setSelected(i)}
                className={`relative aspect-[4/3] overflow-hidden rounded-card border-2 bg-line transition ${
                  isActive
                    ? "border-orange"
                    : "border-transparent opacity-70 hover:border-line hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`${alt}, foto ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 15vw, 25vw"
                  className="object-cover"
                />
              </button>
            );
          })}

          {restantes > 0 && capaDoResto && (
            <button
              type="button"
              onClick={() => setModalAberto(true)}
              aria-label={`Ver todas as ${fotos.length} fotos`}
              aria-haspopup="dialog"
              className="group relative aspect-[4/3] overflow-hidden rounded-card border-2 border-transparent bg-line transition hover:border-orange"
            >
              <Image
                src={capaDoResto}
                alt=""
                fill
                sizes="(min-width: 1024px) 15vw, 25vw"
                className="object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-navy/70 font-display text-lg font-bold text-white transition group-hover:bg-navy/80">
                +{restantes}
              </span>
            </button>
          )}
        </div>
      )}

      {modalAberto && (
        <ModalFotos
          fotos={fotos}
          alt={alt}
          onSelecionar={(i) => {
            setSelected(i);
            setModalAberto(false);
          }}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </div>
  );
}

type ModalProps = {
  fotos: string[];
  alt: string;
  onSelecionar: (index: number) => void;
  onFechar: () => void;
};

function ModalFotos({ fotos, alt, onSelecionar, onFechar }: ModalProps) {
  const fecharRef = useRef<HTMLButtonElement>(null);
  const origemRef = useRef<Element | null>(null);

  const fechar = useCallback(() => {
    // Devolve o foco a quem abriu o modal, senão ele volta para o topo da página.
    const origem = origemRef.current;
    onFechar();
    if (origem instanceof HTMLElement) origem.focus();
  }, [onFechar]);

  useEffect(() => {
    origemRef.current = document.activeElement;
    fecharRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("keydown", onKeyDown);

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowAnterior;
    };
  }, [fechar]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Todas as fotos: ${alt}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) fechar();
      }}
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-navy/95 backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-navy/90 px-5 py-4 backdrop-blur sm:px-8">
        <p className="font-display text-sm font-semibold text-white sm:text-base">
          {fotos.length} fotos
          <span className="ml-2 hidden font-normal text-white/50 sm:inline">
            {alt}
          </span>
        </p>
        <button
          ref={fecharRef}
          type="button"
          onClick={fechar}
          aria-label="Fechar galeria"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <Icon name="close" size={18} />
        </button>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-4 sm:p-8 lg:grid-cols-3">
        {fotos.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => onSelecionar(i)}
            aria-label={`Abrir foto ${i + 1} de ${fotos.length} na galeria`}
            className="group relative aspect-[4/3] overflow-hidden rounded-card bg-white/5 ring-1 ring-white/10 transition hover:ring-2 hover:ring-orange"
          >
            <Image
              src={src}
              alt={`${alt}, foto ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-2 right-2 rounded-pill bg-navy/75 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              {i + 1}
            </span>
          </button>
        ))}
      </div>
    </div>,
    document.body,
  );
}
