import React from "react";
import {jakarta} from "../fonts";
import {SPRING, TRACK, useEnter} from "../theme";

type Props = {
  children: React.ReactNode;
  delay: number;
  fontSize: number;
  color: string;
  weight?: number;
};

/** Text that rises out of an overflow mask. Delay is in frames of the current Sequence. */
export const MaskedLine: React.FC<Props> = ({
  children,
  delay,
  fontSize,
  color,
  weight = 800,
}) => {
  const p = Math.min(useEnter(delay, SPRING), 1);
  const padB = fontSize * 0.14;
  const padT = fontSize * 0.06;

  return (
    <div
      style={{
        overflow: "hidden",
        paddingBottom: padB,
        marginBottom: -padB,
        paddingTop: padT,
        marginTop: -padT,
      }}
    >
      <div
        style={{
          transform: `translateY(${(1 - p) * 118}%)`,
          fontFamily: jakarta,
          fontSize,
          fontWeight: weight,
          color,
          letterSpacing: TRACK,
          lineHeight: 1.04,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
    </div>
  );
};
