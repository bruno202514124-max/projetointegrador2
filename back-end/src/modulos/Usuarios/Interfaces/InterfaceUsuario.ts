interface IUsuario {
  id: string;
  nome: string;
  senha: string;
  permissao: string;
}

class Usuario {
  id: string;
  nome: string;
  senha: string;
  permissao: string;

  constructor(props: IUsuario) {
    Object.assign(this, props);
  }
}

export { Usuario };
