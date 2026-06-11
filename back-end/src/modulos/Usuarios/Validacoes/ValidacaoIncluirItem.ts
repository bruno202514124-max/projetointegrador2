import z from 'zod';

export const ValidacaoIncluirItem = z.object({
  idPedido: z.string('campo obrigatório.'),
  idItem: z.string('campo obrigatório.'),
  valorItem: z.number('campo obrigatório.'),
  qtdItem: z.number('campo obrigatório.').min(1, 'É necessário pelo menos 1 unidade do item.'),
});
