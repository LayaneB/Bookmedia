export type RegisterBookOutput = {
    id: string,
    userId: string,
    title: string,
    synopsis: string,
    author: string,
    bookGenre: string[],
    userOpinion: string,
    userRate: number
}