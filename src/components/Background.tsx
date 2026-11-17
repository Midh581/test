import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {C} from "../theme";

const GRID_MASK =
  "radial-gradient(ellipse 85% 60% at 50% 32%, black 15%, transparent 78%)";

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 150) * 46;

  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {/* faint radial spotlight, drifting slowly */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(980px 980px at ${540 + drift}px 420px, rgba(248,250,252,0.085), rgba(16,185,129,0.035) 42%, transparent 72%)`,
        }}
      />
      {/* 40px grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.075) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage: GRID_MASK,
          maskImage: GRID_MASK,
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      {/* static grain: dithers gradients so H.264 doesn't band */}
      <AbsoluteFill
        style={{backgroundImage: GRAIN, opacity: 0.045, mixBlendMode: "overlay"}}
      />
    </AbsoluteFill>
  );
};
