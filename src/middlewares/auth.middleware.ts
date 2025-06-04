import jwt  from 'jsonwebtoken';
import Send from '@utils/response.utils';
import { NextFunction, Request, Response } from 'express';
import config from '@config/config';

export interface DecodedToken {
    userId: number;
}

class AuthMiddleware {
    static authenticateUser = (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken;

        if (!token) {
            return Send.unauthorized(res, null);
        }

        try {
            const decodedToken = jwt.verify(token, config.auth.secret) as DecodedToken;

            (req as any).userId = decodedToken.userId;

            next();
        } catch (error) {
            console.error('Falha de autenticação: ', error);
            return Send.unauthorized(res, null);
        }
    };
};

export default AuthMiddleware;