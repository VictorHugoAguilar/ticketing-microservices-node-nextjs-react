import { ValidationError } from "express-validator";
import { CustomError } from './custom-error';

export class DatabaseConnetionError extends CustomError {
    statusCode = 500;
    reason: String = 'Error connecting to database';
    constructor() {
        super('Error connecting to db');
        // Only because we are extendig a built in class
        Object.setPrototypeOf(this, DatabaseConnetionError.prototype);
    }
    serializeErrors() {
        return [{
            message: this.reason
        }]
    }
}

