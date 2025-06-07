# Star Wars API

API REST desenvolvida em Node.js com TypeScript para gerenciar elementos do universo Star Wars. O projeto permite que usuários criem e gerenciem personagens, naves espaciais, planetas e sistemas estelares.

## ⭐ Principais funcionalidades

- **🔐 Autenticação**: Sistema completo de registro e login de usuários
- **👥 Personagens**: Criação e gestão de personagens com raças e afiliações
- **🚀 Naves**: Cadastro de naves espaciais com detalhes técnicos
- **🌍 Planetas**: Gerenciamento de planetas com clima e terreno
- **🌌 Sistemas**: Organização de planetas em sistemas estelares
- **📝 Documentação**: API documentada com Swagger UI

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL
- JWT
- Swagger UI

## 📋 Pré-requisitos

- Node.js
- MySQL
- NPM para o gerenciamentos de pacotes

## 🔧 Instalação

1. Clone o repositório
    ```bash
    git clone https://github.com/lucca16bit/express-desafio-backend-fusion.git
    cd express-desafio-backend-fusion
    ```

2. Instale as dependências
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente
    ```bash
    cp .env.example .env
    ```

4. Configure o banco de dados
    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

## 🚀 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Compila o TypeScript
- `npm start`: Inicia o servidor em produção
- `npm run lint`: Executa o linting do código

## 📝 Endpoints

### Auth
- POST /auth/register: Registro de usuário
- POST /auth/login: Login de usuário

### Users
- GET /users/me: Perfil do usuário
- PUT /users/me: Atualiza usuário
- DELETE /users/me: Remove usuário

### Characters
- POST /characters: Cria personagem
- GET /characters: Lista personagens
- GET /characters/:id: Busca personagem
- PUT /characters/:id: Atualiza personagem
- DELETE /characters/:id: Remove personagem

### Spaceships
- POST /spaceships: Cria nave
- GET /spaceships: Lista naves
- GET /spaceships/:id: Busca nave
- PUT /spaceships/:id: Atualiza nave
- DELETE /spaceships/:id: Remove nave

### Planets
- POST /planets: Cria planeta
- GET /planets: Lista planetas
- GET /planets/:id: Busca planeta
- PUT /planets/:id: Atualiza planeta
- DELETE /planets/:id: Remove planeta

### Systems
- POST /systems: Cria sistema
- GET /systems: Lista sistemas
- GET /systems/:id: Busca sistema
- PUT /systems/:id: Atualiza sistema
- DELETE /systems/:id: Remove sistema


## 🔑 Autenticação

A API utiliza autenticação via JWT tokens armazenados em cookies.


## 📚 Documentação API

A documentação completa da API está disponível em:
```
http://localhost:3000/api-docs
```
