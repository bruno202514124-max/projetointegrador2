import { z } from 'zod';

export const ValidacaoCriarUsuario = z.object({
  nome: z.string({ message: 'é obrigatório.' }),
  senha: z.string().min(8, { message: 'deve ter ao menos 8 caracteres.' }),
  permissao: z.union([z.literal('Frente'), z.literal('Retaguarda'), z.literal('Administrador')], {
    error: "precisa ser 'Frente', 'Retaguarda' ou 'Administrador'.",
  }),
});
