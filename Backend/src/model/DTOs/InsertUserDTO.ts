import { UserRole } from "../types/UserRole";

export interface InsertUserDTO {
    getId: () => string,
    getUserName: () => string,
    getEmail: () => string,
    getFirstName: () => string,
    getLastName: () => string,
    getBirthDate: () => string,
    getPhoneNumber: () => string,
    getPassword: () => string,
    getState: () => string,
    getCountry: () => string,
    getRole: () => UserRole,
    getLiteraryGenre: () => string[],
    getPublicLocation: () => boolean
}


