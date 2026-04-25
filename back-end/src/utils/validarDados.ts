import { z, ZodError } from 'zod';
import { EmitirMensagemErro } from '../erros/EmitirMensagemErro';

export function validarDados(validator: z.ZodObject, data: unknown) {
  try {
    validator.parse(data);
  } catch (err) {
    const error = `${String((err as ZodError).issues[0].path[0])} ${(err as ZodError).issues[0].message}`;
    const mensagemDeErroFormatada = error.charAt(0).toUpperCase() + error.slice(1);

    console.log('erro => ', mensagemDeErroFormatada);
    console.log('data => ', data);

    throw new EmitirMensagemErro(mensagemDeErroFormatada);
  }
}
