import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong', err);
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        })
    }
    console.log('Something went wrong');
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    })
};  