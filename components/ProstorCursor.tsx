"use client";

import { useEffect, useRef, useState } from "react";
import TargetCursor from "@/components/ui/target-cursor";

/*
  Pali TargetCursor SAMO dok je Prostor (#kuca) sekcija aktivna:
  - #kuca dovoljno u kadru, I
  - Filozofija (#o-nama) je još NIJE prekrila (reveal-stack: About klizi preko Prostora).
  Prostor je sticky/pinned pa geometrijski "intersect-uje" i kad ga About prekrije —
  zato gledamo i About ratio da ugasimo kursor kad krene da prekriva.
*/
export default function ProstorCursor() {
  const kucaRatio = useRef(0);
  const aboutRatio = useRef(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const kuca = document.getElementById("kuca");
    const about = document.getElementById("o-nama");
    if (!kuca) return;

    const recompute = () => {
      setActive(kucaRatio.current > 0.4 && aboutRatio.current < 0.25);
    };

    const thresholds = [0, 0.15, 0.25, 0.4, 0.6, 0.8, 1];
    const ioKuca = new IntersectionObserver(
      ([e]) => {
        kucaRatio.current = e.intersectionRatio;
        recompute();
      },
      { threshold: thresholds }
    );
    ioKuca.observe(kuca);

    let ioAbout: IntersectionObserver | null = null;
    if (about) {
      ioAbout = new IntersectionObserver(
        ([e]) => {
          aboutRatio.current = e.intersectionRatio;
          recompute();
        },
        { threshold: thresholds }
      );
      ioAbout.observe(about);
    }

    return () => {
      ioKuca.disconnect();
      ioAbout?.disconnect();
    };
  }, []);

  if (!active) return null;

  return (
    <TargetCursor
      spinDuration={2.5}
      hideDefaultCursor
      parallaxOn
      hoverDuration={0.5}
      cursorColor="#f2f2f2"
      cursorColorOnTarget="#FED11C"
    />
  );
}
