import router from '@routes/router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import specs from 'docs/swagger.docs';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

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

// documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(router);

export default app;