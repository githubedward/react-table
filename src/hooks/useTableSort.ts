import { useState, useMemo } from 'react';
import type { UserWithComputedFields, SortConfig } from '../types';

interface UseTableSortReturn {
  sortedData: UserWithComputedFields[];
  sortConfig: SortConfig | null;
  handleSort: (key: keyof UserWithComputedFields) => void;
  getSortIcon: (key: keyof UserWithComputedFields) => string;
}

/**
 * Custom hook for managing table sorting
 */
export const useTableSort = (data: UserWithComputedFields[]): UseTableSortReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      // Handle date strings
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          const comparison = aDate.getTime() - bDate.getTime();
          return sortConfig.direction === 'asc' ? comparison : -comparison;
        }
      }

      // Default string comparison
      const aStr = String(aValue);
      const bStr = String(bValue);
      const comparison = aStr.localeCompare(bStr);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof UserWithComputedFields) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }

    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof UserWithComputedFields): string => {
    if (!sortConfig || sortConfig.key !== key) {
      return '↕️'; // Neutral sort icon
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return {
    sortedData,
    sortConfig,
    handleSort,
    getSortIcon,
  };
}; 