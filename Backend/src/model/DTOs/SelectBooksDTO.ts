export interface SelectBooksDTO {
    id: string,
    title: string,
    synopsis: string,
    author: string,
    bookGenre: string[],
    userFeedback: string,
    userRate: number,
    createdAt: Date
}