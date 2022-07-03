import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser, requireAuth } from '@black_sheep/common';

const router = express.Router();

// middleware requireAuth
router.get('/api/users/currentuser', currentUser, requireAuth, async (req: Request, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter }; 