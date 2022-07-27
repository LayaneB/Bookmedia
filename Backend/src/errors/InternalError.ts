import { CustomError } from "./CustomError";

export class InternalError extends CustomError {

    constructor (
        message: string
    ) {
        super(500, message)
    }
}