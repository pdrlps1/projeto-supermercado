import { Routes } from '@angular/router';
import { Produtos } from './components/produtos/produtos';
import { Produto } from './components/produtos/produto/produto';

export const routes: Routes = [
    { path: 'produtos', component: Produtos },
    { path: 'produtos/novo', component: Produto },
    { path: 'produtos/editar/:id', component: Produto}
];
