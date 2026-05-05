import estiloCadastros from '@/css/cadastros.module.css';

interface ListaProps {
  titulo: string;
  itens: { id: string; numero: string }[];
  onClickEditar(): void;
  onClickDeletar(): void;
}

export default function Lista({ titulo, itens, onClickEditar, onClickDeletar }: ListaProps) {
  return (
    <div className="card-body">
      <h5 className="section-title mb-4">{titulo}</h5>

      {itens.map((item, index) => {
        return (
          <div
            key={index}
            className={`mb-3 d-flex flex-column gap-4 overflow-y-auto ${estiloCadastros.lista}`}
          >
            {/* bg-secondary bg-gradient */}
            <div
              className="d-flex justify-content-between bg-primary align-items-center rounded-1 px-3 py-2 "
              // style={{ backgroundColor: 'gray' }}
            >
              <p>Mesa {item.numero}</p>
              <div className="d-flex gap-4">
                <button className="py-1 px-2 btn btn-warning" onClick={() => alert('editar')}>
                  Editar
                </button>
                <p className="py-1 px-2 btn btn-danger" onClick={() => alert('deletar')}>
                  Deletar
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
