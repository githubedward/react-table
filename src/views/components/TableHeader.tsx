import React from 'react';

interface TableHeaderProps {
  label: string;
  width?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ label, width }) => {
  return (
    <th 
      className="table-header"
      style={{ width }}
    >
      {label}
    </th>
  );
}; 