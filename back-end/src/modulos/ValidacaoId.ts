import z from 'zod';

export const ValidacaoId = z.object({
  id: z.string({ message: 'campo obrigatório.' }),
});
