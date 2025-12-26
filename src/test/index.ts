import * as assert from 'assert';
import { generateQuestion } from '../index.js';
import { makeMissingOperandQuestion } from '../generators/missing.js';
import { makeRng } from '../utils/random.js';

function runTests() {
    console.log('Running basic tests...');

    // Deterministic results with seed
    const q1 = generateQuestion({ grade: 1, operation: 'add', difficulty: 'easy', seed: 42 });
    assert.strictEqual(q1.operation, 'add');
    assert.strictEqual(q1.grade, 1);

    const q2 = generateQuestion({ grade: 3, operation: 'mul', difficulty: 'easy', seed: 42 });
    assert.strictEqual(q2.operation, 'mul');
    assert.ok(q2.answer >= 1);

    // Subtraction for grade <5 should not be negative
    const q3 = generateQuestion({ grade: 2, operation: 'sub', difficulty: 'medium', seed: 7 });
    assert.ok(q3.answer >= 0, 'Subtraction produced negative answer for grade 2');

    // Division for grade 3 should have integer answer (no remainder)
    const q4 = generateQuestion({ grade: 3, operation: 'div', difficulty: 'easy', seed: 123 });
    assert.strictEqual(q4.answer, Math.floor(q4.operands[0] / q4.operands[1]));

    // Mixed operation test (explicit)
    const q5 = generateQuestion({ grade: 5, operation: 'mixed', difficulty: 'hard', seed: 42 });
    assert.strictEqual(q5.operation, 'mixed');
    // Compute left-hand expression by parsing q5.text and evaluating (replace × and ÷)
    const lh = q5.text.split('=')[0].replace(/×/g, '*').replace(/÷/g, '/');
    // Evaluate safely by creating a Function
    // eslint-disable-next-line no-new-func
    const evaluated = Function(`return ${lh}`)();
    assert.strictEqual(evaluated, q5.answer);

    // Missing operand transformer test
    const base = generateQuestion({ grade: 6, operation: 'add', difficulty: 'hard', seed: 7 });
    const rng = makeRng(1);
    const missing = makeMissingOperandQuestion(base, rng);
    assert.ok(missing.text.includes('?'));
    // missing.answer should equal one of the original operands
    assert.ok(base.operands.includes(missing.answer));

    console.log('All tests passed ✅');
}

runTests();
