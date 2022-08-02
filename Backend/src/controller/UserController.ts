import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { loginDTO } from '../model/DTOs/LoginDTO'
import { SignupDTO } from '../model/DTOs/SignupDTO'


export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response): Promise<void> => {

        try {

            const { username, email, password, state, country, role, literaryGenre, publicLocation } = req.body

            const inputBusiness: SignupDTO = {
                username,
                email,
                password,
                state,
                country,
                role,
                literaryGenre,
                publicLocation
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
}