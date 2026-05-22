import prisma from '../../../database/prismaClient';
import { Mesa } from '../Interfaces/InterfaceMesas';

export class RepositorioMesas {
  async criarMesa(numero: string): Promise<Mesa | null> {
    const novaMesa = await prisma.mesas.create({ data: { numero } });
    return novaMesa;
  }

  async pesquisarPorId(id: string): Promise<Mesa | null> {
    return await prisma.mesas.findUnique({
      where: { id },
    });
  }

  async pesquisarPorNumero(numero: string): Promise<Mesa | null> {
    return await prisma.mesas.findFirst({
      where: {
        numero,
      },
    });
  }

  async pesquisarTodas(): Promise<Mesa[]> {
    const mesas = await prisma.mesas.findMany();
    const mesasOrdenadas = mesas.sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
    return mesasOrdenadas;
  }

  async atualizarMesa({ id, numero }: Mesa): Promise<Mesa | null> {
    return await prisma.mesas.update({
      where: {
        id,
      },
      data: {
        numero,
      },
    });
  }

  async apagarMesa(id: string): Promise<Mesa | null> {
    return await prisma.mesas.delete({
      where: {
        id,
      },
    });
  }
}
