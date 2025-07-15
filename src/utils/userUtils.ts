import type { User, UserWithComputedFields } from '../models/types';

/**
 * Computes the full name from first and last name
 */
export const computeFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

/**
 * Computes the number of days since registration
 */
export const computeDaysSinceRegistered = (registrationDate: string): number => {
  const registration = new Date(registrationDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - registration.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Adds computed fields to a User object
 */
export const addComputedFields = (user: User): UserWithComputedFields => {
  return {
    ...user,
    fullName: computeFullName(user.firstName, user.lastName),
    daysSinceRegistered: computeDaysSinceRegistered(user.registrationDate),
  };
};

/**
 * Adds computed fields to an array of User objects
 */
export const addComputedFieldsToUsers = (users: User[]): UserWithComputedFields[] => {
  return users.map(addComputedFields);
};

/**
 * Formats a date string for display
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

/**
 * Formats a phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Simple formatting - can be enhanced with a proper phone formatting library
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}; 