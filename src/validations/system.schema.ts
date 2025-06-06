import { z } from 'zod';

const nameValidation = z.string()
    .min(1, 'O nome do sistema é obrigatório')
    .max(100, 'O nome do sistema não pode ultrapassar de 100 caracteres')
    .trim();

const descriptionValidation = z.string()
    .min(1, 'A descrição é obrigatória')
    .max(5000, 'A descrição não pode ultrapassar 5.000 caracteres')
    .trim();

const validateSchema = z.object({
    name: nameValidation,
    description: descriptionValidation
});

const systemSchema = {
    validateSchema
};

export default systemSchema;