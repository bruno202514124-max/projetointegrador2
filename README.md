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
- JavaScript
- Bootstrap

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

## Estrutura do Projeto

projeto-integrador-bulldog

- README.md
- docs/
- sistema/
- evidencias/

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
- Rode "npm run dev" para iniciar o backend no port 2000.

Pronto! O back está rodando! Agora é só fazer as requisições!

## Endereços do back

- Usuários
  - GET /usuarios/ - retorna todos os usuários.
  - POST /usuarios/login { nome, senha } - realiza o login e retorna um token de acesso.
  - POST /usuarios/criar { nome, senha, permissao } - cria o usuário e retorna os dados do usuário criado.
  - PATCH /usuarios/atualizar { id, nome, senha, permissao } - atualiza os dados do usuário e retorna os dados atualizados.
  - DELETE /usuarios/deletar/:id - apaga o usuário.
