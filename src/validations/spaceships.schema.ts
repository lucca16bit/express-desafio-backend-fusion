import { z } from 'zod';

const nameValidation = z.string()
    .min(1, 'O nome da nave espacial é obrigatório')
    .max(100, 'O nome da nave espacial não pode ultrapassar de 100 caracteres')
    .trim();

const modelValidation = z.string()
    .min(1, 'O modelo da nave espacial é obrigatório')
    .max(100, 'O modelo da nave espacial não pode ultrapassar de 100 caracteres')
    .trim();

const manufacturerValidation = z.string()
    .min(1, 'O modelo da nave espacial é obrigatório')
    .max(50, 'O modelo da nave espacial não pode ultrapassar de 50 caracteres')
    .trim();

const capacityValidation = z.number()
    .int('Apenas números inteiros são válidos')
    .min(0, 'A capacidade não pode ser um número negativo')
    .default(0)

const validateSchema = z.object({
    name: nameValidation,
    model: modelValidation,
    manufacturer: manufacturerValidation,
    passengerCapacity: capacityValidation
});

const spaceShipsSchema = {
    validateSchema
};

export default spaceShipsSchema;