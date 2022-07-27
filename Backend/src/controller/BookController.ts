import { Request, Response } from "express";
import { BookBusiness } from "../business/BookBusiness";
import { RegisterBookDTO } from "../model/DTOs/registerBookDTO";
import { RegisterBookOutput } from "../model/types/RegisterBookOutput";


export class BookController {
    constructor(
        private bookBusines: BookBusiness
    ) { }

    public registerBook = async (req: Request, res: Response) => {
        const { title, synopsis, author, bookGenre, userOpinion, userRate } = req.body
        const token = req.headers.authorization as string

        const inputBusiness: RegisterBookDTO = {
            title, 
            synopsis, 
            author, 
            bookGenre, 
            userOpinion, 
            userRate, 
            token
        }

        const book: RegisterBookOutput = await this.bookBusines.registerBook(inputBusiness)
    }
}