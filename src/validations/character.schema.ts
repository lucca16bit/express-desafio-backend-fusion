import { Affiliation } from '@interfaces/affiliation.interface';
import { Race } from '@interfaces/race.interface';
import { z } from 'zod';

const nameValidation = z.string()
    .min(1, 'O nome é obrigatório')
    .max(100, 'O nome do personagem não pode ultrapassar de 100 caracteres')
    .trim();

const validateSchema = z.object({
    name: nameValidation,
    race: z.nativeEnum(Race, {
        required_error: 'A raça é necessária',
        invalid_type_error: 'Raça inválido'
    }),
    affiliation: z.nativeEnum(Affiliation, {
        required_error: 'A afiliação é necessária',
        invalid_type_error: 'Afiliação inválido'
    }),
    homePlanetId: z.number().nullable().optional()
});

const characterSchema = {
    validateSchema
};

export default characterSchema;