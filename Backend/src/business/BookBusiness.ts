import { CustomError } from "../errors/CustomError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError"
import { BookModel } from "../model/BookModel"
import { SelectBooksDTO } from "../model/DTOs/SelectBooksDTO"
import { InsertBookDTO } from "../model/DTOs/insertBookDTO"
import { RegisterBookDTO } from "../model/DTOs/RegisterBookDTO"
import { Authenticator } from "../services/Authenticator"
import IdGenerator from "../services/IdGenerator"
import { GetBooksDTO } from "../model/DTOs/GetBooksDTO"
import { NotFoundError } from "../errors/NotFoundError"
import { DeleteBookDTO } from "../model/DTOs/DeleteBookDTO"
import { BookDataBase } from "../data/BookDataBase"

export class BookBusiness {
    constructor(
        private bookDataBase: BookDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public postBook = async (input: RegisterBookDTO): Promise<void> => {

        try {

            const { title, synopsis, author, bookGenre, userFeedback, userRate, token } = input

            if (!token) {
                throw new UnauthorizedError("Essa requisição requer autorização, verifique se está passando um token válido.")
            }

            const userInformation = this.authenticator.getTokenData(token)

            if (!userInformation) {
                throw new UnauthorizedError("Token Inválido.")
            }

            if (!title || !synopsis || !author || !bookGenre || !userFeedback || !userRate) {
                throw new UnprocessableEntityError("Todos os campos são obrigatórios.")
            }

            if (typeof title !== "string" || typeof synopsis !== "string" || typeof author !== "string" || typeof userFeedback !== "string") {
                throw new UnprocessableEntityError("Os campos 'title', 'synopsis', 'author' e 'userFeedback' devem ser do tipo 'string'.")
            }
            if (typeof userRate !== "number") {
                throw new UnprocessableEntityError("O campo 'userRate' deve ser do tipo 'number'.")
            }

            if (userRate < 0 || userRate > 10) {
                throw new UnprocessableEntityError("O campo 'userRate' deve ser um valor entre 0 e 10.")
            }

            if (bookGenre.length === 0) {
                throw new UnprocessableEntityError("Inserir pelo menos um gênero literário.")
            }

            const id = this.idGenerator.generateId()

            const newBook: InsertBookDTO = new BookModel(id, userInformation.id, title, synopsis, author, bookGenre, userFeedback, userRate)

            await this.bookDataBase.insertBook(newBook)

        } catch (error: any) {

            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)

        }

    }

    public getBooksByUser = async (input: GetBooksDTO): Promise<SelectBooksDTO[]> => {
        try {
            const { token, id } = input

            if (!token) {
                throw new UnauthorizedError("Essa requisição requer autorização, verifique se está passando um token válido.")
            }

            const userInformation = this.authenticator.getTokenData(token)

            if (!userInformation) {
                throw new UnauthorizedError("Token Inválido.")
            }

            const books: SelectBooksDTO[] = await this.bookDataBase.selecttBookByUser(id as string)

            return books
        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }

    }

    public getAllBooks = async (input: GetBooksDTO): Promise<SelectBooksDTO[]> => {

        try {
            const { token } = input

            if (!token) {
                throw new UnauthorizedError("Essa requisição requer autorização, verifique se está passando um token válido.")
            }

            const userInformation = this.authenticator.getTokenData(token)

            if (!userInformation) {
                throw new UnauthorizedError("Token Inválido.")
            }

            const books: SelectBooksDTO[] = await this.bookDataBase.selecttAllBooks()

            if (!books || books.length === 0) {
                throw new NotFoundError("Seja o primeiro a adicionar uma resenha em nossa rede.")
            }

            return books

        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }

    }

    public deleteBook = async (input: DeleteBookDTO): Promise<void> => {

        try {
            const { token, id } = input

            if (!token) {
                throw new UnauthorizedError("Essa requisição requer autorização, verifique se está passando um token válido.")
            }

            const userInformation = this.authenticator.getTokenData(token)

            if (!userInformation) {
                throw new UnauthorizedError("Token Inválido.")
            }

            const book: SelectBooksDTO = await this.bookDataBase.selecttBookById(id)

            if (!book) {
                throw new NotFoundError("Livro não cadastrado.")
            }

            if (book.userId !== userInformation.id) {
                throw new UnauthorizedError("Não autorizado.")
            }

            await this.bookDataBase.deleteBookById(id)


        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }

    }
}