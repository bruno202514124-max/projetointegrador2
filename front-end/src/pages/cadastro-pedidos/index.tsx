import LayoutBase from '@/componentes/LayoutBase';
import styles from '@/css/base.module.css';

export default function CadastroPedidos() {
  return (
    <LayoutBase
      titulo="Cadastro de Pedidos"
      subtitulo="Base simples para cadastro de pedidos por mesa, comanda e cliente."
    >
      <div className="row g-4">
        <div className="col-lg-8">
          <section className={styles.cardBase}>
            <h2 className={styles.sectionTitle}>Dados da Mesa / Comanda</h2>

            <div className="row g-3">
              <div className="col-md-3">
                <label className={styles.formLabel}>Mesa</label>
                <select className="form-select">
                  <option>Mesa 01</option>
                  <option>Mesa 02</option>
                  <option>Mesa 03</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className={styles.formLabel}>Comanda</label>
                <select className="form-select">
                  <option>Comanda 001</option>
                  <option>Comanda 002</option>
                  <option>Comanda 003</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className={styles.formLabel}>Cliente</label>
                <input className="form-control" placeholder="Nome do cliente" />
              </div>

              <div className="col-md-2">
                <label className={styles.formLabel}>Pessoas</label>
                <input className="form-control" type="number" min="1" defaultValue="1" />
              </div>
            </div>
          </section>

          <section className={`${styles.cardBase} mt-4`}>
            <h2 className={styles.sectionTitle}>Itens do Pedido</h2>

            <p className={styles.helpText}>
              Aqui entram os produtos, bebidas e comidas. Esta área ficou como base para vocês evoluírem depois.
            </p>

            <div className="row g-3">
              <div className="col-md-6">
                <input className="form-control" placeholder="Produto" />
              </div>

              <div className="col-md-3">
                <input className="form-control" type="number" placeholder="Quantidade" />
              </div>

              <div className="col-md-3">
                <button className="btn btn-warning w-100 fw-bold">Adicionar</button>
              </div>
            </div>
          </section>
        </div>

        <div className="col-lg-4">
          <section className={styles.cardBase}>
            <h2 className={styles.sectionTitle}>Resumo</h2>

            <p className={styles.helpText}>Nenhum item adicionado ainda.</p>

            <hr className="border-secondary" />

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>R$ 0,00</strong>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <span>Total</span>
              <strong>R$ 0,00</strong>
            </div>

            <button className="btn btn-warning w-100 fw-bold mt-4">Enviar Pedido</button>
          </section>
        </div>
      </div>
    </LayoutBase>
  );
}
