import React from "react";
import {
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {inter, jakarta} from "../fonts";
import {C, CLAMP, SPRING, SPRING_SOFT, TRACK} from "../theme";
import {MaskedLine} from "./MaskedLine";
import {SCREEN_W} from "./PhoneFrame";

const BADGE_START = 148;
const BADGE_END = 68;

/** Contactless waves icon */
const NfcIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M16 15c3.6 5.6 3.6 12.4 0 18" stroke={C.emerald} strokeWidth="3.4" strokeLinecap="round" />
    <path d="M23 11c5.6 8.4 5.6 18.6 0 27" stroke={C.emerald} strokeWidth="3.4" strokeLinecap="round" />
    <path d="M30 7c7.6 11.4 7.6 22.6 0 34" stroke={C.emerald} strokeWidth="3.4" strokeLinecap="round" />
  </svg>
);

/** Revify glyph (white spark on emerald) */
const Glyph: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <polygon
      points="12,3 14.6,9.4 21,12 14.6,14.6 12,21 9.4,14.6 3,12 9.4,9.4"
      fill="#04130D"
      strokeLinejoin="round"
      stroke="#04130D"
      strokeWidth="1.2"
    />
  </svg>
);

export const NfcMorphHeader: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const appear = spring({frame: frame - 28, fps, config: SPRING});
  const morph = Math.min(spring({frame: frame - 92, fps, config: SPRING_SOFT}), 1);

  const size = interpolate(morph, [0, 1], [BADGE_START, BADGE_END]);
  const left = interpolate(morph, [0, 1], [(SCREEN_W - BADGE_START) / 2, 48]);
  const top = interpolate(morph, [0, 1], [132, 112]);
  const radius = interpolate(morph, [0, 1], [BADGE_START / 2, 22]);

  const nfcOpacity = 1 - interpolate(morph, [0, 0.5], [0, 1], CLAMP);
  const logoOpacity = interpolate(morph, [0.45, 1], [0, 1], CLAMP);
  const bg = interpolateColors(morph, [0, 1], ["rgba(16,185,129,0.14)", "rgba(16,185,129,1)"]);
  const border = interpolateColors(morph, [0, 1], ["rgba(16,185,129,0.8)", "rgba(16,185,129,0)"]);

  // three pulse rings, looping until the morph begins
  const rings = [0, 1, 2].map((i) => {
    const t = (((frame - 36 + i * 18) % 54) + 54) % 54 / 54;
    const on = frame >= 36 ? 1 : 0;
    return {
      scale: 1 + t * 1.15,
      opacity: (1 - t) * 0.5 * on * (1 - morph) * Math.min(appear, 1),
    };
  });

  const labelOpacity = Math.min(appear, 1) * (1 - interpolate(morph, [0, 0.35], [0, 1], CLAMP));
  const wordP = interpolate(morph, [0.35, 1], [0, 1], CLAMP);

  return (
    <>
      {/* pulse rings */}
      {rings.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            top,
            width: size,
            height: size,
            borderRadius: radius,
            border: `2px solid ${C.emerald}`,
            transform: `scale(${r.scale})`,
            opacity: r.opacity,
          }}
        />
      ))}

      {/* badge -> logo mark */}
      <div
        style={{
          position: "absolute",
          left,
          top,
          width: size,
          height: size,
          borderRadius: radius,
          background: bg,
          border: `2px solid ${border}`,
          boxSizing: "border-box",
          transform: `scale(${0.6 + 0.4 * Math.min(appear, 1)})`,
          opacity: Math.min(appear, 1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${50 * (1 - morph)}px rgba(16,185,129,0.35)`,
        }}
      >
        <div style={{position: "absolute", opacity: nfcOpacity}}>
          <NfcIcon size={size * 0.46} />
        </div>
        <div style={{position: "absolute", opacity: logoOpacity}}>
          <Glyph size={size * 0.56} />
        </div>
      </div>

      {/* helper label under the badge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: SCREEN_W,
          top: 330,
          textAlign: "center",
          fontFamily: inter,
          fontWeight: 500,
          fontSize: 30,
          color: C.slate,
          opacity: labelOpacity,
        }}
      >
        Tap or scan to start
      </div>

      {/* wordmark */}
      <div
        style={{
          position: "absolute",
          left: 132,
          top: 112,
          height: BADGE_END,
          display: "flex",
          alignItems: "center",
          fontFamily: jakarta,
          fontWeight: 700,
          fontSize: 40,
          letterSpacing: TRACK,
          color: C.fg,
          opacity: wordP,
          transform: `translateX(${(1 - wordP) * -14}px)`,
        }}
      >
        Revify
      </div>

      {/* title + subtitle */}
      <div style={{position: "absolute", left: 48, top: 228, width: SCREEN_W - 96}}>
        <MaskedLine delay={112} fontSize={64} color={C.fg}>
          How was your visit?
        </MaskedLine>
      </div>
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 322,
          fontFamily: inter,
          fontWeight: 500,
          fontSize: 30,
          color: C.slate,
          opacity: interpolate(frame, [128, 146], [0, 1], CLAMP),
          transform: `translateY(${interpolate(frame, [128, 146], [14, 0], CLAMP)}px)`,
        }}
      >
        Tap what stood out.
      </div>
    </>
  );
};
