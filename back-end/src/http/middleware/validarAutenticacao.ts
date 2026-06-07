import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import prisma from '../../database/prismaClient';
import { EmitirMensagemErro } from '../../erros/EmitirMensagemErro';
import { SECRET_KEY } from './autenticar';

interface IPayload {
  id: string;
  permissao: string;
}

export async function validarAutenticacao(req: Request, res: Response, next: NextFunction) {
  const autentHeader = req.headers.authorization as string;

  if (!autentHeader) {
    const err = new EmitirMensagemErro('Usuario inválido!', 401);

    return next(err);
  }

  const [, token] = autentHeader.split(' ');

  try {
    const { id: id } = verify(token, SECRET_KEY) as IPayload;

    const usuarioExistente = await prisma.usuario.findFirst({
      where: {
        id: id,
      },
    });

    if (!usuarioExistente) {
      return next(new EmitirMensagemErro('Usuário não existe!', 401));
    }

    const usuario: IPayload = { id: usuarioExistente.id, permissao: usuarioExistente.permissao };

    req.usuario = { ...usuario };

    next();
  } catch (error) {
    console.log(error);
    const err = new EmitirMensagemErro('Token inválido!', 401);
    return next(err);
  }
}
