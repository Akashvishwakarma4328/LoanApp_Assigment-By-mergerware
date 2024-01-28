import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Borrower from './Borrower';
import Lender from './Lender';
import Admin from './Admin';

const App = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(true);

  const toggleForm = () => {
    setShowRegisterForm((prev) => !prev);
  };

  const handleLogin = () => {
    setShowRegisterForm(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <div style={containerStyle}>
                {showRegisterForm ? (
                  <RegisterForm />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )}
                <button onClick={toggleForm} style={buttonStyle}>
                  {showRegisterForm ? 'Switch to Login' : 'Switch to Register'}
                </button>
              </div>
              <Footer />
            </>
          }
        />
        <Route path='/borrower' element={<Borrower />} />
        <Route path='/lender' element={<Lender />} />
        <Route path='/admin' element={<Admin />} />
    
      </Routes>
    </Router>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '8px 16px',
  cursor: 'pointer',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
};

export default App;
