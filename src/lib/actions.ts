export function getDefaultCategories() {
    return Array.from({length: 10}).map((_, i) => `Question ${i + 1}`);
}

export function getDefaultQuestions() {
    return Array(10).map((_, i) => `Question ${i + 1}`);
}