import type { Difficulty } from '../types.js';

export interface DifficultyModifiers {
    scale: number; // 0..1 multiplier for max values
    allowCarry: boolean;
    allowRemainder: boolean;
    allowMissingOperand: boolean;
    allowMixed: boolean;
}

export function getDifficultyModifiers(difficulty: Difficulty): DifficultyModifiers {
    switch (difficulty) {
        case 'easy':
            return { scale: 0.2, allowCarry: false, allowRemainder: false, allowMissingOperand: false, allowMixed: false };
        case 'medium':
            return { scale: 0.5, allowCarry: true, allowRemainder: false, allowMissingOperand: false, allowMixed: false };
        case 'hard':
            return { scale: 0.85, allowCarry: true, allowRemainder: true, allowMissingOperand: true, allowMixed: true };
        case 'veryHard':
            return { scale: 1.0, allowCarry: true, allowRemainder: true, allowMissingOperand: true, allowMixed: true };
        default:
            return { scale: 0.5, allowCarry: true, allowRemainder: false, allowMissingOperand: false, allowMixed: false };
    }
}
