import { UserDataBase } from "../data/UserDataBase"
import { ConflictError } from "../errors/ConflictError"
import { CustomError } from "../errors/CustomError"
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError"
import { InsertUserDTO } from "../model/DTOs/InsertUserDTO"
import { loginDTO } from "../model/DTOs/LoginDTO"
import { SignupDTO } from "../model/DTOs/SignupDTO"
import { CheckRegisteredUserOutput } from "../model/types/CheckRegisteredUserOutput"
import { UserRole } from "../model/types/UserRole"
import { UserModel } from "../model/UserModel"
import { Authenticator } from "../services/Authenticator"
import { HashManage } from "../services/HashManage"
import IdGenerator from "../services/IdGenerator"

export class UserBusiness {
    constructor(
        private userDataBase: UserDataBase,
        private idGenerator: IdGenerator,
        private hashManage : HashManage,
        private authenticator: Authenticator
    ) { }

    public registerUser = async (input: SignupDTO): Promise<string> => {

        try {

            const { username, email, password, state, country, role, literaryGenre, publicLocation } = input

            if (!username || !email || !password || !state || !country || !role || !literaryGenre || !publicLocation) {
                throw new UnprocessableEntityError("Todos os campos são obrigatórios.")
            }

            if(typeof username !== "string" || typeof email !== "string" || typeof state !== "string" || typeof country !== "string"){
                throw new UnprocessableEntityError("Os campos 'username', 'email', 'state' e 'country' devem ser do tipo 'string'.")
            }

            const checkEmail: CheckRegisteredUserOutput[] = await this.userDataBase.selectUserByEmail(email)

            if(checkEmail.length > 0){
                throw new ConflictError("Email já cadastrado.")
            }

            const checkUsername: CheckRegisteredUserOutput[] = await this.userDataBase.selectUserByUsername(username)

            if(checkUsername.length > 0){
                throw new ConflictError("Username já cadastrado.")
            }

            if(typeof publicLocation !== "boolean"){
                throw new UnprocessableEntityError("O campo 'publicLocation' deve ser do tipo boolean.")
            }

            if(literaryGenre.length === 0){
                throw new UnprocessableEntityError("Inserir pelo menos um gênero literário.")
            }
            
            if(role !== UserRole.READER && role !== UserRole.WRITER){
                throw new UnprocessableEntityError("O usuário só pode possuir umas das duas regras: 'reader' ou 'writer'.")
            }
            const regexp = /\S+@\S+\.\S+/

            if(!regexp.test(email)){
                throw new UnprocessableEntityError("Email inválido.")
            }

            if(password.length < 8){
                throw new UnprocessableEntityError("Senha inválido. Sua senha deve ter pelo menos 8 caracteres.")
            }

            const id = this.idGenerator.generateId()

            const hash = await this.hashManage.generateHash(password)

            const newUser: InsertUserDTO = new UserModel(id, username, email, hash, state, country, role, literaryGenre, publicLocation )

            await this.userDataBase.insertUser(newUser)

            const token = this.authenticator.generateToken({ id, role })

            return token

        } catch (error: any) {

            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }

    }

    public  login = async (user: loginDTO):Promise<string> => {

        try {
            const { username, password } = user

            if(!username || !password){
                throw new UnprocessableEntityError("Todos os campos são obrigatórios.")
            }

            const checkUser:CheckRegisteredUserOutput[] = await this.userDataBase.selectUserByUsername(username)

            if (checkUser.length === 0) {
                throw new ConflictError("Credenciais inválidas. Usuário não cadastrado.")
            }

            const passwordIsCorrect: boolean = await this.hashManage.compare(password, checkUser[0].password)

            if (!passwordIsCorrect) {
                throw new ConflictError("Credenciais inválidas.")
            }

            const token = this.authenticator.generateToken({ id: checkUser[0].id, role: checkUser[0].role })

            return token
        } catch (error: any) {

            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)

        }

    }
}


