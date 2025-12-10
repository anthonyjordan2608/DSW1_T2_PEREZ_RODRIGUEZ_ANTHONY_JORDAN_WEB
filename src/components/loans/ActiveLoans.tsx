import { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  
import type { Loan } from '../../types';
import { loanService } from '../../services/loanService';

const ActiveLoans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  

  useEffect(() => {
    loadActiveLoans();
  }, []);

  const loadActiveLoans = async () => {
    try {
      setLoading(true);
      const data = await loanService.getActive();
      setLoans(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los préstamos activos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (loanId: number) => {
    if (window.confirm('¿Marcar este préstamo como devuelto?')) {
      try {
        await loanService.returnLoan(loanId);
        loadActiveLoans();
      } catch (err) {
        setError('Error al devolver el préstamo');
      }
    }
  };

  const handleViewAll = () => {
    navigate('/loans');  
  };

  const handleNewLoan = () => {
    navigate('/loans/new');  
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Cargando préstamos activos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📋 Préstamos Activos</h2>
        <div>
          <Button 
            variant="outline-secondary" 
            className="me-2" 
            onClick={handleViewAll}  
          >
            Ver Todos
          </Button>
          <Button 
            variant="primary" 
            onClick={handleNewLoan}  
          >
            + Nuevo Préstamo
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loans.length === 0 ? (
        <Alert variant="info">
          No hay préstamos activos en este momento.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Libro</th>
              <th>Estudiante</th>
              <th>Fecha Préstamo</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>
                  <strong>{loan.bookTitle}</strong>
                </td>
                <td>{loan.studentName}</td>
                <td>{formatDate(loan.loanDate)}</td>
                <td>
                  <Badge bg="success">Activo</Badge>
                </td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleReturn(loan.id)}>
                    Marcar Devuelto
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ActiveLoans;