import { Response } from 'express';
import { EmitirMensagemErro } from './EmitirMensagemErro';

interface TratarErroProps {
  res: Response<any, Record<string, any>>;
  err: unknown;
}

export function tratarErro({ res, err }: TratarErroProps) {
  if (err instanceof EmitirMensagemErro) {
    return res.status(err.codigo).json(err);
  } else {
    return res.json(err);
  }
}
