export interface InsertBookDTO {
    getId: () => string,
    getUserId: () => string,
    getTitle: () => string,
    getSynopsis: () => string,
    getAuthor: () => string,
    getBookGenre: () => string[],
    getUserOpinion: () => string,
    getUserRate: () => number
}