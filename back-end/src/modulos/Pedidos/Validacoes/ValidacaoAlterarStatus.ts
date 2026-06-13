import z from 'zod';

export const ValidacaoAlterarStatus = z.object({
  idPedido: z.string('campo obrigatório.'),
  idItem: z.string('campo obrigatório.'),
  status: z.union([z.literal('pendente'), z.literal('preparando'), z.literal('pronto')], {
    error: "precisa ser 'pendente', 'preparando' ou 'pronto'.",
  }),
});
