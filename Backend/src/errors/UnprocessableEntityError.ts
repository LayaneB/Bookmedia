import { CustomError } from "./CustomError";

export class UnprocessableEntityError extends CustomError {

    constructor (
        message: string
    ) {
        super(422, message)
    }
}