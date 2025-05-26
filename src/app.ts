import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

// cors
app.use(cors({
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

export default app;