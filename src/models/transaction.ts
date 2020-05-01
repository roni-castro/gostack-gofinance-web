export interface Transaction {
  id: string;
  title: string;
  isOutcome: boolean;
  valueFormatted: string;
  type: 'income' | 'outcome';
  category: string;
  createdAt: Date;
  createdAtFormatted: string;
}
