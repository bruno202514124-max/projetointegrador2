import z from 'zod';

export const ValidacaoRelatorioDia = z.object({
  diaDoMes: z.number('este campo é obrigatório e precisa ser um número.'),
  mes: z.number('este campo é obrigatório e precisa ser um número.'),
  ano: z.number('este campo é obrigatório e precisa ser um número.'),
});
