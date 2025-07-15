import React from 'react';
import { formatDate } from '../utils/userUtils';

interface TableCellProps {
  value: string | number;
  columnKey: string;
}

export const TableCell: React.FC<TableCellProps> = ({ value, columnKey }) => {
  const formatValue = (val: string | number, key: string) => {
    switch (key) {
      case 'registrationDate':
        return formatDate(String(val));
      case 'daysSinceRegistered':
        return `${val} days`;
      case 'id':
        return String(val).slice(0, 8); // Show first 8 characters of UUID
      default:
        return String(val);
    }
  };

  return (
    <td className="table-cell">
      {formatValue(value, columnKey)}
    </td>
  );
}; 