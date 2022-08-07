import { UserDataBase } from "../data/UserDataBase"
import { ConflictError } from "../errors/ConflictError"
import { CustomError } from "../errors/CustomError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError"
import { GetUserDTO } from "../model/DTOs/GetUserDTO"
import { InsertUserDTO } from "../model/DTOs/InsertUserDTO"
import { LogedDTO } from "../model/DTOs/LogedDTO"
import { loginDTO } from "../model/DTOs/LoginDTO"
import { SignupDTO } from "../model/DTOs/SignupDTO"
import { CheckRegisteredUserOutput } from "../model/types/CheckRegisteredUserOutput"
import { UserByIdOutput } from "../model/types/UserByIdOutput"
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

    public registerUser = async (input: SignupDTO): Promise<LogedDTO> => {
       
        try {

            const { username, email, password, firstName, lastName, birthDate, phoneNumber, state, country, role, literaryGenre, publicInformations } = input
    
            if (!username || !email || !password || !state || !firstName || !lastName || !birthDate || !phoneNumber || !country || !role || !literaryGenre || publicInformations === undefined) {
                throw new UnprocessableEntityError("Todos os campos são obrigatórios.")
            }

            if(typeof username !== "string" || typeof email !== "string" || typeof state !== "string" || typeof country !== "string" || typeof firstName !== "string" || typeof lastName !== "string" || typeof birthDate !== "string" || typeof phoneNumber !== "string"){
                throw new UnprocessableEntityError("Os campos 'username', 'email', 'firstName', 'lastName', 'birthDate', 'phoneNumber', 'state' e 'country' devem ser do tipo 'string'.")
            }

            const checkEmail: CheckRegisteredUserOutput[] = await this.userDataBase.selectUserByEmail(email)

            if(checkEmail.length > 0){
                throw new ConflictError("Email já cadastrado.")
            }

            const checkUsername: CheckRegisteredUserOutput[] = await this.userDataBase.selectUserByUsername(username)

            if(checkUsername.length > 0){
                throw new ConflictError("Username já cadastrado.")
            }

            if(typeof publicInformations !== "boolean"){
                throw new UnprocessableEntityError("O campo 'publicInformations' deve ser do tipo boolean.")
            }

            if(literaryGenre.length === 0){
                throw new UnprocessableEntityError("Inserir pelo menos um gênero literário.")
            }
            
            if(role !== UserRole.READER && role !== UserRole.WRITER && role !== UserRole.BOTH){
                throw new UnprocessableEntityError("O usuário só pode possuir umas das três regras: 'leitor', 'escritor' ou 'leitor e escritor'.")
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

            const newUser: InsertUserDTO = new UserModel(id, username, email, firstName, lastName, birthDate, phoneNumber, hash,state, country, role, literaryGenre, publicInformations )

            await this.userDataBase.insertUser(newUser)

            const token = this.authenticator.generateToken({ id, role })

            return {token, id}

        } catch (error: any) {

            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)
        }

    }

    public  login = async (user: loginDTO):Promise<LogedDTO> => {

        try {
            const { email, password } = user

            if(!email || !password){
                throw new UnprocessableEntityError("Todos os campos são obrigatórios.")
            }

            const checkUser:CheckRegisteredUserOutput[] = await this.userDataBase.selectUserByEmail(email)
            console.log(checkUser)
            if (checkUser.length === 0) {
                throw new ConflictError("Credenciais inválidas. Usuário não cadastrado.")
            }
            
            const passwordIsCorrect: boolean = await this.hashManage.compare(password, checkUser[0].password)
            
            if (!passwordIsCorrect) {
                throw new ConflictError("Credenciais inválidas.")
            }
            
            
            const token = this.authenticator.generateToken({ id: checkUser[0].id, role: checkUser[0].role })

            return {token, id: checkUser[0].id}
        } catch (error: any) {

            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)

        }

    }

    public  getUser = async (input: GetUserDTO):Promise<UserByIdOutput> => {

        try {
            const { token , id } = input

            if (!token) {
                throw new UnauthorizedError("Essa requisição requer autorização, verifique se está passando um token válido.")
            }

            const userInformation = this.authenticator.getTokenData(token)

            if (!userInformation) {
                throw new UnauthorizedError("Token Inválido.")
            }

            const userData: UserByIdOutput = await this.userDataBase.selectUserById(id)
            
            return userData
        } catch (error: any) {

            throw new CustomError(error.statusCode || 500, error.sqlMessage || error.message)

        }

    }
}


