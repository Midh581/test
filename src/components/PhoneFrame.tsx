import React from "react";
import {inter} from "../fonts";
import {C} from "../theme";

export const PHONE_W = 820;
export const PHONE_H = 1640;
export const SCREEN_W = 792;
export const SCREEN_H = 1612;

const sideButton = (
  side: "left" | "right",
  top: number,
  height: number
): React.CSSProperties => ({
  position: "absolute",
  [side]: -5,
  top,
  width: 6,
  height,
  borderRadius: 3,
  background: "linear-gradient(90deg,#252b34,#12161b)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
});

export const PhoneFrame: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <div style={{position: "relative", width: PHONE_W, height: PHONE_H}}>
      {/* hardware buttons */}
      <div style={sideButton("left", 250, 70)} />
      <div style={sideButton("left", 350, 118)} />
      <div style={sideButton("left", 490, 118)} />
      <div style={sideButton("right", 400, 170)} />

      {/* titanium body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 112,
          background:
            "linear-gradient(155deg,#222831 0%,#0E1115 38%,#171B21 70%,#0C0E12 100%)",
          boxShadow: [
            "inset 0 2px 0 rgba(255,255,255,0.30)",
            "inset 0 0 0 1.5px rgba(255,255,255,0.10)",
            "inset 0 -2px 0 rgba(255,255,255,0.06)",
            "0 0 0 1.5px #000",
            "0 90px 180px -50px rgba(0,0,0,0.85)",
            "0 0 120px -30px rgba(16,185,129,0.12)",
          ].join(", "),
        }}
      />

      {/* screen */}
      <div
        style={{
          position: "absolute",
          inset: 14,
          borderRadius: 98,
          overflow: "hidden",
          background: "linear-gradient(180deg,#0F1318,#0B0E12)",
          boxShadow: "0 0 0 2px #000, inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <div style={{position: "relative", width: SCREEN_W, height: SCREEN_H}}>
          {/* status bar */}
          <div
            style={{
              position: "absolute",
              left: 62,
              top: 30,
              fontFamily: inter,
              fontWeight: 600,
              fontSize: 28,
              color: C.fg,
            }}
          >
            9:41
          </div>
          <div
            style={{
              position: "absolute",
              right: 62,
              top: 36,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{display: "flex", alignItems: "flex-end", gap: 3}}>
              {[10, 15, 20, 25].map((h) => (
                <div
                  key={h}
                  style={{width: 5, height: h, borderRadius: 2, background: C.fg}}
                />
              ))}
            </div>
            <div
              style={{
                width: 46,
                height: 24,
                borderRadius: 7,
                border: "2px solid rgba(248,250,252,0.55)",
                padding: 2,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{width: "100%", height: "100%", borderRadius: 3, background: C.fg}}
              />
            </div>
          </div>

          {children}

          {/* home indicator */}
          <div
            style={{
              position: "absolute",
              left: (SCREEN_W - 260) / 2,
              bottom: 22,
              width: 260,
              height: 9,
              borderRadius: 5,
              background: "rgba(248,250,252,0.55)",
            }}
          />
        </div>

        {/* dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 22,
            left: (SCREEN_W - 190) / 2,
            width: 190,
            height: 54,
            borderRadius: 27,
            background: "#000",
            zIndex: 5,
          }}
        />

        {/* glass glare */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(118deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.02) 22%, transparent 38%)",
            zIndex: 6,
          }}
        />
      </div>
    </div>
  );
};
