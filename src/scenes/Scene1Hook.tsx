import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {MaskedLine} from "../components/MaskedLine";
import {C, CLAMP, EASE_IN_OUT} from "../theme";

const SIZE = 116;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // accent line draws after the second statement has landed
  const draw = interpolate(frame, [104, 140], [0, 1], {...CLAMP, easing: EASE_IN_OUT});
  // upward slide + scale-down exit
  const exit = interpolate(frame, [148, 178], [0, 1], {...CLAMP, easing: EASE_IN_OUT});

  return (
    <AbsoluteFill style={{justifyContent: "center", paddingLeft: 90, paddingRight: 90}}>
      <div
        style={{
          width: "fit-content",
          transformOrigin: "0% 50%",
          transform: `translateY(${-exit * 280}px) scale(${1 - exit * 0.14})`,
          opacity: 1 - exit,
        }}
      >
        <MaskedLine delay={10} fontSize={SIZE} color={C.slate}>
          Great service.
        </MaskedLine>
        <div style={{height: 36}} />
        {/* second statement starts 0.6s (36 frames) after the first */}
        <MaskedLine delay={46} fontSize={SIZE} color={C.fg}>
          Zero Google
        </MaskedLine>
        <MaskedLine delay={54} fontSize={SIZE} color={C.fg}>
          reviews.
        </MaskedLine>
        <div style={{height: 48}} />
        <div
          style={{
            height: 6,
            width: "100%",
            borderRadius: 3,
            background: C.emerald,
            transformOrigin: "0% 50%",
            transform: `scaleX(${draw})`,
            boxShadow: "0 0 28px rgba(16,185,129,0.6)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
