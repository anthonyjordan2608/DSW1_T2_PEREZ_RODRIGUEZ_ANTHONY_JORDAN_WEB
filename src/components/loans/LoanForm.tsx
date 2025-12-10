import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';  
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import type { CreateLoanDto, Book } from '../../types';
import { loanService } from '../../services/loanService';
import { bookService } from '../../services/bookService';

const LoanForm = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  
  const [formData, setFormData] = useState<CreateLoanDto>({
    bookId: 0,
    studentName: '',
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAll();
      const availableBooks = data.filter(book => book.stock > 0);
      setBooks(availableBooks);
      
      if (availableBooks.length > 0) {
        setFormData(prev => ({
          ...prev,
          bookId: availableBooks[0].id
        }));
      }
    } catch (err) {
      setError('Error al cargar los libros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // CORREGIDO: Separar manejadores para cada tipo de campo
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      bookId: parseInt(e.target.value) || 0,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      studentName: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.bookId || !formData.studentName.trim()) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      await loanService.create(formData);
      navigate('/loans');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al registrar el préstamo';
      setError(errorMessage);
      
      if (errorMessage.includes('stock')) {
        loadBooks();
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Cargando libros disponibles...</p>
      </div>
    );
  }

  return (
    <Card className="form-container">
      <Card.Header as="h5">➕ Nuevo Préstamo</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {books.length === 0 ? (
          <Alert variant="warning">
            No hay libros disponibles para préstamo. Todos los libros tienen stock 0.
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Libro *</Form.Label>
              <Form.Select
                name="bookId"
                value={formData.bookId}
                onChange={handleSelectChange}  // ← CAMBIADO
                required
              >
                <option value="">Seleccione un libro</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} - {book.author} (Stock: {book.stock})
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Solo se muestran libros con stock disponible
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre del Estudiante *</Form.Label>
              <Form.Control
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}  // ← CAMBIADO
                placeholder="Ingrese el nombre completo del estudiante"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate('/loans')}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Spinner animation="border" size="sm" /> Registrando...
                  </>
                ) : (
                  'Registrar Préstamo'
                )}
              </Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default LoanForm;