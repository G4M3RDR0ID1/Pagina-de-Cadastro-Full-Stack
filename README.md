# API de Gerenciamento de Usuários (Spring Boot + JWT)

API REST desenvolvida com **Spring Boot** para gerenciamento de usuários com **autenticação segura utilizando JWT (JSON Web Token)**.

O projeto demonstra boas práticas de desenvolvimento backend, incluindo:

- Arquitetura em camadas
- Autenticação stateless
- Criptografia de senha com BCrypt
- Proteção de rotas com Spring Security
- Integração com banco de dados MySQL

Um pequeno frontend em **Next.js** foi desenvolvido apenas para consumir a API e demonstrar seu funcionamento.

---

# Tecnologias Utilizadas

## Backend (principal)

- Java 17
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- Spring Data JPA
- Hibernate
- BCrypt Password Encoder
- Maven

## Banco de Dados

- MySQL

## Frontend (apenas para consumo da API)

- Next.js
- React
- Axios
- TailwindCSS

---

# 🧠 Arquitetura do Backend

O backend segue uma arquitetura em camadas:

```
src/main/java/br/com/criandoapi/projeto
├── controller
│   └─ Responsável pelas rotas da API
├── service
│   └─ Contém regras de negócio da aplicação
├── repository
│   └─ Comunicação com banco de dados (JPA)
├── model
│   └─ Entidades da aplicação
├── dto
│   └─ Objetos de transferência de dados
└── security
    ├─ Configuração do Spring Security
    └─ Geração e validação de tokens JWT
```


---

# Autenticação

A autenticação é realizada utilizando **JWT (JSON Web Token)**.

**Fluxo de autenticação:**

```
1. Cliente envia email e senha
   ↓
2. API valida credenciais
   ↓
3. API gera token JWT
   ↓
4. Cliente envia token no header Authorization
   ↓
5. Spring Security valida token
```

**Header utilizado:**
```
Authorization: Bearer TOKEN
```


---

# Endpoints da API

## Criar usuário

**POST** `/usuarios`

**Body:**
```json
{
  "nome": "Lucas",
  "email": "lucas@email.com",
  "senha": "123456",
  "telefone": "31999999999"
}
```

---

## Login

**POST** `/usuarios/login`

**Body:**
```json
{
  "email": "lucas@email.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "token": "Bearer eyJhbGciOiJIUzI1NiJ9..."
}
```

---

## Listar usuários (rota protegida)

**GET** `/usuarios`

**Header:**
```
Authorization: Bearer TOKEN
```
---

# Como executar o projeto

## Backend

```bash
cd Back-End
mvn spring-boot:run
```

API disponível em: **http://localhost:8080**

## Frontend

```bash
cd Front-End
npm install
npm run dev
```

Aplicação disponível em: **http://localhost:3000**
---

# Objetivo do Projeto

Este projeto foi desenvolvido com foco em demonstrar conhecimentos em:

- ✅ Desenvolvimento de APIs REST com Spring Boot
- ✅ Autenticação segura com JWT
- ✅ Spring Security
- ✅ Arquitetura Backend
- ✅ Integração com banco de dados relacional

---

# Autor

**Lucas Lana**
