import kaboom from 'kaboom';
import { scale } from './constants';

const kaboomOptions = {
  width: 960 * scale,
  height: 960 * scale,
  scale,
  // letterbox: true,
  global: false, // Prevents kaboom from importing all functions to the global scope
};

export const k = kaboom(kaboomOptions);
