import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

// log
app.use(morgan('dev'));

app.use(express.json());

// cors
app.use(cors({
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// tratamento global
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
});

// teste 
app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
})

export default app;