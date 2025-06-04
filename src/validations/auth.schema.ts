import { Affiliation } from '@interfaces/affiliation.interface';
import { z } from 'zod';

const nameValidation = z.string()
    .min(6, 'O nome deve conter pelo menos 6 caracteres')
    .max(100, 'O nome não pode ultrapassar de 100 caracteres')
    .regex(/^[a-zA-Z0-9_-]+$/, 'O nome só pode conter letras, números, hifens e sublinhados')
    .refine((value) => !/^\d+$/.test(value), {
        message: 'O nome não pode conter somente números',
    })
    .refine((value) => !/[@$!%*?&]/.test(value), {
        message: 'O nome não pode conter caracteres especiais como: @$!%*?&',
    });

const passwordValidation = z.string()
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .max(100, 'A senha não pode ultrapassar de 100 caracteres')
    .regex(/[AZ]/, 'A senha deve incluir pelo menos uma letra maiúscula') 
    .regex(/[az]/, 'A senha deve incluir pelo menos uma letra minúscula') 
    .regex(/[0-9]/, 'A senha deve incluir pelo menos um número') 
    .regex(/[@$!%*?&]/, 'A senha deve incluir pelo menos um caractere especial'); 

const register = z.object({
    name: nameValidation,
    email: z.string().email('Formato de e-mail inválido'),
    affiliation: z.nativeEnum(Affiliation, {
        required_error: 'A afiliação é necessária',
        invalid_type_error: 'Afiliação inválido'
    }),
    password: passwordValidation,
    confirm_password: z.string().min(1, 'Confirmação de senha necessário'),
}).refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'As senhas não correspondem'
});

const login = z.object({
    email: z.string().trim().min(1, 'O e-mail é necessário').email('Formato de e-mail inválido'),
    password: z.string().min(1, 'A senha é necessária')
});

const authSchema = {
    login,
    register
};

export default authSchema;