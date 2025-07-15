import React from 'react';
import type { UserWithComputedFields } from '../../models/types';
import { TableCell } from './TableCell';

interface TableRowProps {
  user: UserWithComputedFields;
  columns: Array<{ key: string; label: string; width?: string; sortable?: boolean }>;
}

export const TableRow: React.FC<TableRowProps> = ({ user, columns }) => {
  return (
    <tr className="table-row">
      {columns.map(column => (
        <TableCell
          key={column.key}
          value={user[column.key as keyof UserWithComputedFields]}
          columnKey={column.key}
        />
      ))}
    </tr>
  );
}; 