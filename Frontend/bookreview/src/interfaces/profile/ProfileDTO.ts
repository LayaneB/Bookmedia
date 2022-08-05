export interface ProfileDTO {
    id: string
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber: string
    birthDate: Date
    country: string
    state: string
    role: string
    literaryGenres: string[]
    publicaLocation: number
}