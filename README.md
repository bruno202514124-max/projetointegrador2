# Projeto Integrador II - Bulldog Brewer

## Descrição do Projeto

Este projeto tem como objetivo analisar e propor melhorias no processo de atendimento ao cliente da empresa **Bulldog Brewer**, localizada em Terra de Areia/RS.

A partir de um diagnóstico realizado no local, foi identificada uma fragilidade no sistema de comandas utilizado durante eventos, onde múltiplos clientes em uma mesma mesa não conseguem ter seus pedidos separados individualmente, gerando dificuldades no controle, erros e atrasos no atendimento.

## Objetivo Geral

Otimizar o processo de pedidos e atendimento ao cliente por meio da individualização de comandas e da implementação de um dashboard para apoio à tomada de decisão.

## Objetivos Específicos

- Analisar o funcionamento atual do sistema de comandas
- Identificar falhas no controle de pedidos em eventos
- Propor solução para divisão de comandas por cliente
- Desenvolver um protótipo de sistema utilizando Bootstrap
- Criar um dashboard para visualização de dados

## Tecnologias Utilizadas

- HTML
- CSS
- Bootstrap
- JavaScript / Typescript
- React / Next

## Solução Proposta

A solução consiste no desenvolvimento de um sistema web que permita:

- Cadastro de mesas
- Adição de múltiplos clientes por mesa
- Separação de comandas por pessoa
- Registro de pedidos individuais
- Visualização de dados por meio de dashboard

## Funcionalidades Esperadas

- Controle individual de pedidos por cliente
- Organização do fluxo de atendimento
- Redução de erros em eventos
- Dashboard com indicadores de desempenho

## Integrantes do Grupo

- Alexandre Becker Filho
- Brenda Matos dos Santos
- Bruno Dada Pinto
- Igor Demozi Jardim da Silva
- Luan da Silva Marques

## Instituição Parceira

Bulldog Brewer – Terra de Areia/RS

## Resultados Esperados

- Melhoria na organização dos pedidos
- Redução de erros no atendimento
- Aumento da satisfação dos clientes
- Apoio à gestão com uso de dados

## Observações

Este projeto tem caráter acadêmico e será desenvolvido como parte do Projeto Integrador II, com foco em análise de processos e proposição de melhorias baseadas em dados.

## Backend

Para rodar o backend, faça o seguinte:

- Vá até a pasta do back e abra um terminal.
- Rode "npm i" para instalar as dependências do projeto.
- Crie um arquivo .env na pasta raiz do backend e, dentro deste arquivo, escreva: DATABASE_URL="file:./prisma/db/pi2.db". Isso serve pra definir a localização do arquivo de banco de dados.
- Rode "npm run migrate" e "npm run generate" para criar o banco de dados e a conexão com ele.
- Rode "npm run dev" para iniciar o backend no port 2000.

Pronto! O back está rodando! Agora é só fazer as requisições!

## Endereços do back

- Usuários
  - GET /usuarios/ - retorna todos os usuários.
  - POST /usuarios/login { nome: string, senha: string } - realiza o login e retorna um token de acesso.
  - POST /usuarios/criar { nome: string, senha: string, permissao: string } - cria o usuário e retorna os dados do usuário criado.
  - PATCH /usuarios/atualizar { id: string, nome: string, senha: string, permissao: string } - atualiza os dados do usuário e retorna os dados atualizados.
  - DELETE /usuarios/deletar/:id - apaga o usuário.

- Itens
  - GET /itens/ - retorna todos os itens.
  - POST /itens/criar { nome: string, preco: number, bebida: boolean } - cria o item e retorna os dados do item criado.
  - PATCH /itens/atualizar { id: string, nome: string, preco: number, bebida: boolean } - atualiza os dados do item e retorna os dados atualizados.
  - DELETE /itens/deletar/:id - apaga o item.

- Pedidos
  - GET /pedidos/ - retorna todos os pedidos ativos. Cada pedido já é retornado com seus itens.
  - POST /pedidos/criar { cliente: string, pessoas: number, itens: { id: string, qtd: number }[], idCartao: string} - cria o pedido e retorna os dados do pedido criado.
  - POST /pedidos/relatorioMes { mes: number, ano: number } - retorna o lucro do mês, o número de vendas e o rank de itens mais vendidos. IMPORTANTE: o mês é um número de índice 0. Exemplo: janeiro = 0, fevereiro = 1, março = 2, e assim por diante.
  - POST /pedidos/relatorioDia { diaDoMes: number, mes: number, ano: number } - retorna o número de vendas e o lucro total do dia. IMPORTANTE: o mês é um número de índice 0. Exemplo: janeiro = 0, fevereiro = 1, março = 2, e assim por diante.
  - POST /pedidos/incluirItem { idPedido: string, idItem: string, valorItem: number, qtdItem: number} - adiciona um item em um pedido já criado.
  - PATCH /pedidos/desativarPedido { id: string } - desativa o pedido.
  - PATCH /pedidos/alterarStatus { idPedido: string, idItem: string, status: string } - altera o status de um item em um determinado pedido.
  - DELETE /pedidos/removerItem/:idPedido/:idItem - remove o item do pedido.
  - DELETE /pedidos/deletarPedido/:id - apaga o pedido.

- Cartões
  - GET /cartoes/ - retorna todos os cartões.
  - POST /cartoes/criar { numero: string } - cria o cartão e retorna os dados do cartão criado.
  - PATCH /cartoes/atualizar { id: string, numero: string } - atualiza os dados do cartão e retorna os dados atualizados.
  - DELETE /cartoes/deletar/:id - apaga o cartão.

- Mesas
  - GET /mesas/ - retorna todas as mesas.
  - POST /mesas/criar { numero: string } - cria a mesa e retorna os dados da mesa criada.
  - PATCH /mesas/atualizar { id: string, numero: string } - atualiza os dados da mesa e retorna os dados atualizados.
  - DELETE /mesas/deletar/:id - apaga a mesa.
