import { SetBookGenre } from "../types/SetBookGenre"

export interface UpdateBookDto {
    set?: {
        title?: string,
        synopsis?: string,
        author?: string,
        user_feedback?: string,
        user_rate?: number
    },
    setBookGenre?: SetBookGenre[]
    id:string,
    userId: string
}