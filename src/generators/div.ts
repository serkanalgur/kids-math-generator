import type { Difficulty, Grade, Question } from '../types.js';
import { getNumberRangeForGrade } from '../rules/gradeRules.js';
import { getDifficultyModifiers } from '../rules/difficultyRules.js';
import type { RNG } from '../utils/random.js';

export function generateDivQuestion(opts: { grade: Grade; difficulty: Difficulty; rng: RNG }): Question {
    const { grade, difficulty, rng } = opts;
    const range = getNumberRangeForGrade(grade);
    const modifiers = getDifficultyModifiers(difficulty);

    // For grade 3, pick multiplication table reverses (no remainder)
    if (grade === 3) {
        const b = rng.randInt(1, 10);
        const answer = rng.randInt(1, 10);
        const a = b * answer;
        return {
            text: `${a} ÷ ${b} = ?`,
            answer,
            operation: 'div',
            operands: [a, b],
            grade,
            difficulty,
        };
    }

    const maxDivisor = Math.max(1, Math.floor(range.max * modifiers.scale * 0.01));
    const divisor = rng.randInt(1, maxDivisor);

    let quotient = rng.randInt(0, Math.max(0, Math.floor(range.max * modifiers.scale * 0.01)));
    let dividend = divisor * quotient;

    if (modifiers.allowRemainder) {
        // add a remainder smaller than divisor
        dividend += rng.randInt(0, Math.max(0, divisor - 1));
    }

    return {
        text: `${dividend} ÷ ${divisor} = ?`,
        answer: Math.floor(dividend / divisor),
        operation: 'div',
        operands: [dividend, divisor],
        grade,
        difficulty,
    };
}
