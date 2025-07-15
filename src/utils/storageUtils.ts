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

/**
 * Remove data from localStorage with a key
 */
export const removeFromStorage = (key: string): void => {
  try {
    const fullKey = `${STORAGE_PREFIX}${key}`;
    localStorage.removeItem(fullKey);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};

/**
 * Clear all data with our prefix
 */
export const clearAllStorage = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}; 