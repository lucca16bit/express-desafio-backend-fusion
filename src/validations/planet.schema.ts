import { z } from 'zod';

const nameValidation = z.string()
    .min(1, 'O nome do planeta é obrigatório')
    .max(100, 'O nome do planeta não pode ultrapassar de 100 caracteres')
    .trim();

const climateValidation = z.string()
    .min(1, 'O clima é obrigatório')
    .max(100, 'O clima não pode ultrapassar de 100 caracteres')
    .trim();

const terrainValidation = z.string()
    .min(1, 'O terreno é obrigatório')
    .max(200, 'O terreno não pode ultrapassar de 200 caracteres')
    .trim();

const populationValidation = z.union([
    z.number().int().positive('A população deve conter números positivos'),
    z.null()
]).optional();

const validateSchema = z.object({
    name: nameValidation,
    climate: climateValidation,
    terrain: terrainValidation,
    population: populationValidation 
});

const planetSchema = {
    validateSchema
};

export default planetSchema;