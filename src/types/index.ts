// Tipos para Libros
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  stock: number;
  createdAt: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  isbn: string;
  stock: number;
}

// Tipos para Préstamos
export interface Loan {
  id: number;
  bookId: number;
  bookTitle: string;
  studentName: string;
  loanDate: string;
  returnDate: string | null;
  status: string;
  createdAt: string;
}

export interface CreateLoanDto {
  bookId: number;
  studentName: string;
}