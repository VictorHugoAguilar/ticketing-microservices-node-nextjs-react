import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnetionError } from "../errors/database-connetion-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong', err);
    if (err instanceof RequestValidationError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        })
    }
    if (err instanceof DatabaseConnetionError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        })
    }
    console.log('Something went wrong');
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    })
};  