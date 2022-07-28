import { InternalError } from "../errors/InternalError"
import { InsertBookDTO } from "../model/DTOs/insertBookDTO"
import { SelectBooksDTO } from "../model/DTOs/SelectBooksDTO"
import { BaseDataBase } from "./BaseDataBase"

export class BookDataBase extends BaseDataBase {
    private static mainTableName = "teppa_books"
    private static auxiliarTableName = "teppa_book_genre"

    public insertBook = async (input: InsertBookDTO): Promise<void> => {
        try {
            await BaseDataBase.connection(BookDataBase.mainTableName)
                .insert({
                    id: input.getId(),
                    user_id: input.getUserId(),
                    title: input.getTitle(),
                    synopsis: input.getSynopsis(),
                    author: input.getAuthor(),
                    user_feedback: input.getUserFeedback(),
                    user_rate: input.getUserRate()
                })

            const bookGenres: string[] = input.getBookGenre()

            for (const bookGenre of bookGenres) {
                await BaseDataBase.connection(BookDataBase.auxiliarTableName)
                    .insert({
                        user_id: input.getUserId(),
                        book_id: input.getId(),
                        book_genre: bookGenre
                    })
            }

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

    public selecttBookById = async (id: string): Promise<SelectBooksDTO> => {
        try {

            const book: SelectBooksDTO[] = await BaseDataBase.connection(BookDataBase.mainTableName)
                .select()
                .where({ id })

            return book[0]

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

    public selecttBookByUser = async (userId: string): Promise<SelectBooksDTO[]> => {
        try {
            let userBooks: SelectBooksDTO[] = []
            const books: SelectBooksDTO[] = await BaseDataBase.connection(BookDataBase.mainTableName)
                .join('teppa_users', 'teppa_users.id', 'teppa_books.user_id')
                .select("teppa_books.id as id", "teppa_books.user_id as userId", "title", "synopsis", "author", "user_feedback as userFeedback", "user_rate as userRate", "created_at as createdAt")
                .where("teppa_books.user_id", userId)

            for (let book of books) {
                const genres = await BaseDataBase.connection(BookDataBase.mainTableName)
                    .join('teppa_book_genre', 'teppa_book_genre.book_id', 'teppa_books.id')
                    .select("book_genre as bookGenre")
                    .where("teppa_books.id", book.id)
                const bookGenres = genres.map(genre => genre.bookGenre)
                const completInformation:SelectBooksDTO = {...book, bookGenre: bookGenres}
                userBooks = [... userBooks, completInformation]
            }
            return userBooks

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

    public selecttAllBooks = async (): Promise<SelectBooksDTO[]> => {
        try {
            let userBooks: SelectBooksDTO[] = []
            const books: SelectBooksDTO[] = await BaseDataBase.connection(BookDataBase.mainTableName)
                .join('teppa_users', 'teppa_users.id', 'teppa_books.user_id')
                .select("teppa_books.id as id", "teppa_books.user_id as userId", "title", "synopsis", "author", "user_feedback as userFeedback", "user_rate as userRate", "created_at as createdAt")
                .orderBy('teppa_books.created_at')

            for (let book of books) {
                const genres = await BaseDataBase.connection(BookDataBase.mainTableName)
                    .join('teppa_book_genre', 'teppa_book_genre.book_id', 'teppa_books.id')
                    .select("book_genre as bookGenre")
                    .where("teppa_books.id", book.id)
                const bookGenres = genres.map(genre => genre.bookGenre)
                const completInformation:SelectBooksDTO = {...book, bookGenre: bookGenres}
                userBooks = [... userBooks, completInformation]
            }
            return userBooks

        } catch (error: any) {

            throw new InternalError(error.sqlMessage || error.message)

        }
    }

}
