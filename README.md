# 🎮 Loja de Games — Backend API

API REST desenvolvida com **NestJS** e **TypeORM** para gerenciamento de uma loja de games, com cadastro de produtos e categorias. Projeto desenvolvido durante o Bootcamp Fullstack da **Generation Brasil**.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/) *(ou banco configurado no projeto)*
- [Insomnia](https://insomnia.rest/) *(para testes das rotas)*

---

## 📁 Estrutura do Projeto

```
src/
├── categoria/
│   ├── controllers/
│   │   └── categoria.controller.ts
│   ├── entitites/
│   │   └── categoria.entity.ts
│   ├── services/
│   │   └── categoria.service.ts
│   └── categoria.module.ts
├── produto/
│   ├── controllers/
│   │   └── produto.controller.ts
│   ├── entitites/
│   │   └── produto.entity.ts
│   ├── services/
│   │   └── produto.service.ts
│   └── produto.module.ts
├── util/
│   └── numerictransformer.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

---

## 🗂️ Modelo de Dados

O projeto possui duas entidades que se relacionam:

- **Categoria** — representa a categoria do game (ex: RPG, Ação, Esporte)
- **Produto** — representa o game em si, com nome, preço e vínculo a uma categoria

> Relacionamento: **Produto N → 1 Categoria**

---

## 📌 Endpoints

### Produtos — `/produtos`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/produtos` | Lista todos os produtos |
| `GET` | `/produtos/:id` | Busca produto por ID |
| `GET` | `/produtos/nome/:nome` | Busca produtos pelo nome |
| `GET` | `/produtos/preco/maior/:preco` | Lista produtos com preço maior que o valor informado (ordem crescente) |
| `GET` | `/produtos/preco/menor/:preco` | Lista produtos com preço menor que o valor informado (ordem decrescente) |
| `POST` | `/produtos` | Cria um novo produto |
| `PUT` | `/produtos` | Atualiza um produto existente |
| `DELETE` | `/produtos/:id` | Remove um produto pelo ID |

### Categorias — `/categorias`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/categorias` | Lista todas as categorias |
| `GET` | `/categorias/:id` | Busca categoria por ID |
| `POST` | `/categorias` | Cria uma nova categoria |
| `PUT` | `/categorias` | Atualiza uma categoria existente |
| `DELETE` | `/categorias/:id` | Remove uma categoria pelo ID |

---

## 📝 Exemplos de Requisição

### Criar Produto — `POST /produtos`

```json
{
  "nome": "The Last of Us Part II",
  "preco": 199.90,
  "foto": "https://link-da-imagem.com/foto.jpg",
  "categoria": {
    "id": 1
  }
}
```

### Atualizar Produto — `PUT /produtos`

```json
{
  "id": 1,
  "nome": "The Last of Us Part II Remastered",
  "preco": 219.90,
  "foto": "https://link-da-imagem.com/foto.jpg",
  "categoria": {
    "id": 1
  }
}
```

### Criar Categoria — `POST /categorias`

```json
{
  "tipo": "Ação/Aventura"
}
```

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- Node.js v18+
- npm ou yarn
- Banco de dados MySQL rodando localmente

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/desafio-backend-loja-games.git

# Entre na pasta do projeto
cd desafio-backend-loja-games

# Instale as dependências
npm install
```

### Configuração do Banco de Dados

Configure as credenciais do banco no arquivo `app.module.ts` (ou no arquivo de configuração de ambiente):

```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'sua-senha',
  database: 'db_loja_games',
  entities: [Produto, Categoria],
  synchronize: true,
})
```

### Executando

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod
```

A API estará disponível em: `http://localhost:4000`

---

## ✅ Funcionalidades Implementadas

- [x] CRUD completo de Produtos
- [x] CRUD completo de Categorias
- [x] Relacionamento entre Produto e Categoria
- [x] Busca de produtos por nome (busca parcial com `ILike`)
- [x] Busca de produtos por preço maior que um valor (`MoreThan`)
- [x] Busca de produtos por preço menor que um valor (`LessThan`)
- [x] Validação de existência da categoria ao criar/atualizar produto
- [x] Tratamento de erros com `HttpException`
- [x] Testes realizados via Insomnia

---

