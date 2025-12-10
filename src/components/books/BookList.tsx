import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import type { Book } from '../../types';
import { bookService } from '../../services/bookService';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAll();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los libros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      try {
        await bookService.delete(id);
        loadBooks(); 
      } catch (err) {
        setError('Error al eliminar el libro');
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/books/edit/${id}`);
  };

  const handleCreate = () => {
    navigate('/books/new');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Cargando libros...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📚 Lista de Libros</h2>
        <Button variant="primary" onClick={handleCreate}>
          + Nuevo Libro
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive className="table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No hay libros registrados
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <code>{book.isbn}</code>
                </td>
                <td>
                  <Badge bg={book.stock > 0 ? 'success' : 'danger'}>
                    {book.stock} {book.stock === 1 ? 'disponible' : 'disponibles'}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="warning" 
                      size="sm" 
                      onClick={() => handleEdit(book.id)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDelete(book.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      <div className="mt-3 text-muted">
        <small>
          Mostrando {books.length} libro{books.length !== 1 ? 's' : ''} | 
          Con stock disponible: {books.filter(b => b.stock > 0).length} | 
          Sin stock: {books.filter(b => b.stock === 0).length}
        </small>
      </div>
    </div>
  );
};

export default BookList;