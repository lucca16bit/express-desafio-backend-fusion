import Send from '@utils/response.utils';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

// middleware genérica para validação de schemas
class ValidationMiddleware {
    static validate(schema: ZodSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const formattedErrors: Record<string, string[]> = {};

                    error.errors.forEach((err) => {
                        const field = err.path.join(".");
                        if (!formattedErrors[field]) {
                            formattedErrors[field] = [];
                        }
                        formattedErrors[field].push(err.message);
                    });

                    return Send.validationErrors(res, formattedErrors);
                } else {
                    return Send.error(res, 'Dados da solicitação inválidos');
                }
            }
        };
    }
}

export default ValidationMiddleware;