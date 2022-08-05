export interface CardFeedProps {
    book:{
        id: string,
        userId:string,
        title: string,
        synopsis: string,
        author: string,
        bookGenre: string[],
        userFeedback: string,
        userRate: number,
        username:string,
        createdAt: Date
    },
    deleteBook: (id: string) => void
}