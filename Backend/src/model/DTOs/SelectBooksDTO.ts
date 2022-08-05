export interface SelectBooksDTO {
    id: string,
    userId: string,
    username: string,
    title: string,
    synopsis: string,
    author: string,
    bookGenre: string[],
    userFeedback: string,
    userRate: number,
    createdAt: Date
}