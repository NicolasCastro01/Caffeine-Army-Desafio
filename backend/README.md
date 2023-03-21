# Caffeine Army - API

A API serve para autenticar e para buscar lojas, pelo cnpj, associadas ao lojista autenticado.

para o teste da api: pode ser utilizado o arquivo que está na pasta ".insomnia", assim que importado, todas as rotas disponíveis da API estará para uso.

## Funcionalidades

- Autenticação
- Busca pela loja através do cnpj (cadastrado no banco de dados)

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

`JWT_SECRET`

## Inicialização

Para instalar as dependências utilize:

```bash
  npm install
```

Para iniciar a API

```bash
  npm start
```

Para ver a cobertura dos testes

```bash
  npm run test:ci
```

## Documentação da API

#### Retorna o usuário (caso exista) e o token de autenticação

```http
  POST /login
```

| Parâmetro | Tipo     |
| :-------- | :------- |
| `email`   | `string` |
| `senha`   | `string` |

#### Retorna o usuário cadastrado

```http
  POST /register
```

| Parâmetro | Tipo     |
| :-------- | :------- |
| `name`    | `string` |
| `email`   | `string` |
| `phone`   | `string` |
| `senha`   | `string` |

#### Retorna a loja associada ao lojista logado

```http
  GET /api/v1/shopkeeper/store?cnpj={cnpj}
```

| Parâmetro | Tipo     | Descrição                                                  |
| :-------- | :------- | :--------------------------------------------------------- |
| `cnpj`    | `string` | **Obrigatório autenticação**. O CNPJ da loja que você quer |

## Stack utilizada

**Back-end:** Nestjs, Typescript, MySQL e prisma.
