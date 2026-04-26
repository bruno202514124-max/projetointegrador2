import { z } from 'zod';

export const ValidacaoLogarUsuario = z.object({
  nome: z.string({ message: 'é obrigatório.' }),
  senha: z.string().min(8, { message: 'A senha deve ter ao menos 8 caracteres.' }),
});
