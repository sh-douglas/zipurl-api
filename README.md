# 📌 ZipURL API Documentation

## 🔗 Base URL

```
http://localhost:PORT/api/v1
```

---

# 🔐 Autenticação

A API utiliza **JWT (Bearer Token)**.

### Header obrigatório para rotas protegidas:

```
Authorization: Bearer <token>
```

---

# 👤 Auth

## ➤ Criar usuário

**POST** `/auth/signup`

### Body

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

### Response `201`

```json
{
  "id": "1",
  "name": "João Silva",
  "email": "joao@email.com"
}
```

### Errors

- `409` → E-mail já cadastrado

---

## ➤ Login

**POST** `/auth/signin`

### Body

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Response `200`

```json
{
  "user": {
    "id": "1",
    "name": "João Silva",
    "email": "joao@email.com"
  },
  "token": "jwt.token.aqui"
}
```

### Errors

- `401` → Credenciais inválidas

---

## ➤ Usuário autenticado

**GET** `/auth/me`

🔒 Requer token

### Response `200`

```json
{
  "id": "1",
  "name": "João Silva",
  "email": "joao@email.com"
}
```

---

# 🔗 URLs

## ➤ Criar URL encurtada

**POST** `/urls/shorten`

🔒 Requer token

### Body

```json
{
  "longUrl": "https://google.com"
}
```

### Response `201`

```json
{
  "urlId": 1,
  "longUrl": "https://google.com",
  "shortUrl": "abc123",
  "fullShortUrl": "http://localhost:3000/abc123",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

### Errors

- `400` → Dados inválidos

---

## ➤ Listar URLs do usuário

**GET** `/urls`

🔒 Requer token

### Response `200`

```json
[
  {
    "urlId": 1,
    "longUrl": "https://google.com",
    "shortUrl": "abc123",
    "fullShortUrl": "http://localhost:3000/abc123",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
]
```

---

## ➤ Buscar URL por ID

**GET** `/urls/:id`

🔒 Requer token

### Response `200`

```json
{
  "urlId": 1,
  "longUrl": "https://google.com",
  "shortUrl": "abc123",
  "fullShortUrl": "http://localhost:3000/abc123",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

### Errors

- `404` → Link não encontrado

---

## ➤ Atualizar URL

**PUT** `/urls/:id`

🔒 Requer token

### Body

```json
{
  "longUrl": "https://novo-link.com"
}
```

### Response `200`

```json
{
  "urlId": 1,
  "longUrl": "https://novo-link.com",
  "shortUrl": "abc123",
  "fullShortUrl": "http://localhost:3000/abc123",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

### Errors

- `404` → Link não encontrado

---

## ➤ Deletar URL

**DELETE** `/urls/:id`

🔒 Requer token

### Response `204`

Sem conteúdo

### Errors

- `404` → Link não encontrado

---

# 🔁 Redirecionamento

## ➤ Acessar URL encurtada

**GET** `/:shortCode`

### Comportamento

- Redireciona para `longUrl`

### Errors

- `404` → Link não encontrado

---

# ⚠️ Padrão de erros

### Estrutura

```json
{
  "error": "Mensagem de erro"
}
```

### Status comuns

| Status | Descrição                       |
| ------ | ------------------------------- |
| 400    | Dados inválidos                 |
| 401    | Não autenticado                 |
| 404    | Não encontrado                  |
| 409    | Conflito (ex: e-mail duplicado) |
| 500    | Erro interno                    |

---

# 📦 Observações

- Todas as rotas `/urls` são protegidas por JWT
- O campo `urlId` é o identificador padrão das URLs
- `shortUrl` representa o código curto
- `fullShortUrl` é a URL completa para acesso

---

# 🚀 Próximas evoluções (planejadas)

- Slug personalizado (`customAlias`)
- Título por link (`title`)
- Analytics de acesso
- Dashboard com estatísticas

---

# 📌 Objetivo

Essa API permite:

- autenticação de usuários
- encurtamento de URLs
- gerenciamento completo de links
- base para expansão com analytics e customização

---
