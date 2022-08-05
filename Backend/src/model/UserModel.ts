import { UserRole } from "./types/UserRole"

export class UserModel {
    constructor(
        private id: string,
        private username: string,
        private email: string,
        private firstName: string,
        private lastName: string,
        private birthDate: string,
        private phoneNumber: string,
        private password:string,
        private state: string,
        private country: string,
        private role: UserRole,
        private literaryGenre: string[],
        private publicLocation: boolean
    ){}
   
    public getId(){
        return this.id
    }
    public getUserName(){
        return this.username
    }
    public getEmail(){
        return this.email
    }

    public getPassword(){
        return this.password
    }
    public getFirstName(){
        return this.firstName
    }
    public getLastName(){
        return this.lastName
    }
    public getBirthDate(){
        return this.birthDate
    }
    public getPhoneNumber(){
        return this.phoneNumber
    }
    public getState(){
        return this.state
    }
    public getCountry(){
        return this.country
    }
    public getRole(){
        return this.role
    }
    public getLiteraryGenre(){
        return this.literaryGenre
    }
    public getPublicLocation(){
        return this.publicLocation
    }
}

