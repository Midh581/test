import "./index.css";
import React from "react";
import {Composition} from "remotion";
import {RevifyPromo} from "./Composition";
import {FPS} from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="RevifyPromo"
      component={RevifyPromo}
      durationInFrames={900}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
