import React from "react";
import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {C, CLAMP, EASE_OUT} from "../theme";

type Props = {
  x: number;
  y: number;
  /** frame (of the current Sequence) when the finger starts moving in. The press lands at at + 10. */
  at: number;
};

export const TapIndicator: React.FC<Props> = ({x, y, at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame - at;
  if (t < -2 || t > 48) return null;

  const arrive = spring({
    frame: t,
    fps,
    config: {damping: 18, stiffness: 140, mass: 0.8},
  });
  const press = interpolate(t, [8, 12, 24], [0, 1, 0], CLAMP);
  const fade =
    interpolate(t, [0, 6], [0, 1], CLAMP) * interpolate(t, [32, 46], [1, 0], CLAMP);
  const ring = interpolate(t, [10, 36], [0, 1], {...CLAMP, easing: EASE_OUT});

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - 60,
          top: y - 60,
          width: 120,
          height: 120,
          borderRadius: 60,
          border: `3px solid ${C.emerald}`,
          transform: `scale(${0.35 + ring * 1.4})`,
          opacity: t >= 10 ? (1 - ring) * 0.85 : 0,
          zIndex: 20,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x - 34,
          top: y - 34,
          width: 68,
          height: 68,
          borderRadius: 34,
          background: "rgba(248,250,252,0.30)",
          border: "2px solid rgba(248,250,252,0.75)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
          transform: `translate(${(1 - arrive) * 64}px, ${(1 - arrive) * 96}px) scale(${
            1 - press * 0.2
          })`,
          opacity: fade,
          zIndex: 21,
        }}
      />
    </>
  );
};
