# Resumo Completo da API de Supermercado para o Frontend Angular

Esta documentação descreve a API RESTful para o sistema de supermercado. A API permite gerenciar produtos e categorias.

#### **Informações Gerais**

*   **Tecnologia:** Backend construído com .NET 8 Web API.
*   **Banco de Dados:** MySQL.
*   **URL Base:** A API está rodando em `http://localhost:8080`. Todos os endpoints devem ser prefixados com esta URL.
*   **Formato dos Dados:** Todas as requisições e respostas utilizam o formato JSON.

#### **Autenticação**

A API **não** implementa nenhum tipo de autenticação ou autorização. Todos os endpoints são públicos.

#### **Modelos de Dados (DTOs)**

Estes são os objetos JSON que a API utiliza para comunicação.

**1. `CategoriaDTO`** (Objeto para representar uma categoria)
```json
{
  "id": "Guid",
  "nome": "string"
}
```

**2. `ProdutoDTO`** (Objeto para representar um produto)
```json
{
  "id": "Guid",
  "nome": "string",
  "codigoBarras": "string",
  "preco": "decimal",
  "estoque": "integer",
  "categoriaId": "Guid",
  "nomeCategoria": "string"
}
```

**3. `CreateCategoriaDTO`** (Objeto para **criar** uma nova categoria)
```json
{
  "nome": "string"
}
```

**4. `CreateProdutoDTO`** (Objeto para **criar** um novo produto)
```json
{
  "nome": "string",
  "codigoBarras": "string",
  "preco": "decimal",
  "estoque": "integer",
  "categoriaId": "Guid"
}
```

---

### **Referência de Endpoints**

#### **Endpoints de Categorias (`/api/categorias`)**

*   **`GET /api/categorias`**
    *   **Descrição:** Retorna uma lista de todas as categorias.
    *   **Resposta de Sucesso (200 OK):** Um array de `CategoriaDTO`.
      ```json
      [
        { "id": "c3d4e5f6...", "nome": "Bebidas" },
        { "id": "a1b2c3d4...", "nome": "Laticínios" }
      ]
      ```

*   **`GET /api/categorias/{id}`**
    *   **Descrição:** Busca uma categoria específica pelo seu ID.
    *   **Parâmetro de URL:** `id` (Guid) - O ID da categoria.
    *   **Resposta de Sucesso (200 OK):** Um objeto `CategoriaDTO`.
    *   **Resposta de Erro (404 Not Found):** Se a categoria não for encontrada.

*   **`POST /api/categorias`**
    *   **Descrição:** Cria uma nova categoria. O ID é gerado automaticamente pelo backend.
    *   **Corpo da Requisição:** Um objeto `CreateCategoriaDTO`.
      ```json
      { "nome": "Higiene" }
      ```
    *   **Resposta de Sucesso (201 Created):** O objeto `CategoriaDTO` recém-criado, incluindo o novo ID.

*   **`PUT /api/categorias/{id}`**
    *   **Descrição:** Atualiza uma categoria existente.
    *   **Parâmetro de URL:** `id` (Guid) - O ID da categoria a ser atualizada.
    *   **Corpo da Requisição:** Um objeto de Categoria completo (incluindo o ID).
    *   **Resposta de Sucesso (204 No Content):** A atualização foi bem-sucedida.
    *   **Resposta de Erro (400 Bad Request):** Se o ID na URL for diferente do ID no corpo.
    *   **Resposta de Erro (404 Not Found):** Se a categoria não for encontrada.

*   **`DELETE /api/categorias/{id}`**
    *   **Descrição:** Deleta uma categoria.
    *   **Parâmetro de URL:** `id` (Guid) - O ID da categoria a ser deletada.
    *   **Resposta de Sucesso (204 No Content):** A deleção foi bem-sucedida.
    *   **Resposta de Erro (404 Not Found):** Se a categoria não for encontrada.

#### **Endpoints de Produtos (`/api/produtos`)**

*   **`GET /api/produtos`**
    *   **Descrição:** Retorna uma lista de todos os produtos, com o nome da sua categoria.
    *   **Resposta de Sucesso (200 OK):** Um array de `ProdutoDTO`.

*   **`GET /api/produtos/{id}`**
    *   **Descrição:** Busca um produto específico pelo seu ID.
    *   **Parâmetro de URL:** `id` (Guid) - O ID do produto.
    *   **Resposta de Sucesso (200 OK):** Um objeto `ProdutoDTO`.
    *   **Resposta de Erro (404 Not Found):** Se o produto não for encontrado.

*   **`POST /api/produtos`**
    *   **Descrição:** Cria um novo produto. O ID é gerado automaticamente.
    *   **Corpo da Requisição:** Um objeto `CreateProdutoDTO`.
      ```json
      {
        "nome": "Leite Integral",
        "codigoBarras": "7891234567890",
        "preco": 4.50,
        "estoque": 150,
        "categoriaId": "a1b2c3d4..."
      }
      ```
    *   **Resposta de Sucesso (201 Created):** O objeto `ProdutoDTO` recém-criado.

*   **`PUT /api/produtos/{id}`**
    *   **Descrição:** Atualiza um produto existente.
    *   **Parâmetro de URL:** `id` (Guid) - O ID do produto a ser atualizado.
    *   **Corpo da Requisição:** Um objeto de Produto completo (incluindo o ID).
    *   **Resposta de Sucesso (204 No Content):** A atualização foi bem-sucedida.

*   **`DELETE /api/produtos/{id}`**
    *   **Descrição:** Deleta um produto.
    *   **Parâmetro de URL:** `id` (Guid) - O ID do produto a ser deletado.
    *   **Resposta de Sucesso (204 No Content):** A deleção foi bem-sucedida.

#### **Tratamento de Erros Global**

*   **`500 Internal Server Error`**: Para qualquer erro inesperado no servidor, a API retornará uma resposta padronizada, protegendo detalhes internos da implementação.
  ```json
  {
    "status": 500,
    "title": "Internal Server Error",
    "detail": "An unexpected error occurred. Please try again later."
  }
  ```
