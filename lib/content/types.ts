export type Imovel = {
  slug: string;
  tipo: "Lote" | "Sítio" | "Chácara";
  bairro: string;
  cidade: string;
  area: string;
  preco: string;
  badge?: string;
  destaque?: string;
  foto: string;
  fotos?: string[];
  resumo?: string;
  descricao?: string;
  caracteristicas?: { label: string; value: string }[];
};

export type Pillar = {
  title: string;
  body: string;
  icon:
    | "compass"
    | "wallet"
    | "map"
    | "headset"
    | "eye"
    | "shield"
    | "file-check"
    | "trending-up";
};

export type Depoimento = {
  quote: string;
  nome: string;
  contexto: string;
};
