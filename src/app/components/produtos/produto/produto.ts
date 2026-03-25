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
      this.id = +params.get('id')!;
      if (this.id) {
        this.produto = this.service.getProdutoById(this.id)!;
      }
    })
  }

  produto: ProdutoModel = {};

  return() {
    this.router.navigate(['/produtos'])
  }

  submit() {
    this.service.addProdutos(this.produto);
    this.return();
  }

}
