import type { Difficulty, Grade, Question } from '../types.js';
import { getNumberRangeForGrade } from '../rules/gradeRules.js';
import { getDifficultyModifiers } from '../rules/difficultyRules.js';
import type { RNG } from '../utils/random.js';

export function generateMixedQuestion(opts: { grade: Grade; difficulty: Difficulty; rng: RNG }): Question {
    const { grade, difficulty, rng } = opts;
    const range = getNumberRangeForGrade(grade);
    const modifiers = getDifficultyModifiers(difficulty);

    const max = Math.max(1, Math.floor(range.max * modifiers.scale));

    // Choose a pattern suitable for the grade/difficulty
    // Patterns:
    // 0: (a × b) - c
    // 1: (a × b) + c
    // 2: (a + b) × c
    // 3: (a - b) × c (ensure a-b >=0)
    const pattern = rng.randInt(0, 3);

    // Choose numbers with reasonable sizes
    const a = rng.randInt(1, Math.max(1, Math.floor(Math.sqrt(max))));
    const b = rng.randInt(1, Math.max(1, Math.floor(Math.sqrt(max))));
    const c = rng.randInt(1, Math.max(1, Math.floor(Math.sqrt(max))));

    let text = '';
    let answer = 0;
    switch (pattern) {
        case 0:
            // (a × b) - c
            answer = a * b - c;
            text = `(${a} × ${b}) - ${c} = ?`;
            break;
        case 1:
            // (a × b) + c
            answer = a * b + c;
            text = `(${a} × ${b}) + ${c} = ?`;
            break;
        case 2:
            // (a + b) × c
            answer = (a + b) * c;
            text = `(${a} + ${b}) × ${c} = ?`;
            break;
        case 3:
        default:
            // (a - b) × c ensure non-negative
            const aa = Math.max(a, b);
            const bb = Math.min(a, b);
            answer = (aa - bb) * c;
            text = `(${aa} - ${bb}) × ${c} = ?`;
            break;
    }

    return {
        text,
        answer,
        operation: 'mixed',
        operands: [a, b, c],
        grade,
        difficulty,
    };
}
