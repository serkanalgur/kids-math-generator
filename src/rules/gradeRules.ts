import type { Grade } from '../types.js';

export function getNumberRangeForGrade(grade: Grade): { min: number; max: number } {
    switch (grade) {
        case 1:
            return { min: 0, max: 20 };
        case 2:
            return { min: 0, max: 100 };
        case 3:
            return { min: 0, max: 100 };
        case 4:
            return { min: 0, max: 1000 };
        case 5:
            return { min: 0, max: 10000 };
        case 6:
            return { min: 0, max: 100000 };
        default:
            return { min: 0, max: 100 };
    }
}
