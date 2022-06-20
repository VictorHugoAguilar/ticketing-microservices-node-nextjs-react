import { ValidationError } from "express-validator";

export class DatabaseConnetionError extends Error {
    statusCode = 500;
    reason: String = 'Error connecting to database';
    constructor() {
        super();
        // Only because we are extendig a built in class
        Object.setPrototypeOf(this, DatabaseConnetionError.prototype);
    }
    serializeErrors() {
        return [{
            message: this.reason
        }]
    }
}

