import { Component } from '@angular/core';
import { ProdutoModel } from '../../../models/produtos';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Service } from '../service/service';

@Component({
  selector: 'app-produto',
  imports: [FormsModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {

  id: number = 0;

  constructor(private router: Router, private service: Service, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        this.id = +params.get('id')!;
        const pd = this.service.getProdutoById(this.id);
        if (pd) {
          this.produto = { ...pd };
        }
      }
    })
  }

  produto: ProdutoModel = {};

  return() {
    this.router.navigate(['/produtos'])
  }

  errorMessage: string = '';

  submit() {
    if (!this.produto.nome || this.produto.nome.trim() === '' || this.produto.precoVenda == null || this.produto.estoque == null) {
      this.errorMessage = 'Os campos Nome, Preço de Venda e Estoque Inicial são obrigatórios.';
      return;
    }
    
    this.errorMessage = '';

    if (this.id) {
      this.service.editProduto(this.produto);
    } else {
      this.service.addProdutos(this.produto);
    }
    this.return();
  }

}
