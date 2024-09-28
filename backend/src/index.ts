import express from "express";
import {Request, Response, NextFunction} from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`The Good Corner listening on port ${port}`)
})