import { useState, useEffect } from 'react';
import type { ColumnConfig } from '../types';
import { saveToStorage, loadFromStorage } from '../utils/storageUtils';

const STORAGE_KEY = 'column-order';

interface UseColumnOrderReturn {
  columns: ColumnConfig[];
  reorderColumns: (oldIndex: number, newIndex: number) => void;
}

/**
 * Default column configuration with order
 */
const defaultColumns: ColumnConfig[] = [
  { key: 'id', label: 'ID', sortable: true, order: 0, width: '100px' },
  { key: 'firstName', label: 'First Name', sortable: true, order: 1, width: '150px' },
  { key: 'lastName', label: 'Last Name', sortable: true, order: 2, width: '150px' },
  { key: 'fullName', label: 'Full Name', sortable: true, order: 3, width: '200px' },
  { key: 'email', label: 'Email', sortable: true, order: 4, width: '250px' },
  { key: 'city', label: 'City', sortable: true, order: 5, width: '150px' },
  { key: 'registrationDate', label: 'Registered Date', sortable: true, order: 6, width: '150px' },
  { key: 'daysSinceRegistered', label: 'DSR', sortable: true, order: 7, width: '100px' },
];

/**
 * Custom hook for managing column order with persistence
 */
export const useColumnOrder = (): UseColumnOrderReturn => {
  const [columns, setColumns] = useState<ColumnConfig[]>(() => {
    // Try to load saved column order from localStorage
    const savedOrder = loadFromStorage<ColumnConfig[]>(STORAGE_KEY);
    return savedOrder && savedOrder.length > 0 ? savedOrder : defaultColumns;
  });

  // Save column order to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY, columns);
  }, [columns]);

  const reorderColumns = (oldIndex: number, newIndex: number) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      const [movedColumn] = newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, movedColumn);
      
      // Update order property for all columns
      return newColumns.map((column, index) => ({
        ...column,
        order: index,
      }));
    });
  };

  return {
    columns,
    reorderColumns,
  };
}; 