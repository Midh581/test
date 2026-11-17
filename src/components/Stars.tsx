import React from "react";
import {C} from "../theme";

const POINTS =
  "12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26";

type Props = {
  size: number;
  /** 0..1 portion of the star that is filled */
  fill?: number;
  /** unique id, needed for the partial-fill gradient */
  id: string;
  color?: string;
};

export const StarIcon: React.FC<Props> = ({size, fill = 1, id, color = C.gold}) => {
  const f = Math.max(0, Math.min(1, fill));
  const gid = `star-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{display: "block"}}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset={`${f * 100}%`} stopColor={color} />
          <stop offset={`${f * 100}%`} stopColor="rgba(148,163,184,0.25)" />
        </linearGradient>
      </defs>
      <polygon
        points={POINTS}
        fill={`url(#${gid})`}
        stroke={f >= 1 ? color : "none"}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
};
