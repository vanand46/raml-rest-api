import { Request, Response } from 'express';

export const getRoot = (req: Request, res: Response) => {
    res.status(200).send('Hello from REST');
}