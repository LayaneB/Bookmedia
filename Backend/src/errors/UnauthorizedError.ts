import { CustomError } from "./CustomError";

export class UnauthorizedError extends CustomError {

    constructor (
        message: string
    ) {
        super(401, message)
    }
}