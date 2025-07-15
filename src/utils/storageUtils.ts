/**
 * Storage utilities for localStorage operations
 */

const STORAGE_PREFIX = 'react-table-';

/**
 * Save data to localStorage with a key
 */
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.setItem(fullKey, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * Load data from localStorage with a key
 */
export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    const item = localStorage.getItem(fullKey);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}; 