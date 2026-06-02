import { Routes } from '@angular/router';
import { Produtos } from './components/produtos/produtos';
import { Produto } from './components/produtos/produto/produto';
import { Categorias } from './components/categorias/categorias';
import { Categoria } from './components/categorias/categoria/categoria';

export const routes: Routes = [
    { path: '', redirectTo: 'produtos', pathMatch: 'full' },
    { path: 'produtos', component: Produtos },
    { path: 'produtos/novo', component: Produto },
    { path: 'produtos/editar/:id', component: Produto },
    { path: 'categorias', component: Categorias },
    { path: 'categorias/novo', component: Categoria },
    { path: 'categorias/editar/:id', component: Categoria }
];
