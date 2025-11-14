// src/components/ui/BadgeBox.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

/**
 * BadgeBox
 *
 * Props:
 * - count: number | string (el número a mostrar)
 * - max: number (si count > max, mostrará `${max}+`)
 * - showZero: boolean (si false y count === 0 no se renderiza)
 * - anchor: boolean (si true -> position absolute - ideal para iconos)
 * - top/right/left/bottom: numbers or string for anchor offsets (p.e. top="6px", right="6px")
 * - size: 'sm' | 'md' | 'lg' (tamaños)
 * - variant: 'dot' | 'count' (dot es pequeño círculo sin número)
 * - sx: objeto para extender estilos
 * - ariaLabel: string (accesibilidad)
 *
 * Usage:
 * <BadgeBox count={cartCount} anchor top="8px" right="6px">
 *   <CartIcon />
 * </BadgeBox>
 *
 * <BadgeBox count={3} variant="count" />
 */

export default function BadgeBox({
  count = 0,
  max = 99,
  showZero = false,
  anchor = false,
  top = "6px",
  right = "6px",
  left,
  bottom,
  size = "md",
  variant = "count",
  sx = {},
  children,
  ariaLabel = "badge",
}) {
  const [bump, setBump] = useState(false);
  const normalizedCount =
    typeof count === "number" && count > max ? `${max}+` : count;

  // trigger bump animation on count change
  useEffect(() => {
    if (variant === "dot") return;
    // don't animate if hidden by showZero
    if (!showZero && Number(count) === 0) return;

    setBump(true);
    const t = setTimeout(() => setBump(false), 260);
    return () => clearTimeout(t);
  }, [count, max, showZero, variant]);

  // hide if zero and showZero === false
  if (!showZero && (count === 0 || count === "0")) {
    // still render children if provided (e.g. icon), without badge
    return children ? <>{children}</> : null;
  }

  // size mapping
  const sizes = {
    sm: { px: "6px", py: "2px", minWidth: 18, fontSize: "0.65rem", height: 18 },
    md: { px: "8px", py: "3px", minWidth: 22, fontSize: "0.75rem", height: 22 },
    lg: {
      px: "10px",
      py: "4px",
      minWidth: 28,
      fontSize: "0.85rem",
      height: 28,
    },
  };

  const currentSize = sizes[size] || sizes.md;

  const baseBadge = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 999,
    fontWeight: 700,
    color: "#fff",
    background: "linear-gradient(135deg, #ff69b4, #d82e7a)",
    boxShadow: "0 6px 18px rgba(216,46,136,0.18)",
    transformOrigin: "center",
    transition: "transform 160ms ease",
    ...currentSize,
  };

  const anchorStyles = anchor
    ? {
        position: "absolute",
        top: top,
        right: right,
        left: left,
        bottom: bottom,
        transform: "translate(0, 0)",
        // ensure it's above other elements
        zIndex: 1400,
      }
    : {
        position: "relative",
      };

  // Dot variant (small circle)
  if (variant === "dot") {
    const dotSize = size === "sm" ? 8 : size === "lg" ? 12 : 10;
    const dotStyle = {
      width: dotSize,
      height: dotSize,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #ff69b4, #d82e7a)",
      boxShadow: "0 6px 12px rgba(216,46,136,0.12)",
      border: "2px solid rgba(255,255,255,0.6)",
      ...anchorStyles,
    };

    return (
      <Box sx={{ display: "inline-flex", position: "relative" }}>
        {children}
        <Box
          aria-hidden={false}
          aria-label={ariaLabel}
          role='status'
          sx={{ ...dotStyle, ...sx }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "inline-flex", position: "relative" }}>
      {children}
      <Box
        aria-live='polite'
        aria-atomic='true'
        aria-label={ariaLabel}
        role='status'
        sx={{
          ...baseBadge,
          ...(bump ? { transform: "scale(1.15)" } : {}),
          ...(anchor ? anchorStyles : { ml: 1, verticalAlign: "middle" }),
          // ensure the text is centered and doesn't overflow
          whiteSpace: "nowrap",
          paddingLeft: currentSize.px,
          paddingRight: currentSize.px,
          minWidth: currentSize.minWidth,
          height: currentSize.height,
          fontSize: currentSize.fontSize,
          ...sx,
        }}
      >
        <Typography component='span' sx={{ fontWeight: 800 }}>
          {normalizedCount}
        </Typography>
      </Box>
    </Box>
  );
}
