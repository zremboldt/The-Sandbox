import kaboom from "kaboom";
import { scale } from "./constants";

const kaboomOptions = {
  width: 320 * scale,
  height: 320 * scale,
  scale,
  letterbox: true,
  global: false,
}

export const k = kaboom(kaboomOptions);

