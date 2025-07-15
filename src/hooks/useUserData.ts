import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import type { User, UserWithComputedFields } from '../types';
import { addComputedFieldsToUsers } from '../utils/userUtils';
import { saveToStorage, loadFromStorage } from '../utils/storageUtils';

const STORAGE_KEY = 'user-data';
const DEFAULT_RECORD_COUNT = 500;

interface UseUserDataReturn {
  users: UserWithComputedFields[];
  recordCount: number;
}

/**
 * Generates a single realistic user record
 */
const generateUser = (): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    city: faker.location.city(),
    registrationDate: faker.date.past({ years: 5 }).toISOString(),
  };
};

/**
 * Generates multiple user records
 */
const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => generateUser());
};

/**
 * Custom hook for managing user data with generation and persistence
 */
export const useUserData = (recordCount: number = DEFAULT_RECORD_COUNT): UseUserDataReturn => {
  const [users, setUsers] = useState<UserWithComputedFields[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    // Try to load existing data from localStorage
    const savedData = loadFromStorage<User[]>(STORAGE_KEY);
    
    if (savedData && savedData.length > 0) {
      // Use saved data and add computed fields
      const usersWithComputed = addComputedFieldsToUsers(savedData);
      setUsers(usersWithComputed);
    } else {
      // Generate new data if none exists
      const generatedUsers = generateUsers(recordCount);
      const usersWithComputed = addComputedFieldsToUsers(generatedUsers);
      setUsers(usersWithComputed);
      
      // Save to localStorage
      saveToStorage(STORAGE_KEY, generatedUsers);
    }
  }, [recordCount]);

  // Save data to localStorage whenever users change
  useEffect(() => {
    if (users.length > 0) {
      // Remove computed fields before saving
      const usersWithoutComputed = users.map(({ fullName, daysSinceRegistered, ...user }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = { fullName, daysSinceRegistered };
        return user;
      });
      saveToStorage(STORAGE_KEY, usersWithoutComputed);
    }
  }, [users]);

  return {
    users,
    recordCount: users.length,
  };
}; 