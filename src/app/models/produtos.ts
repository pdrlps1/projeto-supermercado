export class ProdutoModel {
    id?: number;
    marca?: string;
    nome?: string;
    precoCusto?: number;
    precoVenda?: number;
    categoria?: string;
    estoque?: number = 0;
}
