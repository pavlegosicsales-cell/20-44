"use client";

import type React from "react";
import { HudButton } from "@/components/ui/hud-button";

type CtaButtonProps = {
  /** id sekcije na koju skroluje (bez #). */
  target: string;
  children: string;
  variant?: "primary" | "secondary";
  style?: "style1" | "style2";
  size?: "small" | "default" | "large";
  icon?: React.ReactNode;
  iconHover?: { x?: number; y?: number };
  delay?: number;
  ariaLabel?: string;
};

/*
  CTA wrapper oko HudButton — skroluje na #target (in-page).
  Postoji da bi HudButton (client) mogao da se koristi iz server komponenti.
*/
export default function CtaButton({
  target,
  children,
  variant = "primary",
  style = "style2",
  size = "default",
  icon,
  iconHover,
  delay = 0,
  ariaLabel,
}: CtaButtonProps) {
  const onClick = () => {
    document
      .getElementById(target)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <HudButton
      variant={variant}
      style={style}
      size={size}
      icon={icon}
      iconHover={iconHover}
      delay={delay}
      onClick={onClick}
      aria-label={ariaLabel ?? children}
    >
      {children}
    </HudButton>
  );
}
