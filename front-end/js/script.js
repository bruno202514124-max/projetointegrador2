
    let pedido = [];

    function formatarMoeda(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }

    function atualizarDataHora() {
      const agora = new Date();
      document.getElementById("dataHora").innerText =
        agora.toLocaleDateString("pt-BR") + " " +
        agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    }

    atualizarDataHora();
    setInterval(atualizarDataHora, 60000);

    document.getElementById("mesa").addEventListener("change", atualizarResumo);
    document.getElementById("comanda").addEventListener("change", atualizarResumo);
    document.getElementById("cliente").addEventListener("input", atualizarResumo);

    function atualizarResumo() {
      document.getElementById("resumoMesa").innerText = document.getElementById("mesa").value;
      document.getElementById("resumoComanda").innerText = document.getElementById("comanda").value;
      const cliente = document.getElementById("cliente").value.trim();
      document.getElementById("resumoCliente").innerText = cliente || "Não informado";
    }

    function adicionarItem(nome, setor, preco) {
      const itemExistente = pedido.find(item => item.nome === nome);

      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        pedido.push({ nome, setor, preco, quantidade: 1 });
      }

      atualizarTabelaPedido();
    }

    function removerItem(index) {
      pedido.splice(index, 1);
      atualizarTabelaPedido();
    }

    function atualizarTabelaPedido() {
      const tabela = document.getElementById("tabelaPedido");
      const vazio = document.getElementById("pedidoVazio");
      const container = document.getElementById("tabelaPedidoContainer");

      tabela.innerHTML = "";
      let subtotal = 0;

      if (pedido.length === 0) {
        vazio.style.display = "block";
        container.style.display = "none";
      } else {
        vazio.style.display = "none";
        container.style.display = "block";
      }

      pedido.forEach((item, index) => {
        const totalItem = item.preco * item.quantidade;
        subtotal += totalItem;

        tabela.innerHTML += `
          <tr>
            <td>${item.nome}</td>
            <td class="text-center">${item.quantidade}</td>
            <td class="text-end">${formatarMoeda(totalItem)}</td>
            <td class="text-end">
              <button class="remove-btn" onclick="removerItem(${index})">✕</button>
            </td>
          </tr>
        `;
      });

      const taxa = subtotal * 0.10;
      const total = subtotal + taxa;

      document.getElementById("subtotal").innerText = formatarMoeda(subtotal);
      document.getElementById("taxa").innerText = formatarMoeda(taxa);
      document.getElementById("total").innerText = formatarMoeda(total);
    }

    function limparPedido() {
      pedido = [];
      document.getElementById("observacoes").value = "";
      atualizarTabelaPedido();
    }

    function enviarPedido() {
      if (pedido.length === 0) {
        alert("Adicione pelo menos um item ao pedido.");
        return;
      }

      const modal = new bootstrap.Modal(document.getElementById("modalPedido"));
      modal.show();
    }

    function filtrarProdutos() {
      const termo = document.getElementById("buscaProduto").value.toLowerCase();
      const produtos = document.querySelectorAll(".produto-item");

      produtos.forEach(produto => {
        const nome = produto.getAttribute("data-nome").toLowerCase();
        produto.style.display = nome.includes(termo) ? "block" : "none";
      });
    }
  