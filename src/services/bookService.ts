import api from './api';
import type { Book, CreateBookDto } from '../types';

export const bookService = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get<Book[]>('/books');
    return response.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  create: async (book: CreateBookDto): Promise<Book> => {
    const response = await api.post<Book>('/books', book);
    return response.data;
  },

  update: async (id: number, book: CreateBookDto): Promise<void> => {
    await api.put(`/books/${id}`, book);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};