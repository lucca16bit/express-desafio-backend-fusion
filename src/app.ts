import router from '@routes/router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const app = express();

// log
app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser()); 

// cors
app.use(cors({
    origin: 'http://localhost:3000/',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(router);

export default app;