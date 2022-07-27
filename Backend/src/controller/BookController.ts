import { Request, Response } from "express";
import { BookBusiness } from "../business/BookBusiness";
import { RegisterBookDTO } from "../model/DTOs/RegisterBookDTO";
import { RegisterBookOutput } from "../model/types/RegisterBookOutput";


export class BookController {
    constructor(
        private bookBusines: BookBusiness
    ) { }

    public registerBook = async (req: Request, res: Response) => {

        try {
            const { title, synopsis, author, bookGenre, userFeedback, userRate } = req.body
            const token = req.headers.authorization as string
    
            const inputBusiness: RegisterBookDTO = {
                title, 
                synopsis, 
                author, 
                bookGenre, 
                userFeedback, 
                userRate, 
                token
            }
    
            const book: RegisterBookOutput = await this.bookBusines.registerBook(inputBusiness)

            res.status(200).send({
                message:"Livro adicionado a sua biblioteca.",
                book
            })
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }
       
    }
}