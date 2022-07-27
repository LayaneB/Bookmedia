import { genSalt, hash, compare } from "bcryptjs"

export class HashManage {
    
    public generateHash = async (password: string): Promise<string> => {

        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await genSalt(rounds)
        const result = await hash(password, salt)

        return result
    }

    public compare = async (password: string, hash: string): Promise<boolean> => {
        
        const result = await compare(password, hash)

        return result
    }
}