import { UserRole } from "../types/UserRole";

export interface SignupDTO {
    username: string,
    email: string,
    password: string,
    firstName: string, 
    lastName: string, 
    birthDate: string, 
    phoneNumber: string,
    state: string,
    country: string,
    role: UserRole,
    literaryGenre: string[],
    publicInformations: boolean
}