import type { User, UserWithComputedFields } from '../types';

/**
 * Adds computed fields to an array of User objects
 */
export const addComputedFieldsToUsers = (users: User[]): UserWithComputedFields[] => {
  return users.map(user => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    daysSinceRegistered: (() => {
      const registration = new Date(user.registrationDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - registration.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    })(),
  }));
};

/**
 * Formats a date string for display
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
}; 