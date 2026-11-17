import React from "react";
import {
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {StarIcon} from "../components/Stars";
import {TapIndicator} from "../components/TapIndicator";
import {inter} from "../fonts";
import {C, CLAMP, SPRING, SPRING_POP} from "../theme";

const REVIEW =
  "Hands down the best experience I've had in Dubai. Super fast service, welcoming staff, and spotless attention to detail. Will definitely be back!";

const TYPE_START = 26;
const TYPE_END = 140;
const STAR_START = 150;
const STAR_STEP = 7;
const BTN_IN = 164;
const BTN_TAP_AT = 186; // press lands at +10

const CARD = {left: 48, top: 706, w: 696};
const STARS_TOP = 1172;
const BTN = {left: 48, top: 1330, w: 696, h: 124};

/** Rendered inside the phone screen (792x1612 coordinate space). Local frame 0 = global frame 420. */
export const Scene3Generate: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardIn = Math.min(spring({frame, fps, config: SPRING}), 1);

  const count = Math.floor(
    interpolate(frame, [TYPE_START, TYPE_END], [0, REVIEW.length], CLAMP)
  );
  const typed = REVIEW.slice(0, count);
  const rest = REVIEW.slice(count);
  const typing = count > 0 && count < REVIEW.length;
  const done = count >= REVIEW.length;

  // sweeping gradient border
  const angle = (frame * 4.5) % 360;

  const dots = ".".repeat(1 + (Math.floor(frame / 12) % 3));

  const btnIn = Math.min(spring({frame: frame - BTN_IN, fps, config: SPRING}), 1);
  const pressP = interpolate(frame, [BTN_TAP_AT + 8, BTN_TAP_AT + 12, BTN_TAP_AT + 26], [0, 1, 0], CLAMP);
  const btnBg = interpolateColors(pressP, [0, 1], [C.emerald, "#0BA572"]);

  return (
    <>
      {/* AI generation card */}
      <div
        style={{
          position: "absolute",
          left: CARD.left,
          top: CARD.top,
          width: CARD.w,
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 70}px) scale(${0.97 + 0.03 * cardIn})`,
        }}
      >
        <div
          style={{
            padding: 3,
            borderRadius: 40,
            background: `conic-gradient(from ${angle}deg at 50% 50%, rgba(16,185,129,0.10) 0deg, rgba(16,185,129,0.95) 55deg, rgba(248,250,252,0.95) 85deg, rgba(16,185,129,0.10) 140deg, rgba(16,185,129,0.10) 360deg)`,
            boxShadow: "0 30px 80px -30px rgba(16,185,129,0.35)",
          }}
        >
          <div
            style={{
              borderRadius: 37,
              background: "#0E1217",
              padding: "32px 34px 38px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: inter,
                fontWeight: 600,
                fontSize: 26,
                color: C.slate,
                marginBottom: 22,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24">
                <polygon
                  points="12,2 14.6,9.4 22,12 14.6,14.6 12,22 9.4,14.6 2,12 9.4,9.4"
                  fill={C.emerald}
                />
              </svg>
              {done ? "Review ready" : `Writing your review${dots}`}
            </div>

            <div
              style={{
                fontFamily: inter,
                fontWeight: 500,
                fontSize: 34,
                lineHeight: 1.5,
                color: C.fg,
                letterSpacing: "-0.01em",
              }}
            >
              <span>{typed}</span>
              {typing ? (
                <span
                  style={{
                    display: "inline-block",
                    width: 0,
                    height: "1.05em",
                    verticalAlign: "text-bottom",
                    boxShadow: `0 0 0 1.5px ${C.emerald}`,
                  }}
                />
              ) : null}
              {/* remaining text reserves layout so the card never reflows */}
              <span style={{color: "transparent"}}>{rest}</span>
            </div>
          </div>
        </div>
      </div>

      {/* five gold stars, sequential spring pop */}
      <div
        style={{
          position: "absolute",
          left: CARD.left,
          top: STARS_TOP,
          width: CARD.w,
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const p = spring({
            frame: frame - (STAR_START + i * STAR_STEP),
            fps,
            config: SPRING_POP,
          });
          return (
            <div
              key={i}
              style={{
                transform: `scale(${p}) rotate(${(1 - Math.min(p, 1)) * -28}deg)`,
                opacity: Math.min(p * 2, 1),
                filter: `drop-shadow(0 0 ${14 * Math.min(p, 1)}px rgba(251,188,4,0.45))`,
              }}
            >
              <StarIcon id={`s3-${i}`} size={80} />
            </div>
          );
        })}
      </div>

      {/* primary action */}
      <div
        style={{
          position: "absolute",
          left: BTN.left,
          top: BTN.top,
          width: BTN.w,
          height: BTN.h,
          borderRadius: 38,
          background: btnBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: inter,
          fontWeight: 700,
          fontSize: 38,
          letterSpacing: "-0.01em",
          color: "#04130D",
          opacity: btnIn,
          transform: `translateY(${(1 - btnIn) * 50}px) scale(${1 - pressP * 0.045})`,
          boxShadow: `0 ${24 - pressP * 14}px ${64 - pressP * 30}px -22px rgba(16,185,129,0.7), inset 0 1px 0 rgba(255,255,255,0.35)`,
        }}
      >
        Post to Google →
      </div>

      <TapIndicator x={BTN.left + BTN.w * 0.72} y={BTN.top + BTN.h / 2} at={BTN_TAP_AT} />
    </>
  );
};
