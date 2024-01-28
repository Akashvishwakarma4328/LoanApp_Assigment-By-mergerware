// App.jsx
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import Borrower from './Borrower';
import Lender from './Lender';
import Admin from './Admin';
import Home from './Home';

const Index = () => {
  const [selectedUserType, setSelectedUserType] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userTypeInput, setUserTypeInput] = useState('');
  const [alert, setAlert] = useState(null);

  const user = useTracker(() => Meteor.user());

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleRedirect = () => {
    setRedirect(true);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // Clear the alert after a few seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const PrivateRoute = ({ element: Element, ...rest }) => (
    <Route
      {...rest}
      element={Meteor.userId() ? (
        <Element />
      ) : (
        <Navigate to="/" />
      )}
    />
  );

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const formStyle = {
    width: '300px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Header />

              <div style={formContainerStyle}>
                {alert && (
                  <div
                    style={{
                      marginBottom: '10px',
                      padding: '8px',
                      backgroundColor: alert.type === 'error' ? '#e74c3c' : '#2ecc71',
                      color: '#fff',
                      borderRadius: '5px',
                    }}
                  >
                    {alert.message}
                  </div>
                )}

                {user ? (
                  <Fragment>
                    <h2>Welcome, {user.username}!</h2>
                    {/* Render content based on user type */}
                    {selectedUserType === 'borrower' && <div className="content">Borrower Content</div>}

                    {selectedUserType === 'lender' && <div className="content">Lender Content</div>}

                    {selectedUserType === 'admin' && <div className="content">Admin Content</div>}

                    {/* Redirect and display user information */}
                    {redirect && Meteor.userId() && (
                      <div className="user-info">
                        <p>User Type: {selectedUserType}</p>
                        <p>Email: {user.emails[0].address}</p>
                      </div>
                    )}
                  </Fragment>
                ) : (
                  <div style={formStyle}>
                    {showRegisterForm ? (
                      <RegisterForm
                        userType={selectedUserType}
                        showAlert={showAlert} // Pass showAlert function to RegisterForm
                      />
                    ) : (
                      <LoginForm
                        userType={selectedUserType}
                        onLogin={() => {
                          handleRedirect();
                          showAlert('success', 'Login successful!');
                        }}
                      />
                    )}
                    <button onClick={toggleRegisterForm} style={buttonStyle}>
                      {showRegisterForm ? 'Switch to Login' : 'Switch to Register'}
                    </button>
                  </div>
                )}
              </div>
              

              <Footer />
            </Fragment>
          }
        />
        <Route path='/home' element={<Home/>} />
        <Route path='/borrower' element={<Borrower />} />
        <Route path='/lender' element={<Lender />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default Index;
