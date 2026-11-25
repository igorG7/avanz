import Image from "next/image";

/**
 * Foto de fundo de hero escuro. A camada em degradê garante a leitura do texto
 * branco por cima. A seção precisa de `relative isolate overflow-hidden`.
 */
export function CapaDeFundo({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/55 to-navy" />
    </div>
  );
}
