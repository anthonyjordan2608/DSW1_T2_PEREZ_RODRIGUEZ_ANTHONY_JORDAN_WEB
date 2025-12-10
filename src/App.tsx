import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/shared/Navbar';
import BookList from './components/books/BookList';
import BookForm from './components/books/BookForm';
import LoanList from './components/loans/LoanList';
import ActiveLoans from './components/loans/ActiveLoans';
import LoanForm from './components/loans/LoanForm';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container className="app-container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="/loans" element={<LoanList />} />
          <Route path="/loans/new" element={<LoanForm />} />
          <Route path="/loans/active" element={<ActiveLoans />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
