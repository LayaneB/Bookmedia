import { UserRole } from "../types/UserRole";

export interface InsertUserDTO {
    getId: () => string,
    getUserName: () => string,
    getEmail: () => string,
    getPassword: () => string,
    getState: () => string,
    getCountry: () => string,
    getRole: () => UserRole,
    getLiteraryGenre: () => string[],
    getPublicLocation: () => boolean
}


