import {loadFont as loadJakarta} from "@remotion/google-fonts/PlusJakartaSans";
import {loadFont as loadInter} from "@remotion/google-fonts/Inter";

export const jakarta = loadJakarta("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
}).fontFamily;

export const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
}).fontFamily;
