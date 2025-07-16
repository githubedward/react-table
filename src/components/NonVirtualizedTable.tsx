import React from 'react';
import type { UserWithComputedFields } from '../types';
import { TableCell } from './TableCell';
import { useColumnOrder } from '../hooks/useColumnOrder';

interface NonVirtualizedTableProps {
  data: UserWithComputedFields[];
}

export const NonVirtualizedTable: React.FC<NonVirtualizedTableProps> = ({ data }) => {
  const { columns } = useColumnOrder();

  return (
    <div className="data-table">
      <div className="virtualized-table">
        <div className="table-header">
          <div className="table-row">
            {columns.map(column => (
              <div key={column.key} className="table-header">
                <div className="header-content">
                  <div className="header-text">
                    <span>{column.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="table-body" style={{ height: '340px', overflow: 'auto' }}>
          {data.map((user, index) => {
            // Log when rows are rendered (you'll see this in console)
            console.log(`Non-virtualized row rendered: ${index + 1}`);
            
            return (
              <div key={user.id} className="table-row">
                {columns.map(column => (
                  <TableCell
                    key={column.key}
                    value={user[column.key as keyof UserWithComputedFields]}
                    columnKey={column.key}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 