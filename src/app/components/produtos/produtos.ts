import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProdutoDTO } from '../../models/product.model';

@Component({
  selector: 'app-produtos',
  imports: [CommonModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {
  private router = inject(Router);
  protected produtoService = inject(ProdutoService);
  protected categoriaService = inject(CategoriaService);

  produtoParaExcluir: ProdutoDTO | null = null;

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      await Promise.all([
        this.produtoService.loadProdutos(),
        this.categoriaService.loadCategorias()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  get produtos() {
    return this.produtoService.produtos();
  }

  getCategoriaNome(categoriaId: string): string {
    const categoria = this.categoriaService.categorias().find(c => c.id === categoriaId);
    return categoria ? categoria.nome : 'Sem Categoria';
  }

  new() {
    this.router.navigate(['/produtos/novo']);
  }

  prepararParaExclusao(produto: ProdutoDTO) {
    this.produtoParaExcluir = produto;
  }

  async delete(produto: ProdutoDTO) {
    try {
      await this.produtoService.deleteProduto(produto.id);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  }

  async confirmDelete() {
    if (this.produtoParaExcluir) {
      await this.delete(this.produtoParaExcluir);
      this.produtoParaExcluir = null;
    }
  }

  edit(produto: ProdutoDTO) {
    this.router.navigate([`/produtos/editar`, produto.id]);
  }
}
