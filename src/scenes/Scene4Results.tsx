import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {getLength, getPointAtLength, evolvePath} from "@remotion/paths";
import {StarIcon} from "../components/Stars";
import {inter, jakarta} from "../fonts";
import {C, CLAMP, EASE_IN_OUT, TRACK, useEnter} from "../theme";

const CURVE =
  "M 6 292 C 90 290, 150 278, 215 252 C 290 222, 330 188, 410 162 C 500 132, 560 152, 630 98 C 690 54, 760 38, 834 18";
const CURVE_LEN = getLength(CURVE);
const CHART_W = 840;
const CHART_H = 330;

const RATING_FROM = 4.1;
const RATING_TO = 4.9;
const REVIEWS_FROM = 19;
const REVIEWS_TO = 248;

/** Local frame 0 = global 660. Metric card: 0-128. Lockup: 120-240 (global 780-900). */
export const Scene4Results: React.FC = () => {
  return (
    <AbsoluteFill>
      <MetricCard />
      <Lockup />
    </AbsoluteFill>
  );
};

const MetricCard: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = Math.min(useEnter(6), 1);
  const exit = interpolate(frame, [104, 128], [0, 1], {...CLAMP, easing: EASE_IN_OUT});

  if (frame > 130) return null;

  const p = interpolate(frame, [24, 100], [0, 1], {...CLAMP, easing: EASE_IN_OUT});
  const rating = RATING_FROM + (RATING_TO - RATING_FROM) * p;
  const reviews = Math.round(REVIEWS_FROM + (REVIEWS_TO - REVIEWS_FROM) * p);

  const ev = evolvePath(p, CURVE);
  const tip = getPointAtLength(CURVE, CURVE_LEN * p);
  const glow = interpolate(frame, [92, 108], [0, 1], CLAMP);

  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
      <div
        style={{
          width: 920,
          boxSizing: "border-box",
          padding: 44,
          borderRadius: 52,
          background: "linear-gradient(180deg,#14181E,#0F1318)",
          border: `1px solid ${C.hairline}`,
          boxShadow:
            "0 70px 150px -50px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
          opacity: enter * (1 - exit),
          transform: `translateY(${(1 - enter) * 150 - exit * 190}px) scale(${
            (0.96 + 0.04 * enter) * (1 - exit * 0.08)
          })`,
        }}
      >
        {/* header */}
        <div style={{display: "flex", alignItems: "center", gap: 22, marginBottom: 34}}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              background: "linear-gradient(135deg,#1E293B,#0F172A)",
              border: `1px solid ${C.hairline}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: jakarta,
              fontWeight: 800,
              fontSize: 38,
              color: C.fg,
            }}
          >
            P
          </div>
          <div>
            <div
              style={{
                fontFamily: jakarta,
                fontWeight: 700,
                fontSize: 44,
                letterSpacing: TRACK,
                color: C.fg,
              }}
            >
              Palm Bistro
            </div>
            <div style={{fontFamily: inter, fontWeight: 500, fontSize: 26, color: C.slate}}>
              Google Business Profile
            </div>
          </div>
        </div>

        {/* split metrics */}
        <div style={{display: "flex", gap: 20}}>
          <div style={boxStyle(glow)}>
            <div style={labelStyle}>Rating</div>
            <div style={valueStyle}>{rating.toFixed(1)}</div>
            <div style={{display: "flex", gap: 6, marginTop: 18}}>
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} id={`s4-${i}`} size={42} fill={rating - i} />
              ))}
            </div>
          </div>
          <div style={boxStyle(glow)}>
            <div style={labelStyle}>Reviews</div>
            <div style={valueStyle}>{reviews}</div>
            <div
              style={{
                alignSelf: "flex-start",
                marginTop: 22,
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(16,185,129,0.14)",
                border: "1px solid rgba(16,185,129,0.5)",
                fontFamily: inter,
                fontWeight: 600,
                fontSize: 26,
                color: C.emerald,
              }}
            >
              +{reviews - REVIEWS_FROM}
            </div>
          </div>
        </div>

        {/* growth curve */}
        <div style={{marginTop: 34}}>
          <svg
            width="100%"
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            style={{display: "block", overflow: "visible"}}
          >
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.emerald} stopOpacity={0.3} />
                <stop offset="100%" stopColor={C.emerald} stopOpacity={0} />
              </linearGradient>
              <clipPath id="reveal">
                <rect x={0} y={-20} width={Math.max(tip.x + 4, 0)} height={CHART_H + 40} />
              </clipPath>
            </defs>
            {[80, 170, 260].map((y) => (
              <line
                key={y}
                x1={0}
                x2={CHART_W}
                y1={y}
                y2={y}
                stroke="rgba(148,163,184,0.14)"
                strokeDasharray="4 8"
              />
            ))}
            <path
              d={`${CURVE} L 834 ${CHART_H} L 6 ${CHART_H} Z`}
              fill="url(#area)"
              clipPath="url(#reveal)"
            />
            <path
              d={CURVE}
              fill="none"
              stroke={C.emerald}
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={ev.strokeDasharray}
              strokeDashoffset={ev.strokeDashoffset}
            />
            {p > 0.01 ? (
              <>
                <circle cx={tip.x} cy={tip.y} r={22} fill="rgba(16,185,129,0.25)" />
                <circle cx={tip.x} cy={tip.y} r={10} fill={C.fg} />
              </>
            ) : null}
          </svg>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 14,
              fontFamily: inter,
              fontWeight: 500,
              fontSize: 24,
              color: C.slate,
            }}
          >
            <span>Before Revify</span>
            <span>With Revify</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const labelStyle: React.CSSProperties = {
  fontFamily: inter,
  fontWeight: 600,
  fontSize: 26,
  color: C.slate,
  marginBottom: 6,
};

const valueStyle: React.CSSProperties = {
  fontFamily: jakarta,
  fontWeight: 800,
  fontSize: 148,
  lineHeight: 1.05,
  letterSpacing: TRACK,
  color: C.fg,
  fontVariantNumeric: "tabular-nums",
};

const boxStyle = (glow: number): React.CSSProperties => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "28px 30px 32px",
  borderRadius: 34,
  background: "rgba(255,255,255,0.025)",
  border: `1.5px solid rgba(16,185,129,${0.12 + glow * 0.5})`,
  boxShadow: `0 0 ${50 * glow}px -14px rgba(16,185,129,0.5)`,
});

const Lockup: React.FC = () => {
  const frame = useCurrentFrame();
  const f = frame - 120; // local to the lockup (starts at global 780)

  const mark = Math.min(useEnter(120), 1);
  const word = Math.min(useEnter(128), 1);
  const tag = Math.min(useEnter(140), 1);
  const pill = Math.min(useEnter(154), 1);
  const glow = interpolate(f, [0, 40], [0, 1], {...CLAMP, easing: EASE_IN_OUT});
  const pulse = 0.55 + 0.45 * Math.sin(f / 9);

  if (frame < 118) return null;

  return (
    <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: 450,
          background:
            "radial-gradient(circle, rgba(16,185,129,0.20), rgba(16,185,129,0.04) 50%, transparent 70%)",
          opacity: glow,
        }}
      />
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div
          style={{
            width: 176,
            height: 176,
            borderRadius: 52,
            background: "linear-gradient(145deg,#34D399,#10B981 55%,#059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 40px 100px -30px rgba(16,185,129,0.7), inset 0 2px 0 rgba(255,255,255,0.4)",
            opacity: mark,
            transform: `translateY(${(1 - mark) * 60}px) scale(${0.85 + 0.15 * mark})`,
          }}
        >
          <svg width="96" height="96" viewBox="0 0 24 24">
            <polygon
              points="12,3 14.6,9.4 21,12 14.6,14.6 12,21 9.4,14.6 3,12 9.4,9.4"
              fill="#04130D"
              stroke="#04130D"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            marginTop: 44,
            fontFamily: jakarta,
            fontWeight: 800,
            fontSize: 196,
            lineHeight: 1,
            letterSpacing: "-0.045em",
            color: C.fg,
            opacity: word,
            transform: `translateY(${(1 - word) * 60}px)`,
          }}
        >
          Revify
        </div>

        <div
          style={{
            marginTop: 30,
            width: 760,
            textAlign: "center",
            fontFamily: inter,
            fontWeight: 500,
            fontSize: 52,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: C.slate,
            opacity: tag,
            transform: `translateY(${(1 - tag) * 40}px)`,
          }}
        >
          5-star Google reviews in 10 seconds.
        </div>

        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 40px",
            borderRadius: 999,
            background: "rgba(16,185,129,0.12)",
            border: "1.5px solid rgba(16,185,129,0.6)",
            fontFamily: inter,
            fontWeight: 600,
            fontSize: 44,
            color: C.fg,
            opacity: pill,
            transform: `translateY(${(1 - pill) * 30}px) scale(${0.94 + 0.06 * pill})`,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: C.emerald,
              boxShadow: `0 0 ${22 * pulse}px rgba(16,185,129,${pulse})`,
            }}
          />
          revify.ae
        </div>
      </div>
    </AbsoluteFill>
  );
};
