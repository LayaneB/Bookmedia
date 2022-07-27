export interface InsertBookDTO {
    getId: () => string,
    getUserId: () => string,
    getTitle: () => string,
    getSynopsis: () => string,
    getAuthor: () => string,
    getBookGenre: () => string[],
    getUserFeedback: () => string,
    getUserRate: () => number
}