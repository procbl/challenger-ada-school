export interface Card {
  id?: string;
  titulo: string;
  conteudo: string;
  lista: string;
}

export enum lista {
  'CACC' = 'Conta Corrente / Conta de Pagamento',
  'SLRY' = 'Conta-Salário',
  'SVGS' = 'Conta de Poupança',
}
