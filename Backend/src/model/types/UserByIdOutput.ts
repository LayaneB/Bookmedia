import { UserRole } from "./UserRole"

export type UserByIdOutput = {
    id: string,
    username: string,
    email: string,
    password:string,
    state: string,
    country: string,
    role: UserRole,
    literaryGenre: string[],
    publicLocation: boolean
}