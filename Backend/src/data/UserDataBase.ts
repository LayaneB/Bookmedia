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
                    password: input.getPassword(),
                    state: input.getEmail(),
                    country: input.getCountry(),
                    role: input.getRole(),
                    public_location: input.getPublicLocation()
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
            const user:UserByIdOutput[] = await BaseDataBase.connection(UserDataBase.mainTableName)
            .select("id", "username", "email", "password", "state", "country", "role", "literary_genre as literaryGenre", "public_location as publicaLocation")
            .where({id})

            return user[0]

        } catch (error: any) {
            throw new InternalError(error.sqlMessage || error.message)
        }
    }



}
