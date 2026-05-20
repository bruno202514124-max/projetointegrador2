import { z, ZodError } from 'zod';
import { EmitirMensagemErro } from '../erros/EmitirMensagemErro';

export function validarDados(validator: z.ZodObject, data: unknown) {
  try {
    validator.parse(data);
  } catch (err) {
    const mensagemDeErro = `${String((err as ZodError).issues[0].path[0])}: ${(err as ZodError).issues[0].message}`;

    console.log('erro => ', mensagemDeErro);

    throw new EmitirMensagemErro(mensagemDeErro);
  }
}
