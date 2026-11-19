import type { ProcessStep } from "@/components/home/ProcessSteps";
import type { Depoimento } from "./types";

export const processo: ProcessStep[] = [
  {
    icon: "headset",
    title: "Entender para atender",
    body: "Você conta objetivo, região e necessidade. A Avanz organiza o cenário.",
  },
  {
    icon: "compass",
    title: "Análise e proposta",
    body: "Selecionamos opções e alinhamos expectativas: terreno, loteamento, MCMV ou médio/alto padrão.",
  },
  {
    icon: "route",
    title: "Visita e decisão",
    body: "Agendamos e acompanhamos. Sem surpresa no meio do caminho.",
  },
  {
    icon: "file-check",
    title: "Condições e fechamento",
    body: "Apresentamos as condições disponíveis e orientamos o fechamento com clareza.",
  },
];

/** Só depoimentos confirmados como reais pela Avanz. */
export const depoimentos: Depoimento[] = [
  {
    quote:
      "Tenho que agradecer muito a vocês, pois realmente enxergaram o que eu precisava e me conduziram até um lote que me conquistou e que atendia exatamente aos meus objetivos. Fui muito bem tratada e para mim isso conta muito, só agradecimentos!",
    nome: "Cliente Avanz",
    contexto: "compradora de lote",
  },
];
