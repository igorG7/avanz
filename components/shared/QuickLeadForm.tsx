"use client";

import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

type Variant = "hero" | "contato";

type Props = {
  variant?: Variant;
};

export function QuickLeadForm({ variant = "hero" }: Props) {
  const [localizacao, setLocalizacao] = useState("");
  const [tipo, setTipo] = useState("Lote / loteamento");
  const [preferencias, setPreferencias] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const isContato = variant === "contato";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const linhas: string[] = ["Olá! Vim pelo site da Avanz."];
    if (isContato) {
      if (nome) linhas.push(`Sou ${nome}.`);
      if (telefone) linhas.push(`Telefone: ${telefone}.`);
    }
    if (tipo) linhas.push(`Tenho interesse em: ${tipo}.`);
    if (localizacao) linhas.push(`Região: ${localizacao}.`);
    if (preferencias) linhas.push(`Detalhes: ${preferencias}.`);
    const link = buildWhatsAppLink(linhas.join(" "));
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (isContato) {
    return (
      <form onSubmit={onSubmit} className="grid gap-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Nome
          </label>
          <input
            id="nome"
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-2 w-full rounded-card border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label
            htmlFor="telefone"
            className="block text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="mt-2 w-full rounded-card border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
            placeholder="(31) 9 0000-0000"
          />
        </div>

        <div>
          <label
            htmlFor="preferencias"
            className="block text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Interesse, valores, necessidades
          </label>
          <textarea
            id="preferencias"
            rows={4}
            value={preferencias}
            onChange={(e) => setPreferencias(e.target.value)}
            className="mt-2 w-full rounded-card border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
            placeholder="Conta o que você procura — região, valor, finalidade."
          />
        </div>

        <button
          type="submit"
          className="btn-primary mt-2 w-full !px-4 text-sm sm:!px-7 sm:text-base"
        >
          <Icon name="whatsapp" size={18} />
          <span className="sm:hidden">Enviar pelo WhatsApp</span>
          <span className="hidden sm:inline">Enviar e continuar no WhatsApp</span>
        </button>
        <p className="text-center text-xs text-muted">
          Ao enviar, você inicia o atendimento pelo WhatsApp (canal principal).
        </p>
      </form>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card border border-white/10 bg-white/95 p-6 shadow-card backdrop-blur"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-card bg-navy text-orange">
          <Icon name="compass" size={18} />
        </span>
        <div>
          <h3 className="font-display text-base font-semibold text-navy">
            Receber opções
          </h3>
          <p className="text-xs text-muted">
            Preenche o básico e a gente chama no WhatsApp.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div>
          <label
            htmlFor="localizacao"
            className="block text-[11px] font-semibold uppercase tracking-widest text-muted"
          >
            Localização de interesse
          </label>
          <input
            id="localizacao"
            type="text"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className="mt-1.5 w-full rounded-card border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
            placeholder="Ex: Mateus Leme, Igarapé"
          />
        </div>

        <div>
          <label
            htmlFor="tipo"
            className="block text-[11px] font-semibold uppercase tracking-widest text-muted"
          >
            Tipo
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="mt-1.5 w-full rounded-card border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
          >
            <option>Lote / loteamento</option>
            <option>Sítio</option>
            <option>Chácara</option>
            <option>Minha Casa Minha Vida</option>
            <option>Não sei ainda</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="preferencias"
            className="block text-[11px] font-semibold uppercase tracking-widest text-muted"
          >
            Preferências
          </label>
          <textarea
            id="preferencias"
            rows={2}
            value={preferencias}
            onChange={(e) => setPreferencias(e.target.value)}
            className="mt-1.5 w-full rounded-card border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20"
            placeholder="Faixa de valor, finalidade, outros detalhes."
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-5 w-full text-sm">
        <Icon name="whatsapp" size={16} />
        Continuar no WhatsApp
      </button>
      <p className="mt-3 text-center text-[11px] text-muted">
        Dica: quanto mais claro o objetivo, melhor a curadoria.
      </p>
    </form>
  );
}
