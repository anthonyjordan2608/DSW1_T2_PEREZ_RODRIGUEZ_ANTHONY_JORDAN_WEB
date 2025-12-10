import { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // ← Asegúrate de importar
import type { Loan } from '../../types';
import { loanService } from '../../services/loanService';

const LoanList = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  // ← Añade esto

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);
      const data = await loanService.getAll();
      setLoans(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los préstamos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (loanId: number) => {
    if (window.confirm('¿Marcar este préstamo como devuelto?')) {
      try {
        await loanService.returnLoan(loanId);
        loadLoans(); 
      } catch (err) {
        setError('Error al devolver el préstamo');
      }
    }
  };

  const handleNewLoan = () => {
    navigate('/loans/new');  
  };

  const handleViewActive = () => {
    navigate('/loans/active');  
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Cargando préstamos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📋 Todos los Préstamos</h2>
        <div>
          <Button 
            variant="outline-primary" 
            className="me-2" 
            onClick={handleViewActive}  
          >
            Ver Activos
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

      <Table striped bordered hover responsive className="table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Libro</th>
            <th>Estudiante</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loans.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">
                No hay préstamos registrados
              </td>
            </tr>
          ) : (
            loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.bookTitle}</td>
                <td>{loan.studentName}</td>
                <td>{formatDate(loan.loanDate)}</td>
                <td>{loan.returnDate ? formatDate(loan.returnDate) : 'Pendiente'}</td>
                <td>
                  <Badge bg={loan.status === 'Active' ? 'success' : 'secondary'}>
                    {loan.status === 'Active' ? 'Activo' : 'Devuelto'}
                  </Badge>
                </td>
                <td>
                  {loan.status === 'Active' && (
                    <Button variant="warning" size="sm" onClick={() => handleReturn(loan.id)}>
                      Marcar Devuelto
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default LoanList;