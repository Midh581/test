import {Easing, spring, useCurrentFrame, useVideoConfig} from "remotion";

export const FPS = 60;

export const C = {
  bg: "#0B0D10",
  fg: "#F8FAFC",
  slate: "#94A3B8",
  emerald: "#10B981",
  gold: "#FBBC04",
  panel: "#12161B",
  hairline: "rgba(148,163,184,0.16)",
} as const;

export const TRACK = "-0.03em";

// Crisp, near-critically-damped springs (damping within 14-18).
export const SPRING = {damping: 16, stiffness: 120, mass: 0.9};
export const SPRING_SOFT = {damping: 18, stiffness: 110, mass: 0.9};
export const SPRING_POP = {damping: 14, stiffness: 170, mass: 0.8};

export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Spring progress (0 -> 1) that starts at `delay` frames of the current Sequence. */
export const useEnter = (delay = 0, config: typeof SPRING = SPRING) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config});
};
