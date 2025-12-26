import type { Difficulty, Grade, Question } from '../types.js';
import { getNumberRangeForGrade } from '../rules/gradeRules.js';
import { getDifficultyModifiers } from '../rules/difficultyRules.js';
import type { RNG } from '../utils/random.js';

export function generateAddQuestion(opts: { grade: Grade; difficulty: Difficulty; rng: RNG }): Question {
    const { grade, difficulty, rng } = opts;
    const range = getNumberRangeForGrade(grade);
    const modifiers = getDifficultyModifiers(difficulty);

    // scale the max by difficulty modifiers
    const maxVal = Math.max(range.min, Math.floor(range.max * modifiers.scale));

    let a = rng.randInt(range.min, Math.max(range.min, maxVal));
    let b = rng.randInt(range.min, Math.max(range.min, maxVal));

    if (!modifiers.allowCarry) {
        // ensure no carry in ones place
        while (((a % 10) + (b % 10)) >= 10) {
            b = rng.randInt(range.min, Math.max(range.min, maxVal));
        }
    }

    const text = `${a} + ${b} = ?`;
    const answer = a + b;

    return {
        text,
        answer,
        operation: 'add',
        operands: [a, b],
        grade,
        difficulty,
    };
}

