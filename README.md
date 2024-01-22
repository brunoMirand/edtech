# Plataforma de gerenciamento e visualização de conteúdos

### Requisitos de negócio:

- [x] Essa API não será pública e será utilizada por dois níveis de usuário: administrador e estudante;

- [x] Os conteúdos deverão ser gerenciados (criação, atualização e deleção) somente por usuários administradores;

- [x] Os usuários estudantes poderão apenas visualizar a listagem dos conteúdos disponibilizados na plataforma, e os detalhes específicos de cada um;

- [x] Os conteúdos deverão ter obrigatoriamente nome, descrição, e tipo;
- [x] Deverão ser permitidas apenas três strings no tipo do conteúdo: **video**, **pdf** ou **image**;
- [x] Será necessário contabilizar as visualizações **únicas** dos **estudantes** ao acessarem os detalhes do conteúdo

### Pre-requisitos:
- nodejs
- npm
- docker-compose

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
- git clone git@github.com:brunoMirand/edtech.git && cd edtech

2. Gere o .env
- cp .env.example .env

3. Instale as dependências do projeto
- npm install

4. Suba a API, Banco de dados e Redis
- npm run start:dev
- npm rub db:migrate

#### Após esse primeiro setup, nas demais vezes quer for subir o projeto, apenas o comando (npm run start:dev) basta.

---
### Testes

##### Unitários
```sh
npm run test:unit
```
**Ferramenta**: Jest
> Conceitos de mock, stubs e in memory database.

#### Integração
```sh
npm run test:integration
```

**Ferramenta**: Supertest

> Tanto para a camada de Bando de dados e Cache, foi usando o conceito de isolamento de ambiente nos testes de integração, com foco na necessidade de se ter um banco de dados de testes separados do banco de dados de produção e desenvolvimento.

---

### Estratégias de Desempenho:

1. Uso do framework Fastify que traz um benchmark interessante sobre sobrecarga de estrutura do framework em relação aos demais do mesmo ecossistema. [benchmarks](https://fastify.dev/benchmarks/)

2. Abordagem de páginação dos contéudos listado, deixando fixo o valor de limite por páginas e apenas podendo andar de página em página.

3. Ruduzindo propriedades do conteúdo na listagem, deixando apenas o id conteúdo e o nome.

4. Utilização de uma camada de cache para armazenar os conteúdos:

>- A estratégia adotada foi o **caching da lista de conteúdos**, considerando que o objeto pode sofrer poucas alterações em seu ciclo de vida. Além disso, optei por retornar apenas o id e nome do conteúdo na listagem.

>- Decidi não armazenar em cache os detalhes do conteúdo quando um estudante o acessa. Isso se deve à volatilidade da propriedade **"views"**, que está sempre em constante atualização. Nesse cenário, gravar e invalidar o cache não proporciona ganhos significativos de desempenho e processamento da aplicação.

>- Em casos de atualização ou remoção de algum conteúdo, todas as páginas em cache não são removidas. **Essa decisão foi desafiadora, mas não encontrei uma solução mais rápida e eficiente para esse contexto específico**.
