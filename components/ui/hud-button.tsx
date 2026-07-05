"use client";

import { motion, useReducedMotion } from "framer-motion";
import type React from "react";
import { useId, useState } from "react";
import { HyperText } from "@/components/ui/hyper-text";

interface HudButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  style?: "style1" | "style2";
  size?: "small" | "default" | "large";
  onClick?: () => void;
  delay?: number;
  enableAnimations?: boolean;
  /** Ikonica (npr. strelica) desno od teksta — pomera se na hover. */
  icon?: React.ReactNode;
  /** Pomeraj ikonice na hover (px). Podrazumevano gore-desno. */
  iconHover?: { x?: number; y?: number };
  "aria-label"?: string;
}

/*
  HUD dugme — adaptacija (isaiahbjork/hud-button) u 20/44 paletu.
  Uklonjen next-themes (sajt je uvek taman). Primary = žuta (#FED11C), sekundarna = ash.
  Zadržana strelica (icon) koja se pomera na hover.
*/
export function HudButton({
  children,
  variant = "primary",
  style = "style1",
  size = "default",
  onClick,
  delay = 0,
  enableAnimations = true,
  icon,
  iconHover = { x: 3, y: -3 },
  "aria-label": ariaLabel,
}: HudButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;
  const [isHovered, setIsHovered] = useState(false);

  // 20/44 paleta (uvek tamno)
  const getColors = () => {
    if (variant === "primary") {
      return {
        main: "#FED11C",
        gradient: "#FED11C",
        secondaryFill1: "#FED11C",
        secondaryFill2: "#FED11C",
        text: "text-accent",
        glow: "rgba(254, 209, 28, 0.28)",
        border: "#FED11C",
        outline: "#FED11C",
      };
    }
    return {
      main: "#9a9a9a",
      gradient: "#9a9a9a",
      secondaryFill1: "#151717",
      secondaryFill2: "#262929",
      text: "text-bone",
      glow: "rgba(255, 255, 255, 0.12)",
      border: "#9a9a9a",
      outline: "#9a9a9a",
    };
  };

  const colors = getColors();

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      filter: shouldAnimate ? "blur(4px)" : "blur(0px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
        mass: 0.8,
        delay,
        duration: shouldAnimate ? undefined : 0,
      },
    },
  };

  const containerVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      rotateX: 2,
      transition: { type: "spring" as const, stiffness: 400, damping: 25, mass: 0.6 },
    },
    tap: {
      scale: 0.98,
      y: 0,
      rotateX: 0,
      transition: { type: "spring" as const, stiffness: 500, damping: 30, mass: 0.5 },
    },
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: variant === "primary" ? 0.6 : 0.3,
      scale: 1.1,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0, filter: "blur(2px)" },
    show: (i: number) => ({
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        delay: delay + 0.3 + i * 0.05,
        duration: shouldAnimate ? undefined : 0,
      },
    }),
    hover: {
      scale: 1.2,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 500, damping: 25, mass: 0.4 },
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: "100%",
      opacity: [0, 0.5, 0],
      transition: { duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" as const },
    },
  };

  const uniqueId = useId();
  const gradientId1 = `gradient1-${uniqueId}`;
  const gradientId2 = `gradient2-${uniqueId}`;
  const gradientId = `gradient-${uniqueId}`;

  const getSizeStyles = () => {
    if (style === "style1") {
      return { width: "200px", height: "48px", textClass: "text-sm tracking-wider" };
    }
    switch (size) {
      case "small":
        return { width: "150px", height: "42px", textClass: "text-xs tracking-wide" };
      case "large":
        return { width: "250px", height: "65px", textClass: "text-base tracking-wider" };
      default:
        return { width: "200px", height: "52px", textClass: "text-sm tracking-wider" };
    }
  };

  const sizeStyles = getSizeStyles();

  const renderStyle1SVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 182.288 43.721"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id={gradientId} x1="93.198" y1="-53.343" x2="93.198" y2="68.841" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={colors.gradient} />
          <stop offset="0.005" stopColor={colors.gradient} stopOpacity="0.986" />
          <stop offset="0.085" stopColor={colors.gradient} stopOpacity="0.781" />
          <stop offset="0.17" stopColor={colors.gradient} stopOpacity="0.596" />
          <stop offset="0.258" stopColor={colors.gradient} stopOpacity="0.436" />
          <stop offset="0.351" stopColor={colors.gradient} stopOpacity="0.301" />
          <stop offset="0.449" stopColor={colors.gradient} stopOpacity="0.191" />
          <stop offset="0.554" stopColor={colors.gradient} stopOpacity="0.106" />
          <stop offset="0.669" stopColor={colors.gradient} stopOpacity="0.046" />
          <stop offset="0.804" stopColor={colors.gradient} stopOpacity="0.011" />
          <stop offset="1" stopColor={colors.gradient} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        <g>
          <motion.path
            d="M181.788.5H13.7L4.609,9.593V43.221H170.048l11.74-11.74Z"
            fill={`url(#${gradientId})`}
            fillOpacity={variant === "primary" ? 0.22 : 0.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldAnimate ? 0.8 : 0, delay: delay + 0.2, ease: "easeOut" }}
          />
          <motion.path
            d="M170.256,43.721H4.108V9.386L13.494,0H182.288V31.688Zm-165.148-1H169.842l11.446-11.447V1H13.908l-8.8,8.8Z"
            fill={colors.border}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: delay + 0.4, ease: "easeOut" }}
          />
          <g>
            {[
              { cx: "169.908", cy: "7.326", index: 0 },
              { cx: "169.908", cy: "11.908", index: 1 },
              { cx: "174.373", cy: "7.326", index: 2 },
              { cx: "174.373", cy: "11.908", index: 3 },
            ].map((dot) => (
              <motion.circle
                key={`${dot.cx}-${dot.cy}`}
                cx={dot.cx}
                cy={dot.cy}
                r="1.161"
                fill={colors.main}
                variants={dotVariants}
                initial="hidden"
                animate="show"
                whileHover="hover"
                custom={dot.index}
              />
            ))}
          </g>
        </g>
        <g>
          {[
            { cx: "0.621", cy: "19.214", index: 4 },
            { cx: "0.621", cy: "24.506", index: 5 },
          ].map((dot) => (
            <motion.circle
              key={`${dot.cx}-${dot.cy}`}
              cx={dot.cx}
              cy={dot.cy}
              r="0.621"
              fill={colors.main}
              variants={dotVariants}
              initial="hidden"
              animate="show"
              whileHover="hover"
              custom={dot.index}
            />
          ))}
        </g>
      </g>
    </svg>
  );

  const renderStyle2SVG = () => (
    <svg viewBox="0 0 187 52" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={gradientId1} x1="94.9995" y1="-62.017" x2="94.9995" y2="80.9853" gradientUnits="userSpaceOnUse">
          <stop stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill1} stopOpacity="0.95" />
          <stop offset="0.085" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill1} stopOpacity="0.85" />
          <stop offset="0.258" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill1} stopOpacity="0.65" />
          <stop offset="0.449" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill1} stopOpacity="0.45" />
          <stop offset="0.669" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill1} stopOpacity="0.25" />
          <stop offset="1" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill1} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gradientId2} x1="95.4995" y1="-65.5377" x2="95.4995" y2="83.1847" gradientUnits="userSpaceOnUse">
          <stop stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill2} stopOpacity="0.8" />
          <stop offset="0.17" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill2} stopOpacity="0.55" />
          <stop offset="0.449" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill2} stopOpacity="0.25" />
          <stop offset="0.804" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill2} stopOpacity="0.06" />
          <stop offset="1" stopColor={variant === "primary" ? colors.gradient : colors.secondaryFill2} stopOpacity="0" />
        </linearGradient>
      </defs>

      {[
        { cx: "174.161", cy: "7.161", index: 0 },
        { cx: "174.161", cy: "11.739", index: 1 },
        { cx: "178.63", cy: "7.161", index: 2 },
        { cx: "178.63", cy: "11.739", index: 3 },
      ].map((dot) => (
        <motion.circle
          key={`${dot.cx}-${dot.cy}`}
          cx={dot.cx}
          cy={dot.cy}
          r="1.161"
          fill={colors.main}
          variants={dotVariants}
          initial="hidden"
          animate="show"
          whileHover="hover"
          custom={dot.index}
        />
      ))}

      <motion.path
        d="M4.5 6L10 0.5H181L186.5 6V46L181 51.5H10L4.5 45.7834V6Z"
        fill={`url(#${gradientId1})`}
        fillOpacity={variant === "primary" ? 0.22 : 1}
        stroke={colors.border}
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldAnimate ? 0.8 : 0, delay: delay + 0.2, ease: "easeOut" }}
      />

      {[
        { cx: "0.621", cy: "23.621", index: 4 },
        { cx: "0.621", cy: "28.91", index: 5 },
      ].map((dot) => (
        <motion.circle
          key={`${dot.cx}-${dot.cy}`}
          cx={dot.cx}
          cy={dot.cy}
          r="0.621"
          fill={colors.main}
          variants={dotVariants}
          initial="hidden"
          animate="show"
          whileHover="hover"
          custom={dot.index}
        />
      ))}

      <motion.path
        d="M181.07 52H9.9311L4 46.1001V5.8994L9.9311 0H181.07L187 5.8994V46.1001L181.07 52ZM10.1235 51.5332H180.876L186.531 45.9069V6.09266L180.876 0.466799L10 0.5L4.5 6L4.46916 45.9069L10.1235 51.5332Z"
        fill={colors.outline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldAnimate ? 0.6 : 0, delay: delay + 0.4, ease: "easeOut" }}
      />
    </svg>
  );

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      className="relative cursor-pointer transform-gpu"
      variants={shouldAnimate ? buttonVariants : {}}
      initial={shouldAnimate ? "hidden" : "show"}
      animate="show"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ width: sizeStyles.width, height: sizeStyles.height, perspective: "1000px" }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`, filter: "blur(10px)" }}
        variants={shouldAnimate ? glowVariants : {}}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />

      {/* Shimmer (primary) */}
      {shouldAnimate && variant === "primary" && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              width: "30%",
              height: "100%",
            }}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
        </div>
      )}

      <motion.div
        variants={shouldAnimate ? containerVariants : {}}
        className="relative cursor-pointer h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {style === "style1" ? renderStyle1SVG() : renderStyle2SVG()}

        {/* Tekst + strelica */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: delay + 0.6,
                duration: shouldAnimate ? 0.4 : 0,
                type: "spring",
                stiffness: 300,
                damping: 25,
              },
            }}
          >
            <HyperText
              text={children as string}
              className={`cursor-pointer ${sizeStyles.textClass} ${colors.text}`}
              duration={shouldAnimate ? 800 : 0}
              animateOnLoad={shouldAnimate}
            />
            {icon && (
              <motion.span
                aria-hidden="true"
                className={`inline-flex ${colors.text}`}
                animate={
                  isHovered && shouldAnimate
                    ? { x: iconHover.x ?? 0, y: iconHover.y ?? 0 }
                    : { x: 0, y: 0 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 18, mass: 0.5 }}
              >
                {icon}
              </motion.span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.button>
  );
}
