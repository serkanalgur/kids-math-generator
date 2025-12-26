/**
 * A tiny seeded PRNG using a simple LCG. Returns a function that yields [0,1).
 * Not cryptographically secure but deterministic and dependency-free.
 */
export function createSeededPRNG(seed?: number): () => number {
    if (seed === undefined || seed === null) {
        return Math.random;
    }
    // Ensure a 32-bit unsigned seed
    let state = seed >>> 0;
    return function () {
        // LCG parameters (Numerical Recipes)
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 0x100000000; // 2^32
    };
}
