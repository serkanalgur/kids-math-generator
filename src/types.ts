export type Grade = 1 | 2 | 3 | 4 | 5 | 6;
export type Operation = 'add' | 'sub' | 'mul' | 'div' | 'mixed';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'veryHard';

export interface Question {
    text: string;
    answer: number;
    operation: Operation;
    operands: number[];
    grade: Grade;
    difficulty: Difficulty;
}
