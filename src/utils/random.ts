import { createSeededPRNG } from './seed.js';

export type RNG = { rand: () => number; randInt: (min: number, max: number) => number };

export function makeRng(seed?: number): RNG {
    const base = createSeededPRNG(seed);
    return {
        rand: base,
        randInt(min: number, max: number) {
            if (min > max) throw new Error('min > max');
            return Math.floor(base() * (max - min + 1)) + min;
        },
    };
}
