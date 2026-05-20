import z from 'zod';

export const ValidacaoCriarCartao = z.object({
  numero: z.string({ message: 'campo obrigatório.' }).regex(/^\d+$/, 'precisa ser um número inteiro.'),
});
