import express from 'express'
import { BookBusiness } from '../business/BookBusiness'
import { BookController } from '../controller/BookController'
import { BookDataBase } from '../data/BookDataBase'
import { Authenticator } from '../services/Authenticator'
import IdGenerator from '../services/IdGenerator'

const bookController = new BookController(
    new BookBusiness(
        new BookDataBase(),
        new IdGenerator(),
        new Authenticator()
    )
)

export const bookRouter = express.Router()

bookRouter.get('/feed', bookController.getAllBooks)
bookRouter.get('/:id', bookController.getBooksByUser)
bookRouter.post('', bookController.postBook)
bookRouter.put('/:id', bookController.putBook)
bookRouter.delete('/:id', bookController.deleteBook)