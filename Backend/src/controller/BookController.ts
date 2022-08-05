import { Request, Response } from "express";
import { BookBusiness } from "../business/BookBusiness";
import { DeleteBookDTO } from "../model/DTOs/DeleteBookDTO";
import { GetBooksDTO } from "../model/DTOs/GetBooksDTO";
import { PutBookDTO } from "../model/DTOs/PutBookDTO";
import { RegisterBookDTO } from "../model/DTOs/RegisterBookDTO";
import { SelectBooksDTO } from "../model/DTOs/SelectBooksDTO";
import { RegisterBookOutput } from "../model/types/RegisterBookOutput";


export class BookController {
    constructor(
        private bookBusines: BookBusiness
    ) { }

    public postBook = async (req: Request, res: Response): Promise<void> => {

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

            const book: RegisterBookOutput = await this.bookBusines.postBook(inputBusiness)

            res.status(200).send({
                message: "Livro adicionado a sua biblioteca.",
                book
            })
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }

    }

    public getBooksByUser = async (req: Request, res: Response): Promise<void> => {

        try {

            const token = req.headers.authorization as string
            const id = req.params.id

            const inputBusiness: GetBooksDTO = { token, id }

            const books: SelectBooksDTO[] = await this.bookBusines.getBooksByUser(inputBusiness)

            res.status(200).send({
                books
            })
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }

    }

    public getAllBooks = async (req: Request, res: Response): Promise<void> => {

        try {

            const token = req.headers.authorization as string

            const inputBusiness: GetBooksDTO = { token }

            const books: SelectBooksDTO[] = await this.bookBusines.getAllBooks(inputBusiness)

            res.status(200).send({
                books
            })
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }

    }

    public putBook = async (req: Request, res: Response): Promise<void> => {

        try {
            const {title, synopsis, author, bookGenre, userFeedback, userRate}  = req.body
            const token = req.headers.authorization as string
            const id = req.params.id

            const inputBusiness: PutBookDTO = {
                title,
                synopsis,
                author,
                bookGenre,
                userFeedback,
                userRate,
                token,
                id
            }

           await this.bookBusines.putBook(inputBusiness)

            res.status(200).send({
                message: "Livro atualizado."
            })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }

    }

    public deleteBook = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization as string

            const id = req.params.id

            const inputBusiness: DeleteBookDTO = {
                token,
                id
            }

           await this.bookBusines.deleteBook(inputBusiness)

            res.status(200).send({
                message: "Livro deletado."
            })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }

    }
}