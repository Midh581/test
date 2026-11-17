import React from "react";
import {
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {inter} from "../fonts";
import {C, CLAMP, SPRING} from "../theme";
import {TapIndicator} from "./TapIndicator";

const LABELS = ["Fast Service", "Friendly Staff", "Spotless Place", "Great Value"];

const L = {left: 48, top: 410, w: 338, h: 120, gap: 20};

/** Frame (of the phone flow) at which the finger starts moving in. Selection lands at +10. */
const TAP_AT: Record<number, number> = {0: 168, 1: 192, 2: 216};

const cell = (i: number) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  return {
    x: L.left + col * (L.w + L.gap),
    y: L.top + row * (L.h + L.gap),
  };
};

export const ExperienceChips: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <>
      {LABELS.map((label, i) => {
        const {x, y} = cell(i);
        const enter = Math.min(spring({frame: frame - (134 + i * 6), fps, config: SPRING}), 1);
        const tapAt = TAP_AT[i];
        const sel =
          tapAt === undefined
            ? 0
            : Math.min(
                spring({
                  frame: frame - (tapAt + 10),
                  fps,
                  config: {damping: 18, stiffness: 160, mass: 0.7},
                }),
                1
              );
        const dip =
          tapAt === undefined
            ? 0
            : interpolate(frame, [tapAt + 8, tapAt + 12, tapAt + 24], [0, 1, 0], CLAMP);

        const border = interpolateColors(sel, [0, 1], ["rgba(148,163,184,0.24)", C.emerald]);
        const bg = interpolateColors(sel, [0, 1], ["rgba(255,255,255,0.035)", "rgba(16,185,129,0.11)"]);
        const textColor = interpolateColors(sel, [0, 1], ["#CBD5E1", C.fg]);

        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: L.w,
              height: L.h,
              boxSizing: "border-box",
              borderRadius: 32,
              border: `2px solid ${border}`,
              background: bg,
              display: "flex",
              alignItems: "center",
              paddingLeft: 26,
              fontFamily: inter,
              fontWeight: 600,
              fontSize: 29,
              color: textColor,
              opacity: enter,
              transform: `translateY(${(1 - enter) * 34}px) scale(${1 - dip * 0.04})`,
              boxShadow: sel > 0 ? `0 0 ${34 * sel}px -8px rgba(16,185,129,0.55)` : "none",
            }}
          >
            {label}
            <div
              style={{
                position: "absolute",
                right: 22,
                top: (L.h - 4 - 38) / 2,
                width: 38,
                height: 38,
                borderRadius: 19,
                background: C.emerald,
                transform: `scale(${sel})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  stroke="#04130D"
                  strokeWidth="3.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={24}
                  strokeDashoffset={24 * (1 - sel)}
                />
              </svg>
            </div>
          </div>
        );
      })}

      {[0, 1, 2].map((i) => {
        const {x, y} = cell(i);
        return <TapIndicator key={i} x={x + L.w * 0.7} y={y + L.h / 2} at={TAP_AT[i]} />;
      })}
    </>
  );
};
