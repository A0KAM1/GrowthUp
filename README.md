# ES3

Este repositório contém o projeto da disciplina de Engenharia de Software 3 do curso de Análise e Desenvolvimento de Sistemas da FATEC Taquaritinga. O projeto consiste em um sistema de gestão financeira pessoal que permite ao usuário cadastrar suas receitas e despesas e gerar relatórios com base nos dados cadastrados.

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/) para o backend
- [PostgreSQL](https://www.postgresql.org/) para o banco de dados
- [Prisma](https://www.prisma.io/) para o ORM
- [Yarn](https://yarnpkg.com/) para o gerenciamento de pacotes
- ~~[não definido]() para o frontend~~

## Como executar

Primeiramente, é necessário clonar o repositório:

```bash
# Clonar o repositório
git clone https://github.com/Psykka/ES3.git
```

Esse projeto utiliza o `Yarn` como gerenciador de pacotes, portanto é necessário instalar o [Node.js](https://nodejs.org/) para poder utilizar o Yarn. Após instalar o Node.js, utilize o comando abaixo para instalar o Yarn:

```bash
# Necessario executar o terminal como administrador
corepack enable
```

Após instalar o Yarn, é necessário instalar as dependências do projeto. Para isso, execute o comando abaixo:

```bash
yarn install
```

Após instalar as dependências, é necessário criar um arquivo com o nome `.env` na raiz do projeto e preencher as variáveis de ambiente com base no arquivo `.env.example`.

Depois de configurar as variáveis de ambiente, é necessário criar o banco de dados. Para isso, execute o comando abaixo:

```bash
# Este passo é necessário apenas na primeira execução
# ou quando houver alterações nos modelos do banco de dados

# Em desenvolvimento
yarn prisma migrate dev

# Em produção
yarn prisma migrate deploy
```

Após criar o banco de dados, é necessário criar seus modelos. Para isso, execute o comando abaixo:

```bash
yarn db:gen
```

Após criar o banco de dados e seus modelos, o projeto estará pronto para o desenvolvimento. Para executar o projeto, utilize o comando abaixo:

```bash
yarn workspace api dev
```
