# 📊 Status do Projeto: Sistema de Supermercado

Este documento apresenta uma análise arquitetural e o estado atual do desenvolvimento do sistema de Supermercado, desenvolvido para a disciplina de Tópicos Avançados em Desenvolvimento de Sistemas.

## 🛒 1. Visão Geral do Projeto

O sistema consiste em uma aplicação de gestão para supermercados, projetada com uma arquitetura **Full Stack**. O objetivo é gerenciar o fluxo de dados comerciais, de forma reativa e escalável, conectando a camada visual ao banco de dados relacional.

**Stack Tecnológica Identificada:**

- **Frontend:** Angular (CLI v21.1.5) com SSR (Server-Side Rendering) habilitado.
- **Backend:** ASP.NET Core (Web API).
- **Banco de Dados:** MySQL.
- **ORM:** Entity Framework Core (via Pomelo EntityFrameworkCore MySQL).
- **Estilização & UI:** Bootstrap 5 (referenciado no build), Bootstrap Icons, `ngx-mask` para formatação avançada de inputs.

## 🗂️ 2. Estrutura de Pastas e Arquivos (Mapeamento)

A estrutura macro do repositório deve estar mapeada da seguinte forma para segregar as responsabilidades de cliente e servidor:

```text
📦 repositorio-supermercado
 ┣ 📂 backend/                  # ⚙️ API em ASP.NET Core
 ┃ ┣ 📜 Program.cs              # Configuração principal da API, CORS e injeção de dependências
 ┃ ┣ 📜 appsettings.json        # Configuração da Connection String do MySQL
 ┃ ┣ 📂 Controllers/            # Endpoints REST (Controllers)
 ┃ ┣ 📂 Models/                 # Entidades do Domínio
 ┃ ┗ 📂 Data/                   # Contexto do Entity Framework (DbContext)
 ┃
 ┗ 📂 projeto-supermercado/     # 💻 Frontend em Angular
   ┣ 📜 angular.json            # Configuração do workspace (Estilos do Bootstrap injetados)
   ┣ 📜 src/
   ┃ ┣ 📜 main.ts               # Ponto de entrada do Angular
   ┃ ┣ 📂 app/
   ┃ ┃ ┣ 📜 app.config.ts       # Configurações globais (ProvideHttpClient, ProvideRouter)
   ┃ ┃ ┣ 📂 models/             # Interfaces/Classes TypeScript mapeando as entidades da API
   ┃ ┃ ┣ 📂 services/           # Comunicação com a API e estado global
   ┃ ┃ ┗ 📂 components/         # Componentes organizados (Listagem e Formulários)
   ┃ ┗ 📜 styles.css            # Estilos CSS globais complementares
```

## 💻 3. Estado Atual do Desenvolvimento (Frontend)

Com base na análise técnica do frontend e nas premissas arquiteturais, temos:

- **Configurações Básicas:** O pacote `bootstrap.min.css` está instanciado com sucesso no arquivo `angular.json`, garantindo o layout base para o projeto.
- **Componentes e UI:** A estrutura dos **Componentes de Listagem** (Tabelas) e de **Formulários** devem utilizar as classes nativas do Bootstrap.
- **Máscaras e Ícones:** O uso de `ngx-mask` (para formatação de moeda/CNPJ/CPF) e o Bootstrap Icons são requisitos de UI fundamentais a serem validados nos _templates_ HTML.
- **Gerenciamento de Estado Reativo:**
  - O `HttpClient` deve estar provido através do `app.config.ts` (via `provideHttpClient()`).
  - A gestão de dados no Angular está sendo orientada à **API de Signals**. Os serviços da aplicação injetam os dados da API em objetos `signal()` e utilizam `.set()` e `.update()` para propagar as alterações na interface sem vazamentos de memória. Valores derivados utilizam a diretiva `computed()`.
- **Modelos de Domínio:** Os DTOs de `Produto` e `Categoria` (`ProdutoDTO`, `CreateProdutoDTO`, `CategoriaDTO`, `CreateCategoriaDTO`) estão mapeados em TypeScript, com as nomenclaturas exatas correspondentes aos retornos JSON da API ASP.NET Core.

## 📝 4. Próximos Passos & Ajustes Pendentes

Para garantir a implementação perfeita de ponta a ponta (Angular → API → MySQL), o seguinte checklist deve ser priorizado:

- [ ] **Migrations e Banco:** Verificar no backend se o contexto do EF Core (`DbContext`) está mapeando corretamente o MySQL e aplicar os comandos do _Migrations_ (`Add-Migration` e `Update-Database`).
- [ ] **CORS Integrado:** Garantir que o backend ASP.NET Core (`Program.cs`) possua política de permissão de CORS configurada para permitir as chamadas oriundas do Angular (geralmente `http://localhost:4200`).
- [ ] **Refatoração com Signals:** Validar nos arquivos `*.service.ts` se as listas de entidades estão utilizando de fato a reatividade dos Signals ao invés de ficar apenas fazendo `subscribe()` avulsos nos componentes.
- [x] **Alinhamento de Contratos:** Verificar se os arquivos em `src/app/models/*.ts` estão idênticos às classes C# declaradas na pasta `Models/` da API.
- [ ] **Validação em Formulários:** Implementar o `ngx-mask` nos componentes de formulários e adicionar Reactive Forms para bloquear envios com dados vazios.
- [ ] **Gestão de Erros de HTTP:** Implementar mecanismos ou interceptors que informem o usuário caso a API esteja fora do ar ou retorne erros de validação (ex: Bad Request).
