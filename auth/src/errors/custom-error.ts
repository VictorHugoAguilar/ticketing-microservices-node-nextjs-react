export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message?: string) {
        super(message);
        // Only because we are extendig a built in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: String, field?: String }[]
}