import { Injectable } from '@angular/core';
import { ProdutoModel } from '../../../models/produtos';

@Injectable({
  providedIn: 'root',
})
export class Service {
  
  produtos: Array<ProdutoModel> = [];

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
