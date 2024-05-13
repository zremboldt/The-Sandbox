import kaboom from "kaboom";
import { scale } from "./constants";

const kaboomOptions = {
  width: 256 * scale,
  height: 144 * scale,
  scale,
  letterbox: true,
  global: false,
}

export const k = kaboom(kaboomOptions);

