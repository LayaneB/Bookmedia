import { SetBookGenre } from "../types/SetBookGenre"

export interface UpdateBookDto {
    title?: string,
    synopsis?: string,
    author?: string,
    userFeedback?: string,
    userRate?: number
    bookGenre?: string[]
    id:string,
    userId: string
}