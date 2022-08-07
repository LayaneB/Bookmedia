import { db } from "../controller/app"
import { InternalError } from "../errors/InternalError"
import { InsertBookDTO } from "../model/DTOs/insertBookDTO"
import { SelectBooksDTO } from "../model/DTOs/SelectBooksDTO"
import { UpdateBookDto } from "../model/DTOs/UpdateBookDTO"
import { UserByIdOutput } from "../model/types/UserByIdOutput"
import { BaseDataBase } from "./BaseDataBase"

export class BookDataBase extends BaseDataBase {
    private static tableName = "teppa_books"

    public insertBook = async (input: InsertBookDTO): Promise<void> => {
        try {
            await db.collection(BookDataBase.tableName).add({
                id: input.getId(),
                userId: input.getUserId(),
                title: input.getTitle(),
                synopsis: input.getSynopsis(),
                author: input.getAuthor(),
                userFeedback: input.getUserFeedback(),
                userRate: input.getUserRate(),
                bookGenre: input.getBookGenre()
            })

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

    public selecttBookById = async (id: string): Promise<SelectBooksDTO> => {
        try {

            const response = await db.collection(BookDataBase.tableName).where('id', '==', id).get()

            const book: SelectBooksDTO[] = []
            response.forEach((doc: any) => {
                book.push(doc.data())
            })
            return book[0]

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

    public selecttBookByUser = async (id: string): Promise<SelectBooksDTO[]> => {
        try {

            const responseUser = await db.collection('teppa_users').where('id', '==', id).get()
            const user: UserByIdOutput[] = []
            responseUser.forEach((doc: any) => {
                user.push(doc.data())
            });
            console.log(user)

            const responseBook = await db.collection(BookDataBase.tableName).where('userId', '==', id).get()

            const book: SelectBooksDTO[] = []
            responseBook.forEach((doc: any) => {
                book.push({ ...doc.data(), username: user[0].username})
            })

            return book

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

    public selecttAllBooks = async (): Promise<SelectBooksDTO[]> => {
        try {
            const response = await db.collection(BookDataBase.tableName).get()

            const books: SelectBooksDTO[] = []
            response.forEach((doc: any) => {
                books.push(doc.data())
            })
            return books

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

    public updateBook = async (input: UpdateBookDto): Promise<void> => {

        try {


            await db.collection(BookDataBase.tableName).where({ book_id: input.id }).update(input)


        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

    public deleteBookById = async (id: string): Promise<void> => {
        try {

            await db.collection(BookDataBase.tableName).where('id', '==', id).delete()

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }
}
