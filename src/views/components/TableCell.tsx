import React from 'react';
import { formatDate } from '../../utils/userUtils';

interface TableCellProps {
  value: any;
  columnKey: string;
}

export const TableCell: React.FC<TableCellProps> = ({ value, columnKey }) => {
  const formatValue = (val: any, key: string) => {
    switch (key) {
      case 'registrationDate':
        return formatDate(val);
      case 'daysSinceRegistered':
        return `${val} days`;
      case 'id':
        return val.slice(0, 8); // Show first 8 characters of UUID
      default:
        return val;
    }
  };

  return (
    <td className="table-cell">
      {formatValue(value, columnKey)}
    </td>
  );
}; 