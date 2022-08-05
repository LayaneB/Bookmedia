import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { GetUserDTO } from '../model/DTOs/GetUserDTO'
import { loginDTO } from '../model/DTOs/LoginDTO'
import { SignupDTO } from '../model/DTOs/SignupDTO'
import { UserByIdOutput } from '../model/types/UserByIdOutput'


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response): Promise<void> => {

        try {

            const { username, email, password, firstName, lastName, birthDate, phoneNumber, state, country, role, literaryGenre, publicInformations } = req.body

            const inputBusiness: SignupDTO = {
                username,
                email,
                password,
                firstName, 
                lastName, 
                birthDate, 
                phoneNumber,
                state,
                country,
                role,
                literaryGenre,
                publicInformations
            }

            const token = await this.userBusiness.registerUser(inputBusiness)

            res.status(200).send({
                message: "Usuário Cadastrado com sucesso.",
                token
            })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {

        try {

            const { email, password } = req.body

            const inputBusiness: loginDTO = {
                email,
                password
            }

            const token = await this.userBusiness.login(inputBusiness)
            
            res.status(200).send({
                token
            })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }
    }

    public getUser = async (req: Request, res: Response): Promise<void> => {

        try {
            const token = req.headers.authorization
            const id = req.params.id

            const inputBusiness: GetUserDTO = {
                token: token as string,
                id
            }

            const userData: UserByIdOutput = await this.userBusiness.getUser(inputBusiness)
            
            res.status(200).send({
                userData
            })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.sqlMessage || error.message })
        }
    }
}