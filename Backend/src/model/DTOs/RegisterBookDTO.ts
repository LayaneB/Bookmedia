export interface RegisterBookDTO{
    title: string,
    synopsis: string,
    author: string,
    bookGenre: string[],
    userFeedback: string,
    userRate: number,
    token: string
}