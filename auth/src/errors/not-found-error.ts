import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;
    constructor() {
        super('Route not found');
        // Only because we are extendig a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{
            message: 'No found'
        }];
    }
}