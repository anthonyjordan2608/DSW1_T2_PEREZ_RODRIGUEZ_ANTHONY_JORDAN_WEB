import api from './api';
import type { Loan, CreateLoanDto } from '../types';

export const loanService = {
  getAll: async (): Promise<Loan[]> => {
    const response = await api.get<Loan[]>('/loans');
    return response.data;
  },

  getActive: async (): Promise<Loan[]> => {
    const response = await api.get<Loan[]>('/loans/active');
    return response.data;
  },

  getById: async (id: number): Promise<Loan> => {
    const response = await api.get<Loan>(`/loans/${id}`);
    return response.data;
  },

  create: async (loan: CreateLoanDto): Promise<Loan> => {
    const response = await api.post<Loan>('/loans', loan);
    return response.data;
  },

  returnLoan: async (id: number): Promise<void> => {
    await api.put(`/loans/${id}/return`);
  },
};