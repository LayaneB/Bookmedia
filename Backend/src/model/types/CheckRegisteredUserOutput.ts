import { UserRole } from "./UserRole"

export type CheckRegisteredUserOutput = {
    id: string,
    email: string,
    password:string,
    role: UserRole
}