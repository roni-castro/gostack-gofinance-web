import React, { useEffect, useState } from 'react';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import Header from '../../components/Header';
import { TransactionResponseDTO } from '../../services/models/transactionResponseDTO';
import {
  mapToTransaction,
  mapToBalance,
} from '../../mappers/transactionMappers';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import api from '../../services/api';
import { Card, CardContainer, Container, TableContainer } from './styles';
import formatValue from '../../utils/formatValue';
import TransactionCard from '../../components/TransactionCard';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get<TransactionResponseDTO>('transactions');
      setTransactions(mapToTransaction(response.data.transactions));
      setBalance(mapToBalance(response.data.balance));
    }

    loadTransactions();
  }, []);

  const renderTransactions: () => JSX.Element[] = () =>
    transactions.map(transaction => (
      <TransactionCard
        key={transaction.id}
        title={transaction.title}
        isOutcome={transaction.isOutcome}
        valueFormatted={transaction.valueFormatted}
        dateFormatted={transaction.createdAtFormatted}
        category={transaction.category}
      />
    ));

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balance.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balance.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balance.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>{transactions && renderTransactions()}</tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
