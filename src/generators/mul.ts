import type { Difficulty, Grade, Question } from '../types.js';
import { getNumberRangeForGrade } from '../rules/gradeRules.js';
import { getDifficultyModifiers } from '../rules/difficultyRules.js';
import type { RNG } from '../utils/random.js';

export function generateMulQuestion(opts: { grade: Grade; difficulty: Difficulty; rng: RNG }): Question {
    const { grade, difficulty, rng } = opts;
    const range = getNumberRangeForGrade(grade);
    const modifiers = getDifficultyModifiers(difficulty);

    // For grade 3, use 1-10 tables; for higher grades increase digits scaled by difficulty
    let a: number;
    let b: number;
    if (grade === 3) {
        a = rng.randInt(1, 10);
        b = rng.randInt(1, 10);
    } else if (grade === 4) {
        a = rng.randInt(10, 99);
        b = rng.randInt(2, 9);
    } else {
        const maxA = Math.max(1, Math.floor(range.max * modifiers.scale * 0.1));
        a = rng.randInt(1, Math.max(1, maxA));
        b = rng.randInt(1, Math.max(1, Math.floor(12 * modifiers.scale)));
    }

    const text = `${a} × ${b} = ?`;
    const answer = a * b;

    return {
        text,
        answer,
        operation: 'mul',
        operands: [a, b],
        grade,
        difficulty,
    };
}

