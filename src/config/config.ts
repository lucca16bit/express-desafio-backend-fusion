import dotenv from 'dotenv';

dotenv.config();

interface Config {
    app: {
        port: number;
        nodeEnv: string;
    };
    auth: {
        secret: string;
        secretExpiresIn: string;
    }
}

const config: Config = {
    app: {
        port: Number(process.env.PORT) || 3000,
        nodeEnv: process.env.NODE_ENV || 'development',
    },
    auth: {
        // chave secreta JWT
        secret: process.env.AUTH_SECRET as string, 
        // tempo de expiração para o token JWT
        secretExpiresIn: process.env.AUTH_SECRET_EXPIRES_IN as string, 
    }
};

export default config;