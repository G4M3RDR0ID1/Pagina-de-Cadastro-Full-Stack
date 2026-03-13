# Sistema de Cadastro e Autenticação de Usuários (Full Stack)

Aplicação Full Stack com foco no Back-end, desenvolvida para demonstrar boas práticas de desenvolvimento de APIs modernas, incluindo autenticação com JWT, validação de dados, tratamento global de erros e integração com Front-end em Next.js.

### O sistema permite:

* Cadastro de usuários

* Autenticação segura

* Listagem de usuários autenticados

* Proteção de rotas com JWT

* Validação completa de dados

* Integração com frontend moderno

## Aplicação Online
- Front-end

https://pagina-de-cadastro-full-stack.vercel.app/login

- Back-end API

https://pagina-de-cadastro-full-stack-production.up.railway.app

## Objetivo do Projeto

Este projeto foi desenvolvido com foco em Back-end, simulando um sistema real de autenticação utilizado em aplicações modernas.

Ele demonstra habilidades importantes para vagas de Back-end Java / Full Stack, incluindo:

* Arquitetura REST

* Autenticação com JWT

* Segurança com Spring Security

* Validação de dados

* Tratamento global de erros

* Integração Front-end / Back-end

## Arquitetura do Sistema
```mermaid
flowchart TD
    A[Frontend (Next.js)] -->|"HTTP Requests"| B[Backend (Spring Boot API)]
    B -->|"JPA / Hibernate"| C[MySQL Database]
```
## Tecnologias Utilizadas
### Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT (JSON Web Token)
* MySQL
* Maven

### Frontend

* Next.js
* React
* Axios
* Tailwind CSS

### Deploy

* Railway → Backend
* Vercel → Frontend
* MySQL Cloud (Railway) → Banco de dados

## Funcionalidades Implementadas
### Autenticação

* Login com JWT
* Rotas protegidas no backend
* Frontend armazena token e controla sessão

### Cadastro de Usuário
- Campos:
  
* Nome
* Email
* Senha (criptografada)
* Telefone

- Validações:
  
* Nome mínimo de 3 caracteres
* Email válido
* Senha mínimo 6 caracteres
* Telefone válido
* Email único no sistema

### Segurança
- Implementado com Spring Security:

* Autenticação baseada em JWT
* Filtro de autenticação customizado
* Rotas protegidas
* Sessão stateless

### Tratamento Global de Erros
- Utilizando: @RestControllerAdvice

- Tratamento de:

* Erros de validação
* Erros de negócio
* Erros inesperados

**Exemplo de resposta da API:**

```json
{
 "error": "Erro interno no servidor",
 "message": "Senha incorreta"
}
```
## Estrutura do Back-End

```
Src/Main
 ├── ProjetoApplication.java
 ├── controller
 │     └── UsuarioController
 │
 ├── service
 │     └── UsuarioService
 │
 ├── repository
 │     └── IUsuario
 │
 ├── security
 │     ├── SecurityConfig
 │     ├── SecurityFilter
 │     ├── Token
 │     └── TokenUtil
 │
 ├── dto
 │     ├── UsuarioDTO
 │     └── UsuarioResponseDTO
 │
 ├── exception
 │     └── GlobalExceptionHandler
 │
 └── model
       └── Usuario
```
## Endpoints da API
### Cadastro

POST /usuarios

**Body:**

```json
{
 "nome": "Lucas",
 "email": "lucas@email.com",
 "senha": "123456",
 "telefone": "31999999999"
}
```
### Login

POST /usuarios/login

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
### Listar usuários

GET /usuarios

**Header:**

```
Authorization: Bearer TOKEN
```
## Funcionalidades do Frontend

* Tela de Cadastro

* Tela de Login

* Dashboard protegido

* Integração com API via Axios

* Controle de autenticação com AuthContext

* Validação de formulário

## Instalação do Projeto

### Backend

```bash
git clone https://github.com/G4M3RDR0ID1/Pagina-de-Cadastro-Full-Stack
cd Back-End
mvn spring-boot:run
```

### Frontend

```bash
cd Front-End
npm install
npm run dev
```
## Configuração de Ambiente

### Arquivo application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/banco_de_usuarios
spring.datasource.username=root
spring.datasource.password=senha

jwt.secret=sua_chave_secreta
jwt.expiration=43200000
jwt.issuer=LucasLana
```
## Melhorias Futuras

Possíveis evoluções do projeto:

* Documentação da API com Swagger
* Dockerização da aplicação
* Refresh Token
* Rate limiting no login
* Testes automatizados
* CI/CD pipeline

## Autor

*Lucas Lana*

GitHub
https://github.com/G4M3RDR0ID1

### Considerações

Este projeto foi desenvolvido com foco em boas práticas de backend, incluindo:

* arquitetura organizada

* segurança

* validação de dados

* tratamento de erros

* autenticação moderna

Servindo como demonstração prática de habilidades para vagas de Desenvolvedor Back-end / Full Stack Java.

### Se este projeto foi útil ou interessante, considere deixar uma estrela no repositório.
