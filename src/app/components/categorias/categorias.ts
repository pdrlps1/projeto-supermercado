import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaDTO } from '../../models/categoria.model';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  private router = inject(Router);
  protected categoriaService = inject(CategoriaService);

  categoriaParaExcluir: CategoriaDTO | null = null;

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      await this.categoriaService.loadCategorias();
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }

  get categorias() {
    return this.categoriaService.categorias();
  }

  new() {
    this.router.navigate(['/categorias/novo']);
  }

  prepararParaExclusao(categoria: CategoriaDTO) {
    this.categoriaParaExcluir = categoria;
  }

  async delete(categoria: CategoriaDTO) {
    try {
      await this.categoriaService.deleteCategoria(categoria.id);
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
  }

  async confirmDelete() {
    if (this.categoriaParaExcluir) {
      await this.delete(this.categoriaParaExcluir);
      this.categoriaParaExcluir = null;
    }
  }

  edit(categoria: CategoriaDTO) {
    this.router.navigate([`/categorias/editar`, categoria.id]);
  }
}
