import React, { memo } from 'react';
import TR from './styles';

interface TransactionCardProps {
  title: string;
  isOutcome: boolean;
  valueFormatted: string;
  category: string;
  dateFormatted: string;
}

const TransactionCard: React.FC<TransactionCardProps> = memo(
  ({
    title,
    isOutcome,
    valueFormatted,
    category,
    dateFormatted,
  }: TransactionCardProps) => {
    return (
      <TR>
        <td className="title">{title}</td>
        <td className={isOutcome ? 'outcome' : 'income'}>{valueFormatted}</td>
        <td>{category}</td>
        <td>{dateFormatted}</td>
      </TR>
    );
  },
);

export default TransactionCard;
