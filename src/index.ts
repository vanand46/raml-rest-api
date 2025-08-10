import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello from REST');
});

app.listen(port, () => {
    console.log(`Server is runnig on Port: ${port}`);
});