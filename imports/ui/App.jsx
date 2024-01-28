// App.jsx
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { UserSelectionForm } from './UserSelectionForm';

export const App = () => {
  const [selectedUserType, setSelectedUserType] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const user = useTracker(() => Meteor.user());

  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);
    setShowRegisterForm(false);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const mainContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const mainStyle = {
    width: '80%',
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };

  const contentStyle = {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
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
    <div style={mainContainerStyle}>
      <div style={mainStyle}>
        {!selectedUserType && (
          <UserSelectionForm onSelectUserType={handleUserTypeSelection} />
        )}

        {user ? (
          <Fragment>
            <h2>Welcome, {user.username}!</h2>
            {/* Render content based on user type */}
            {selectedUserType === 'borrower' && (
              <div style={contentStyle}>Borrower Content</div>
            )}

            {selectedUserType === 'lender' && (
              <div style={contentStyle}>Lender Content</div>
            )}

            {selectedUserType === 'admin' && (
              <div style={contentStyle}>Admin Content</div>
            )}
          </Fragment>
        ) : (
          selectedUserType && (
            <Fragment>
              {showRegisterForm ? (
                <RegisterForm userType={selectedUserType} />
              ) : (
                <LoginForm userType={selectedUserType} />
              )}
              <button style={buttonStyle} onClick={toggleRegisterForm}>
                {showRegisterForm ? 'Switch to Login' : 'Switch to Register'}
              </button>
            </Fragment>
          )
        )}
      </div>
    </div>
  );
};
