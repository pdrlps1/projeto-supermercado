import { Component } from '@angular/core';
import { ProdutoModel } from '../../models/produtos';
import { Router } from '@angular/router';
import { Service } from './service/service';

@Component({
  selector: 'app-produtos',
  imports: [],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos {

  constructor(private router: Router, private service: Service) { this.getProdutos() }

  produtos: Array<ProdutoModel> = [];
  produtoParaExcluir: any = null;

  new() {
    this.router.navigate(['/produtos/novo']);
  }

  getProdutos() {
    this.produtos = this.service.getProdutos();
  }

  prepararParaExclusao(produto: any) {
    this.produtoParaExcluir = produto;
  }

  delete(produto: ProdutoModel) {
    this.service.deleteProduto(produto.id!);
    this.getProdutos();
  }

  confirmDelete() {
    if(this.produtoParaExcluir) {
      this.delete(this.produtoParaExcluir);
      this.produtoParaExcluir(null);
    };
  }

  edit(produto: ProdutoModel) {
    this.router.navigate([`/produtos/editar`, produto.id])
  }

}
