import router from '@routes/router';
import cors from 'cors';
import express from 'express';
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

app.use(router);

export default app;