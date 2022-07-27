import { UserRole } from "../types/UserRole";

export interface SignupDTO {
    username: string,
    email: string,
    password: string,
    state: string,
    country: string,
    role: UserRole,
    literaryGenre: string[],
    publicLocation: boolean
}