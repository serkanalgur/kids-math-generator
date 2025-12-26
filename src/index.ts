import type { Grade, Difficulty, Operation, Question } from './types.js';
import { makeRng } from './utils/random.js';
import { generateAddQuestion } from './generators/add.js';
import { generateSubQuestion } from './generators/sub.js';
import { generateMulQuestion } from './generators/mul.js';
import { generateDivQuestion } from './generators/div.js';
import { generateMixedQuestion } from './generators/mixed.js';
import { makeMissingOperandQuestion } from './generators/missing.js';
import { getDifficultyModifiers } from './rules/difficultyRules.js';

export function generateQuestion(options: { grade: Grade; operation?: Operation; difficulty?: Difficulty; seed?: number }): Question {
    const { grade, operation, difficulty = 'easy', seed } = options;
    const rng = makeRng(seed);
    const modifiers = getDifficultyModifiers(difficulty);

    // If operation is not specified, pick one. If mixed questions are allowed for the grade/difficulty,
    // sometimes produce a mixed question.
    let op: Operation;
    if (operation) {
        op = operation;
    } else {
        if (grade >= 5 && modifiers.allowMixed && rng.rand() < 0.25) {
            op = 'mixed';
        } else {
            op = (['add', 'sub', 'mul', 'div'] as Operation[])[Math.floor(rng.rand() * 4)];
        }
    }

    let q: Question;
    switch (op) {
        case 'add':
            q = generateAddQuestion({ grade, difficulty, rng });
            break;
        case 'sub':
            q = generateSubQuestion({ grade, difficulty, rng });
            break;
        case 'mul':
            q = generateMulQuestion({ grade, difficulty, rng });
            break;
        case 'div':
            q = generateDivQuestion({ grade, difficulty, rng });
            break;
        case 'mixed':
            q = generateMixedQuestion({ grade, difficulty, rng });
            break;
        default:
            throw new Error('Unsupported operation');
    }

    // Optionally transform into a missing-operand reverse question for higher grades/difficulties
    if (grade >= 6 && modifiers.allowMissingOperand && rng.randInt(1, 100) <= 20) {
        q = makeMissingOperandQuestion(q, rng);
    }

    return q;
}

// Convenience exports for advanced usage
export { makeMissingOperandQuestion } from './generators/missing.js';
export { makeRng } from './utils/random.js';

export type { Grade, Difficulty, Operation, Question };

