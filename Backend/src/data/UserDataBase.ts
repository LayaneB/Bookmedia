import { InternalError } from "../errors/InternalError";
import { InsertUserDTO } from "../model/DTOs/InsertUserDTO";
import { CheckRegisteredUserOutput } from "../model/types/CheckRegisteredUserOutput";
import { UserByIdOutput } from "../model/types/UserByIdOutput";
import { BaseDataBase } from "./BaseDataBase";


export class UserDataBase extends BaseDataBase {
    private static mainTableName = "teppa_users"
    private static auxiliarTableName = "teppa_user_literary_genre"

    public insertUser = async (input: InsertUserDTO): Promise<void> => {
        try {
            await BaseDataBase.connection(UserDataBase.mainTableName)
                .insert({
                    id: input.getId(),
                    username: input.getUserName(),
                    email: input.getEmail(),
                    first_name: input.getFirstName(),
                    last_name: input.getLastName(),
                    birth_date: input.getBirthDate(),
                    phone_number:input.getPhoneNumber(),
                    password: input.getPassword(),
                    state: input.getState(),
                    country: input.getCountry(),
                    role: input.getRole(),
                    public_informations: input.getPublicLocation()
                })

            const literariesGenre: string[] = input.getLiteraryGenre()

            for (const literaryGenre of literariesGenre) {
                await BaseDataBase.connection(UserDataBase.auxiliarTableName)
                    .insert({
                        user_id: input.getId(),
                        literary_genre: literaryGenre
                    })
            }

        } catch (error: any) {
            throw new InternalError(error.sqlMessage || error.message)
        }
    }

    public selectUserByEmail = async (email: string):Promise<CheckRegisteredUserOutput[]>  => {
        try {
            const user:CheckRegisteredUserOutput[] = await BaseDataBase.connection(UserDataBase.mainTableName)
            .select("id", "email", "password", "role")
            .where({email})

            return user

        } catch (error: any) {
            throw new InternalError(error.sqlMessage || error.message)
        }
    }

    public selectUserByUsername = async (username: string):Promise<CheckRegisteredUserOutput[]> => {
        try {
            const user:CheckRegisteredUserOutput[] = await BaseDataBase.connection(UserDataBase.mainTableName)
            .select("id", "email", "password", "role")
            .where({username})

            return user

        } catch (error: any) {
            throw new InternalError(error.sqlMessage || error.message)
        }
    }

    public selectUserById = async (id: string):Promise<UserByIdOutput> => {
        try {
            const user = await BaseDataBase.connection(UserDataBase.mainTableName)
            .select("id", "username", "email", "password", "first_name as firstName", "last_name as lastName", "state", "country", "phone_number as phoneNumber", "birth_date as birthDate", "role", "public_informations as publicInformations")
            .where({id})
         
                const genres = await BaseDataBase.connection(UserDataBase.mainTableName)
                    .join('teppa_user_literary_genre', 'teppa_user_literary_genre.user_id', 'teppa_users.id')
                    .select("literary_genre as literaryGenre")
                    .where("teppa_users.id", id)
                const literaryGenres = genres.map(genre => genre.literaryGenre)
                const userInfo:UserByIdOutput = {...user[0], literaryGenres}
            
            return userInfo

        } catch (error: any) {
            throw new InternalError(error.sqlMessage || error.message)
        }
    }

}
