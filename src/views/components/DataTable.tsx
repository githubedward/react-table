import React from 'react';
import type { UserWithComputedFields } from '../../models/types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface DataTableProps {
  data: UserWithComputedFields[];
}

const columns = [
  { key: 'id', label: 'ID', width: '100px' },
  { key: 'firstName', label: 'First Name', width: '150px' },
  { key: 'lastName', label: 'Last Name', width: '150px' },
  { key: 'fullName', label: 'Full Name', width: '200px' },
  { key: 'email', label: 'Email', width: '250px' },
  { key: 'city', label: 'City', width: '150px' },
  { key: 'registrationDate', label: 'Registered Date', width: '150px' },
  { key: 'daysSinceRegistered', label: 'DSR', width: '100px' },
];

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
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
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <TableRow key={user.id} user={user} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}; 