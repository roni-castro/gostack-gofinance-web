export interface TransactionResponseDTO {
  transactions: TransactionDTO[];
  balance: BalanceDTO;
}

interface CategoryDTO {
  title: string;
}

export interface TransactionDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: CategoryDTO;
  created_at: string;
}

export interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}
