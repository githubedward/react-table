export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  dateOfBirth: string;
  registrationDate: string;
  isActive: boolean;
  role: 'user' | 'admin' | 'moderator';
  avatar: string;
}

export interface UserWithComputedFields extends User {
  fullName: string;
  daysSinceRegistered: number;
}

export interface ColumnConfig {
  key: keyof UserWithComputedFields;
  label: string;
  sortable: boolean;
  order: number;
  width?: string;
}

export interface SortConfig {
  key: keyof UserWithComputedFields;
  direction: 'asc' | 'desc';
}

export interface TableState {
  data: UserWithComputedFields[];
  sortConfig: SortConfig | null;
  columnOrder: ColumnConfig[];
  isLoading: boolean;
  error: string | null;
} 