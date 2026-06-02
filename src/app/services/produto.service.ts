import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProdutoDTO, CreateProdutoDTO } from '../models/product.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5053/api/produtos';

  // Signal contendo a lista de produtos
  produtos = signal<ProdutoDTO[]>([]);

  // Carregar todos os produtos da API
  async loadProdutos(): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<ProdutoDTO[]>(this.apiUrl));
      this.produtos.set(data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  // Obter produto por ID
  async getProdutoById(id: string): Promise<ProdutoDTO> {
    try {
      return await firstValueFrom(this.http.get<ProdutoDTO>(`${this.apiUrl}/${id}`));
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error);
      throw error;
    }
  }

  // Cadastrar novo produto
  async addProduto(produto: CreateProdutoDTO): Promise<ProdutoDTO> {
    try {
      const novoProd = await firstValueFrom(this.http.post<ProdutoDTO>(this.apiUrl, produto));
      this.produtos.update(prev => [...prev, novoProd]);
      return novoProd;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      throw error;
    }
  }

  // Editar produto existente
  async editProduto(id: string, produto: ProdutoDTO): Promise<void> {
    try {
      await firstValueFrom(this.http.put<void>(`${this.apiUrl}/${id}`, produto));
      this.produtos.update(prev => prev.map(p => p.id === id ? produto : p));
    } catch (error) {
      console.error(`Erro ao atualizar produto com ID ${id}:`, error);
      throw error;
    }
  }

  // Excluir produto
  async deleteProduto(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
      this.produtos.update(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(`Erro ao deletar produto com ID ${id}:`, error);
      throw error;
    }
  }
}
