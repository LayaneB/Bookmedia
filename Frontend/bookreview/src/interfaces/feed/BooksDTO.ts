export interface BooksDTO{
    id: string,
    title: string,
    synopsis: string,
    author: string,
    bookGenre: string[],
    userFeedback: string,
    userRate: number,
    username:string,
    createdAt: Date
}