import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import type { CreateBookDto } from '../../types';
import { bookService } from '../../services/bookService';

const BookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateBookDto>({
    title: '',
    author: '',
    isbn: '',
    stock: 0,
  });

  useEffect(() => {
    if (isEditMode) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    try {
      setLoading(true);
      const book = await bookService.getById(parseInt(id!));
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        stock: book.stock,
      });
    } catch (err) {
      setError('Error al cargar el libro');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'stock' ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.title.trim() || !formData.author.trim() || !formData.isbn.trim()) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (formData.stock < 0) {
      setError('El stock no puede ser negativo');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (isEditMode) {
        await bookService.update(parseInt(id!), formData);
      } else {
        await bookService.create(formData);
      }
      
      navigate('/books');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar el libro');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Cargando libro...</p>
      </div>
    );
  }

  return (
    <Card className="form-container">
      <Card.Header as="h5">
        {isEditMode ? '✏️ Editar Libro' : '➕ Nuevo Libro'}
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ingrese el título del libro"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor *</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Ingrese el autor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ISBN *</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="Ingrese el código ISBN"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock Disponible</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Cantidad disponible"
            />
            <Form.Text className="text-muted">
              Cantidad de ejemplares disponibles para préstamo
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={() => navigate('/books')}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Spinner animation="border" size="sm" /> Guardando...
                </>
              ) : (
                isEditMode ? 'Actualizar' : 'Guardar'
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookForm;