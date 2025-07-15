import React from 'react';

interface TableHeaderProps {
  label: string;
  width?: string;
  sortable?: boolean;
  sortIcon?: string;
  onSort?: () => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ 
  label, 
  width, 
  sortable = false, 
  sortIcon, 
  onSort 
}) => {
  return (
    <th 
      className={`table-header ${sortable ? 'sortable' : ''}`}
      style={{ width }}
      onClick={sortable ? onSort : undefined}
    >
      <div className="header-content">
        <span>{label}</span>
        {sortable && sortIcon && (
          <span className="sort-icon">{sortIcon}</span>
        )}
      </div>
    </th>
  );
}; 