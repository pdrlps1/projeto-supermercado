import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { CategoriaService } from '../../../services/categoria.service';
import { ProdutoDTO, CreateProdutoDTO } from '../../../models/product.model';

@Component({
  selector: 'app-produto',
  imports: [CommonModule, FormsModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto implements OnInit {
  private router = inject(Router);
  protected produtoService = inject(ProdutoService);
  protected categoriaService = inject(CategoriaService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  id: string | null = null;
  errorMessage: string = '';

  produto: Partial<ProdutoDTO> = {
    nome: '',
    codigoBarras: '',
    preco: undefined,
    estoque: undefined,
    categoriaId: ''
  };

  ngOnInit() {
    this.categoriaService.loadCategorias()
      .then(() => this.cdr.detectChanges())
      .catch(err => {
        console.error('Erro ao buscar categorias:', err);
      });

    this.route.paramMap.subscribe(async (params: ParamMap) => {
      if (params.has('id')) {
        this.id = params.get('id');
        if (this.id) {
          try {
            const pd = await this.produtoService.getProdutoById(this.id);
            if (pd) {
              this.produto = { ...pd };
              this.cdr.detectChanges();
            }
          } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
            this.errorMessage = 'Não foi possível carregar os dados do produto.';
            this.cdr.detectChanges();
          }
        }
      }
    });
  }

  return() {
    this.router.navigate(['/produtos']);
  }

  async submit() {
    if (
      !this.produto.nome || this.produto.nome.trim() === '' ||
      !this.produto.codigoBarras || this.produto.codigoBarras.trim() === '' ||
      this.produto.preco === undefined || this.produto.preco === null || this.produto.preco < 0 ||
      this.produto.estoque === undefined || this.produto.estoque === null || this.produto.estoque < 0 ||
      !this.produto.categoriaId || this.produto.categoriaId.trim() === ''
    ) {
      this.errorMessage = 'Todos os campos são obrigatórios e devem conter valores válidos.';
      return;
    }

    this.errorMessage = '';

    try {
      if (this.id) {
        await this.produtoService.editProduto(this.id, this.produto as ProdutoDTO);
      } else {
        await this.produtoService.addProduto(this.produto as CreateProdutoDTO);
      }
      this.return();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      this.errorMessage = 'Ocorreu um erro ao salvar o produto na base de dados. Verifique a conexão com a API.';
      this.cdr.detectChanges();
    }
  }
}
