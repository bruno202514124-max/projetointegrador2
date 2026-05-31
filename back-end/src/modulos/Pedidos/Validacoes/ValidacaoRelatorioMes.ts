import z from 'zod';

export const ValidacaoRelatorioMes = z.object({
  mes: z.number('este campo é obrigatório e precisa ser um número.'),
  ano: z.number('este campo é obrigatório e precisa ser um número.'),
});
