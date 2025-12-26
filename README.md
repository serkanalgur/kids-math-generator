# @kids/math-generator

A small TypeScript package to generate math questions for grades 1–6.

- **Zero runtime dependencies**
- **Deterministic option** via `seed`

Key features
- Generate grade-appropriate math questions (grades 1–6)
- Difficulty levels: `easy`, `medium`, `hard`, `veryHard`
- Mixed-operation questions (e.g., `(6 × 4) - 5 = ?`) for higher grades
- Missing-operand (reverse) questions (e.g., `? × 12 = 144`) for advanced practice

Quick usage (ESM):

```ts
import { generateQuestion } from '@kids/math-generator';

// Explicit multiplication question
const q1 = generateQuestion({ grade: 3, operation: 'mul', difficulty: 'easy', seed: 42 });
console.log(q1.text, '→', q1.answer);

// Explicit mixed question (available for grade >= 5)
const mixed = generateQuestion({ grade: 5, operation: 'mixed', difficulty: 'hard', seed: 123 });
console.log(mixed.text, '→', mixed.answer);

// Missing-operand (reverse) question example
// For deterministic transformation, import the helper and a RNG
import { makeMissingOperandQuestion, makeRng } from '@kids/math-generator';

const base = generateQuestion({ grade: 6, operation: 'add', difficulty: 'hard', seed: 7 });
const rng = makeRng(1); // deterministic helper RNG
const missing = makeMissingOperandQuestion(base, rng);
console.log(missing.text, '→', missing.answer);
```

Notes
- If `operation` is omitted, the generator will pick an operation appropriate for the grade and difficulty. For grades >= 5 and harder difficulties, it may produce mixed problems.
- Missing-operand reverse questions are automatically produced sometimes for grade >= 6 when `difficulty` allows it; the `makeMissingOperandQuestion` helper is provided for explicit transformations.

Run a quick sample/tests locally:

```bash
npm run build
npm test
```
