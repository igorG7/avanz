"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = { mp4: string; hevc?: string; poster: string };

/** Muted looping video that only downloads when it gets near the viewport. */
export function LazyVideo({ mp4, hevc, poster }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-video overflow-hidden rounded-card bg-line">
      <Image src={poster} alt="" fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
      {inView && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          {/* HEVC first: lighter; browsers without it fall through to H.264 */}
          {hevc && <source src={hevc} type='video/mp4; codecs="hvc1"' />}
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
