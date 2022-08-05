import { UserRole } from "./UserRole"

export type UserByIdOutput = {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    phoneNumber: string,
    email: string,
    password: string,
    state: string,
    country: string,
    role: UserRole,
    literaryGenre: string[],
    publicInformations: number
}