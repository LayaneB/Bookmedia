import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserController } from '../controller/UserController'
import { UserDataBase } from '../data/UserDataBase'
import { Authenticator } from '../services/Authenticator'
import { HashManage } from '../services/HashManage'
import IdGenerator from '../services/IdGenerator'

const userController = new UserController(
    new UserBusiness(
        new UserDataBase(),
        new IdGenerator(),
        new HashManage(),
        new Authenticator()
    )
)

export const userRouter = express.Router()

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)