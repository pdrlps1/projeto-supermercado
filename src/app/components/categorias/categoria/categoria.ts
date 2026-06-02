import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { CategoriaDTO, CreateCategoriaDTO } from '../../../models/categoria.model';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria implements OnInit {
  private router = inject(Router);
  protected categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  id: string | null = null;
  errorMessage: string = '';

  categoria: Partial<CategoriaDTO> = {
    nome: ''
  };

  ngOnInit() {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      if (params.has('id')) {
        this.id = params.get('id');
        if (this.id) {
          try {
            const cat = await this.categoriaService.getCategoriaById(this.id);
            if (cat) {
              this.categoria = { ...cat };
              this.cdr.detectChanges();
            }
          } catch (error) {
            console.error('Erro ao buscar categoria por ID:', error);
            this.errorMessage = 'Não foi possível carregar os dados da categoria.';
            this.cdr.detectChanges();
          }
        }
      }
    });
  }

  return() {
    this.router.navigate(['/categorias']);
  }

  async submit() {
    if (!this.categoria.nome || this.categoria.nome.trim() === '') {
      this.errorMessage = 'O campo Nome da Categoria é obrigatório.';
      return;
    }

    this.errorMessage = '';

    try {
      if (this.id) {
        await this.categoriaService.editCategoria(this.id, this.categoria as CategoriaDTO);
      } else {
        await this.categoriaService.addCategoria(this.categoria as CreateCategoriaDTO);
      }
      this.return();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      this.errorMessage = 'Ocorreu um erro ao salvar a categoria na base de dados. Verifique a conexão com a API.';
      this.cdr.detectChanges();
    }
  }
}
