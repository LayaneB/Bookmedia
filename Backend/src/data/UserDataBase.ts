
import { InternalError } from "../errors/InternalError";
import { InsertUserDTO } from "../model/DTOs/InsertUserDTO";
import { CheckRegisteredUserOutput } from "../model/types/CheckRegisteredUserOutput";
import { UserByIdOutput } from "../model/types/UserByIdOutput";
import { db } from "./BaseDataBase";


export class UserDataBase {
    private static tableName = "teppa_users"

    public insertUser = async (input: InsertUserDTO): Promise<void> => {
        try {
            await db.collection(UserDataBase.tableName).add({
                id: input.getId(),
                username: input.getUserName(),
                email: input.getEmail(),
                firstName: input.getFirstName(),
                lastName: input.getLastName(),
                birthDate: input.getBirthDate(),
                phoneNumber: input.getPhoneNumber(),
                password: input.getPassword(),
                state: input.getState(),
                country: input.getCountry(),
                role: input.getRole(),
                publicInformations: input.getPublicLocation(),
                literaryGenre: input.getLiteraryGenre()
            })

        } catch (error: any) {
            throw new InternalError(error.message)
        }
    }

    public selectUserByEmail = async (email: string): Promise<CheckRegisteredUserOutput[]> => {
        try {

            const response = await db.collection(UserDataBase.tableName).where('email', '==', email).get()
            const user: CheckRegisteredUserOutput[] = []

            response.forEach((doc: any) => {
                user.push(doc.data())
            })
            return user
        } catch (error: any) {
            throw new InternalError(error.message)
        }
    }

    public selectUserByUsername = async (username: string): Promise<CheckRegisteredUserOutput[]> => {
        try {

            const response = await db.collection(UserDataBase.tableName).where('username', '==', username).get('email', 'id', 'password', 'role')
            const user: CheckRegisteredUserOutput[] = []
            response.forEach((doc: any) => {
                user.push(doc.data())
            });
            return user

        } catch (error: any) {
            throw new InternalError(error.message)
        }
    }

    public selectUserById = async (id: string): Promise<UserByIdOutput> => {
        try {

            const response = await db.collection(UserDataBase.tableName).where('id', '==', id).get()
            const user: UserByIdOutput[] = []
            response.forEach((doc: any) => {
                user.push(doc.data())
            });

            return user[0]

        } catch (error: any) {
            throw new InternalError(error.sqlMessage || error.message)
        }
    }

}
