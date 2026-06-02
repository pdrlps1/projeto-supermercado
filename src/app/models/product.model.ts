export interface ProdutoDTO {
  id: string;
  nome: string;
  codigoBarras: string;
  preco: number;
  estoque: number;
  categoriaId: string;
  nomeCategoria?: string;
}

export interface CreateProdutoDTO {
  nome: string;
  codigoBarras: string;
  preco: number;
  estoque: number;
  categoriaId: string;
}
