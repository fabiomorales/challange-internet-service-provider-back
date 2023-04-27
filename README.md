# Internet Service Provider

Backend de sistema de provedor de internet

## 🚀 Começando

### 📋 Pré-requisitos

node 16+
Docker
KnexJs

Instalação do Knex JS de forma global

```
npm install -g knex
```

Ou

```
yarn global add knex
```

Ou

```
npx knex
```

Instalação das dependencias

```
yarn install
```

Ou

```
npm i
```

Antes de rodar o projeto precisamos configurar o banco de dados

Criação do container Docker com imagem do Postgresql

```
docker run --name internet_service_provider_db -e POSTGRES_DB=internet_service_provider -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Acessando o banco de dados criado pelo docker atraves do DBeaver

- crie uma nova conexão com o banco de dados postgresql
- host: localhost
- port: 5432
- database: internet_service_provider
- username: postgres
- password: postgres

Agora precisamos criar as tabelas no nosso banco de dados utilizando as migrations do Knex.

Para rodar as migrations utilize o comando abaixo

```
yarn migrate:run
```

Ou

```
npm run migrate:run
```

Agora vamos popular o banco com as informações padrão utilizando as seeds do Knex.

Para rodar as seeds utilize o comando abaixo

```
yarn seed:run
```

Ou

```
npm run seed:run
```

Para iniciar o prjeto em modo de desenvolvimento utilize o comando abaixo

```
yarn dev
```

Ou

```
npm run dev
```
