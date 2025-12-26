import type { Question } from '../types.js';
import type { RNG } from '../utils/random.js';

// Make a missing-operand (reverse) version of a question. It returns a new Question
// where one operand is hidden with `?` and the answer is the hidden operand's value.
export function makeMissingOperandQuestion(q: Question, rng: RNG): Question {
    // Only support textual replacement for typical forms.
    const op = q.operation;

    // Helper for binary operations (add, sub, mul, div)
    if (op === 'add' || op === 'sub' || op === 'mul' || op === 'div') {
        const [a, b] = q.operands;
        const hideFirst = rng.randInt(0, 1) === 0;

        let text = '';
        let answer = 0;
        const symbol = op === 'add' ? '+' : op === 'sub' ? '-' : op === 'mul' ? '×' : '÷';

        if (hideFirst) {
            // ? op b = result
            text = `? ${symbol} ${b} = ${q.answer}`;
            answer = a;
        } else {
            // a op ? = result
            text = `${a} ${symbol} ? = ${q.answer}`;
            answer = b;
        }

        return {
            ...q,
            text,
            answer,
        };
    }

    // For mixed expressions, try replacing one of the operand numbers in the textual expression
    const operandStrs = q.operands.map((n) => String(n));
    const idx = rng.randInt(0, Math.max(0, operandStrs.length - 1));
    const target = operandStrs[idx];

    // Replace first full-token occurrence of target in text with '?'
    // Use a regex with word boundaries to avoid partial matches
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + escaped + '\\b');

    let newText = q.text.replace(re, '?');

    // If replacement didn't change text (unlikely), fallback to a simple replacement
    if (newText === q.text) {
        newText = q.text.replace(target, '?');
    }

    return {
        ...q,
        text: newText,
        answer: Number(target),
    };
}
