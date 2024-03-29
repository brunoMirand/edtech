# Plataforma de gerenciamento e visualização de conteúdos
[![ci](https://github.com/brunoMirand/edtech/actions/workflows/ci.yml/badge.svg?event=pull_request)](https://github.com/brunoMirand/edtech/actions/workflows/ci.yml)
### Requisitos de negócio:

- [x] Essa API não será pública e será utilizada por dois níveis de usuário: administrador e estudante;
- [x] Os conteúdos deverão ser gerenciados (criação, atualização e deleção) somente por usuários administradores;
- [x] Os usuários estudantes poderão apenas visualizar a listagem dos conteúdos disponibilizados na plataforma, e os detalhes específicos de cada um;
- [x] Os conteúdos deverão ter obrigatoriamente nome, descrição, e tipo;
- [x] Deverão ser permitidas apenas três strings no tipo do conteúdo: **video**, **pdf** ou **image**;
- [x] Será necessário contabilizar as visualizações **únicas** dos **estudantes** ao acessarem os detalhes do conteúdo;

### Pre-requisitos:
- nodejs - v20.10.0
- npm - v10.2.3
- docker-compose - v2.23.3

---
### Tecnologias usadas:
- Fastify
- Typescript
- Prisma
- PostgreSQL
- Redis

---
#### Executando a API pela primeira vez:

1. Clone o projeto
```sh
git clone git@github.com:brunoMirand/edtech.git && cd edtech
```

2. Gere o .env
```sh
cp .env.example .env
```

3. Instale as dependências do projeto
```sh
npm install
```

4. Suba a API, Banco de dados e Redis
```sh
npm run start:dev # start app, redis, database
npm run db:migrate # execute migrate schema prisma
```

#### Após esse primeiro setup, nas demais vezes quer for subir o projeto, apenas o comando basta:
```sh
npm run start:dev
```

---
### Testes

##### Unitários
```sh
npm run test:unit
npm run test:coverage
```
**Ferramenta**: Jest
> Conceitos de mock, stubs e [in memory database](https://martinfowler.com/bliki/InMemoryTestDatabase.html).

#### Integração
```sh
npm run test:integration
```

**Ferramenta**: Supertest

> Tanto para a camada de Banco de dados e Cache, foi usando o conceito de isolamento de ambiente nos testes de integração, com foco na necessidade de se ter um banco de dados de testes separados do banco de dados de produção e desenvolvimento.

---

### Recursos da API

#### GET /healthcheck

###### Request
```sh
  GET http://localhost:4444/healthcheck
```
###### Response
```json
{
  "dependencies": [
    {
      "type": "database",
      "critical": true,
      "up": false
    },
    {
      "type": "redis",
      "critical": false,
      "up": true
    }
  ]
}
```
---

#### POST /tokens

###### Request
```sh
  POST http://localhost:4444/tokens
  content-type: application/json
  data {"userId":"321231546","role":"student"} # student ou admin
```
###### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInN1YiI6IjM2NTU1NSIsImlhdCI6MTcwNTk0MjkxM30.dwNSfUGgOWKRMa0JP2VhX2bEzUZ3ik2v9HN7tn7x2jw"
}
```
---

#### POST /contents
###### Request
```sh
  POST http://localhost:4444/contents
  authorization: Bearer ${token}
  content-type: application/json
  data {"name":"Acessibilidade Digital","description":"Saiba as boas práticas sobre o tema","type":"video"}
```
###### Response
```json
{
  "id": "29c7a665-af9a-4d01-b71a-74a02e4d7520",
  "name": "Acessibilidade Digital",
  "description": "Saiba as boas práticas sobre o tema",
  "type": "video",
  "views": 0,
  "created_at": "2024-01-22T17:49:34.853Z",
  "updated_at": "2024-01-22T17:49:34.853Z"
}
```
---

#### GET /contents
#### GET /contents/?page=1

###### Request
```sh
  GET http://localhost:4444/contents
  authorization: Bearer ${token}
```
###### Response
```json
[
  {
    "id": "bf127aec-7021-4fb6-9da2-1eb8f789abfe",
    "name": "Acessibilidade Digital"
  }
]
```
---

#### GET /contents/:id

###### Request
```sh
  GET http://localhost:4444/contents/bf127aec-7021-4fb6-9da2-1eb8f789abfe
  authorization: Bearer ${token}
```
###### Response
```json
{
  "id": "bf127aec-7021-4fb6-9da2-1eb8f789abfe",
  "name": "Acessibilidade Digital",
  "description": "Saiba as boas práticas sobre o tema",
  "type": "video",
  "views": 1,
  "created_at": "2024-01-22T21:38:58.300Z",
  "updated_at": "2024-01-22T21:38:58.300Z"
}
```
---

#### PUT /contents/:id

###### Request
```sh
  PUT http://localhost:4444/contents/bf127aec-7021-4fb6-9da2-1eb8f789abfe
  authorization: Bearer ${token}
  content-type: application/json
  data {"name":"Usar cache com paginação é complicado.","description":"díficil tomar decisões assim","type":"pdf"}
```

###### Response
```json
No content
```
---

#### DELETE /contents/:id
###### Request
```sh
DELETE http://localhost:4444/contents/bf127aec-7021-4fb6-9da2-1eb8f789abfe
authorization: Bearer ${token}
```

###### Response
```json
No content
```
---

### Estratégias de Desempenho

1. Uso do framework Fastify que traz um benchmark interessante sobre sobrecarga de estrutura do framework em relação aos demais do mesmo ecossistema. [benchmarks](https://fastify.dev/benchmarks/)

2. Abordagem de páginação dos conteúdos listado, deixando fixo o valor de limite por páginas e apenas podendo andar de página em página.

3. Reduzindo propriedades do conteúdo na listagem, deixando apenas o id conteúdo e o nome.

4. Utilização de uma camada de cache para armazenar os conteúdos:

>- A estratégia adotada foi o **caching da lista de conteúdos**, considerando que o objeto pode sofrer poucas alterações em seu ciclo de vida. Além disso, optei por retornar apenas o id e nome do conteúdo na listagem.

>- Decidi não armazenar em cache os detalhes do conteúdo quando um estudante o acessa. Isso se deve à volatilidade da propriedade **"views"**, que está sempre em constante atualização. Nesse cenário, gravar e invalidar o cache não proporciona ganhos significativos de desempenho e processamento da aplicação.

>- Em casos de atualização ou remoção de algum conteúdo, todas as páginas em cache são removidas. **Essa decisão foi desafiadora, mas não encontrei uma solução mais rápida e eficiente para esse contexto específico**.
**Até tenho outra solução mas depende muito do cenário, que é "não invalidar o cache e apenas esperar o seu tempo vida"**

### Estratégia de Desenvolvimento

1. Lib [zod](https://zod.dev/) para validação de schema da dados de entrada.

2. Lib acl para fazer a lista de controle de acesso aos recursos da api.

3. Jwt para a camada de validação por tokens.

4. Estrutura de logs implementada na aplicação.

5. Tratamentos de erros, sanitização de parametros.

6. Conceitos de SOLID.

7. CI com github actions
   
