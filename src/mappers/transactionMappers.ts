import { parseISO, format } from 'date-fns';
import { Balance } from '../models/balance';
import { Transaction } from '../models/transaction';
import {
  BalanceDTO,
  TransactionDTO,
} from '../services/models/transactionResponseDTO';
import formatValue from '../utils/formatValue';

export const mapToTransaction = (
  transactions: TransactionDTO[],
): Transaction[] =>
  transactions.map(transaction => {
    const { id, title, value, type, category, created_at } = transaction;
    const valueNumber = +value;
    const isOutcome = type === 'outcome';
    const valueFormatted = isOutcome
      ? `- ${formatValue(valueNumber)}`
      : formatValue(valueNumber);
    return {
      id,
      title,
      valueFormatted,
      isOutcome,
      createdAt: parseISO(created_at),
      createdAtFormatted: format(parseISO(created_at), 'dd/MM/yyyy'),
      type,
      category: category.title,
    };
  });

export const mapToBalance = (balance: BalanceDTO): Balance => {
  const { income, outcome, total } = balance;
  return {
    income,
    outcome,
    total,
  };
};
