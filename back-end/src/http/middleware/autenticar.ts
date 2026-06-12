import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { EmitirMensagemErro } from '../../erros/EmitirMensagemErro';
import { tratarErro } from '../../erros/TratarErro';

export const SECRET_KEY: Secret = 'minhaassinaturaparapoderusarautenticacaoviatoken';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const autenticar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new EmitirMensagemErro('Token inválido.', 401);
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    tratarErro({ res, err });
  }
};
