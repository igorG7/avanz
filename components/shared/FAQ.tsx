"use client";

import { useState } from "react";

export type FAQItem = {
  q: string;
  a: string;
};

type Props = {
  items: FAQItem[];
  variant?: "light" | "dark";
};

export function FAQ({ items, variant = "light" }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const isDark = variant === "dark";

  const dividerCls = isDark ? "divide-white/10" : "divide-line";
  const numberCls = isDark ? "text-orange-bright" : "text-orange-deep";
  const questionCls = isDark ? "text-white" : "text-navy";
  const answerCls = isDark ? "text-white/70" : "text-muted";
  const iconCls = isDark ? "text-white/60" : "text-navy/60";

  return (
    <ul className={`divide-y ${dividerCls}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-6 py-7 text-left sm:gap-8 sm:py-8"
            >
              <span
                className={`shrink-0 font-display text-xs font-semibold uppercase tracking-[0.25em] pt-1.5 sm:pt-2 ${numberCls}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`flex-1 font-display text-base font-semibold leading-snug sm:text-lg ${questionCls}`}
              >
                {item.q}
              </span>
              <span
                aria-hidden
                className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center transition-transform sm:mt-2 ${iconCls} ${
                  isOpen ? "rotate-45 text-orange" : ""
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div
                className={`pb-7 pl-[3.5rem] pr-12 text-sm leading-relaxed sm:pb-8 sm:pl-[4.5rem] sm:text-base ${answerCls}`}
              >
                {item.a}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
