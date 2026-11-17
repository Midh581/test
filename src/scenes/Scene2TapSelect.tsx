import React from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {ExperienceChips} from "../components/ExperienceChips";
import {NfcMorphHeader} from "../components/NfcMorphHeader";
import {PhoneFrame} from "../components/PhoneFrame";
import {CLAMP, EASE_IN_OUT, SPRING} from "../theme";

/**
 * Hosts the phone for both Scene 2 and Scene 3 so the device stays on screen
 * while the AI review card appears below the chips (passed in as children).
 * Local frame 0 = global frame 180.
 */
export const Scene2TapSelect: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = Math.min(spring({frame, fps, config: SPRING}), 1);
  const exit = interpolate(frame, [470, 500], [0, 1], {...CLAMP, easing: EASE_IN_OUT});
  const float = Math.sin(frame / 45) * 5 * (1 - exit);

  const y = (1 - enter) * 1300 - exit * 240 + float;
  const scale = (0.94 + 0.06 * enter) * (1 - exit * 0.1);
  const opacity = interpolate(frame, [0, 14], [0, 1], CLAMP) * (1 - exit);

  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
      <div style={{transform: `translateY(${y}px) scale(${scale})`, opacity}}>
        <PhoneFrame>
          <NfcMorphHeader />
          <ExperienceChips />
          {children}
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};
