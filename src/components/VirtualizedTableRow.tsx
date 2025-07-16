import React from 'react';
import type { UserWithComputedFields, ColumnConfig } from '../types';
import { TableCell } from './TableCell';

interface VirtualizedTableRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    users: UserWithComputedFields[];
    columns: ColumnConfig[];
  };
}

export const VirtualizedTableRow: React.FC<VirtualizedTableRowProps> = ({
  index,
  style,
  data,
}) => {
  const { users, columns } = data;
  const user = users[index];

  // Log when rows are rendered (you'll see this in console)
  console.log(`Virtualized row rendered: ${index + 1}`);

  if (!user) {
    return (
      <div style={style} className="table-row">
        <div className="table-cell" style={{ gridColumn: `1 / span ${columns.length}` }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={style} className="table-row">
      {columns.map(column => (
        <TableCell
          key={column.key}
          value={user[column.key as keyof UserWithComputedFields]}
          columnKey={column.key}
        />
      ))}
    </div>
  );
}; 