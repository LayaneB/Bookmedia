import { CustomError } from "./CustomError";

export class BadRequestError extends CustomError {

    constructor (
        message: string
    ) {
        super(400, message)
    }
}