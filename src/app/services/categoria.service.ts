import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaDTO, CreateCategoriaDTO } from '../models/categoria.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5053/api/categorias';

  // Signal contendo a lista de categorias
  categorias = signal<CategoriaDTO[]>([]);

  // Carregar todas as categorias da API
  async loadCategorias(): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<CategoriaDTO[]>(this.apiUrl));
      this.categorias.set(data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  }

  // Criar uma nova categoria
  async addCategoria(categoria: CreateCategoriaDTO): Promise<CategoriaDTO> {
    try {
      const novaCat = await firstValueFrom(this.http.post<CategoriaDTO>(this.apiUrl, categoria));
      this.categorias.update(prev => [...prev, novaCat]);
      return novaCat;
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      throw error;
    }
  }

  // Obter categoria por ID
  async getCategoriaById(id: string): Promise<CategoriaDTO> {
    try {
      return await firstValueFrom(this.http.get<CategoriaDTO>(`${this.apiUrl}/${id}`));
    } catch (error) {
      console.error(`Erro ao buscar categoria com ID ${id}:`, error);
      throw error;
    }
  }

  // Editar categoria existente
  async editCategoria(id: string, categoria: CategoriaDTO): Promise<void> {
    try {
      await firstValueFrom(this.http.put<void>(`${this.apiUrl}/${id}`, categoria));
      this.categorias.update(prev => prev.map(c => c.id === id ? categoria : c));
    } catch (error) {
      console.error(`Erro ao atualizar categoria com ID ${id}:`, error);
      throw error;
    }
  }

  // Excluir categoria
  async deleteCategoria(id: string): Promise<void> {
    try {
      await firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
      this.categorias.update(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error(`Erro ao deletar categoria com ID ${id}:`, error);
      throw error;
    }
  }
}
