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
