import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
],
    validateRequest,
    async (req: Request, res: Response) => {
        console.log('Creating a user ...');
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // console.log('email in user');
            // return res.send({});
            throw new BadRequestError('email in user');
        }

        const user = User.build({ email, password });
        await user.save();

        // generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        },
            process.env.JWT_KEY!);

        // Strore it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    });

export { router as signupRouter };