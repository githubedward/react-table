import React from 'react';
import type { UserWithComputedFields } from '../../models/types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { useTableSort } from '../../controllers/hooks/useTableSort';

interface DataTableProps {
  data: UserWithComputedFields[];
}

const columns = [
  { key: 'id', label: 'ID', width: '100px', sortable: true },
  { key: 'firstName', label: 'First Name', width: '150px', sortable: true },
  { key: 'lastName', label: 'Last Name', width: '150px', sortable: true },
  { key: 'fullName', label: 'Full Name', width: '200px', sortable: true },
  { key: 'email', label: 'Email', width: '250px', sortable: true },
  { key: 'city', label: 'City', width: '150px', sortable: true },
  { key: 'registrationDate', label: 'Registered Date', width: '150px', sortable: true },
  { key: 'daysSinceRegistered', label: 'DSR', width: '100px', sortable: true },
];

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const { sortedData, handleSort, getSortIcon } = useTableSort(data);

  return (
    <div className="data-table">
      <table className="table">
        <thead>
          <tr>
            {columns.map(column => (
              <TableHeader
                key={column.key}
                label={column.label}
                width={column.width}
                sortable={column.sortable}
                sortIcon={getSortIcon(column.key as keyof UserWithComputedFields)}
                onSort={() => handleSort(column.key as keyof UserWithComputedFields)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map(user => (
            <TableRow key={user.id} user={user} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}; 