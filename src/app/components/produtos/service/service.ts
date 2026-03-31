import { Injectable } from '@angular/core';
import { ProdutoModel } from '../../../models/produtos';

@Injectable({
  providedIn: 'root',
})
export class Service {
  
  produtos: Array<ProdutoModel> = [
    {
      id: 1,
      nome: 'Arroz Tipo 1',
      marca: 'Camil',
      categoria: 'Alimentos',
      precoCusto: 18.00,
      precoVenda: 25.00,
      estoque: 100
    },
    {
      id: 2,
      nome: 'Feijão Carioca',
      marca: 'Carunchão',
      categoria: 'Alimentos',
      precoCusto: 6.50,
      precoVenda: 9.00,
      estoque: 50
    }
  ];

  getProdutos() {
    return this.produtos
  };

  addProdutos(produto: ProdutoModel) {
    const maxId = this.produtos.length > 0 ? Math.max(...this.produtos.map(p => p.id ?? 0)) : 0;
    produto.id = maxId + 1;
    this.produtos.push(produto);
  }

  getProdutoById(id: number) {
    return this.produtos.find(p => p.id === id);
  }

  deleteProduto(id: number) {
    var index = this.produtos.findIndex(p => p.id === id);
    if (index > -1) {
      this.produtos.splice(index, 1);
    }
  }

  editProduto (produto: ProdutoModel) {
    const index = this.produtos.findIndex(p => p.id === produto.id);
    if (index > -1) {
      this.produtos[index] = produto;
    }
  }

}
