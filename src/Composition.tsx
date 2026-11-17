import React from "react";
import {AbsoluteFill, Sequence} from "remotion";
import {Background} from "./components/Background";
import {Scene1Hook} from "./scenes/Scene1Hook";
import {Scene2TapSelect} from "./scenes/Scene2TapSelect";
import {Scene3Generate} from "./scenes/Scene3Generate";
import {Scene4Results} from "./scenes/Scene4Results";
import {C} from "./theme";

/**
 * 60fps timeline (900 frames)
 *   0-180   Scene 1  kinetic hook
 *   180-420 Scene 2  tap + tag selection   (phone flow starts at 180)
 *   420-660 Scene 3  AI review generation  (same phone, nested)
 *   660-900 Scene 4  rating surge, lockup from 780
 * The phone flow runs to 680 so its exit overlaps Scene 4's entrance.
 */
export const RevifyPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <Background />

      <Sequence from={0} durationInFrames={180} name="Scene 1 - Hook">
        <Scene1Hook />
      </Sequence>

      <Sequence from={180} durationInFrames={500} name="Scene 2-3 - Phone">
        <Scene2TapSelect>
          <Sequence from={240} layout="none" name="Scene 3 - AI Review">
            <Scene3Generate />
          </Sequence>
        </Scene2TapSelect>
      </Sequence>

      <Sequence from={660} durationInFrames={240} name="Scene 4 - Results">
        <Scene4Results />
      </Sequence>
    </AbsoluteFill>
  );
};
