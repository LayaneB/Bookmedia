export interface RegisterBookDTO{
    title: string,
    synopsis: string,
    author: string,
    bookGenre: string[],
    userOpinion: string,
    userRate: number,
    token: string
}