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
    setShowRegisterForm(false); // Reset to login form when user selects a user type
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div className="main">
      {!selectedUserType && (
        <UserSelectionForm onSelectUserType={handleUserTypeSelection} />
      )}

      {selectedUserType === 'borrower' && (
        <div>Borrower Content</div>
      )}

      {selectedUserType === 'lender' && (
        <div>Lender Content</div>
      )}

      {selectedUserType === 'admin' && (
        <div>Admin Content</div>
      )}

      {user ? (
        <Fragment>
          <h2>Welcome, {user.username}!</h2>
          {/* Your main content after login */}
        </Fragment>
      ) : (
        selectedUserType && (
          <Fragment>
            {showRegisterForm ? (
              <RegisterForm userType={selectedUserType} />
            ) : (
              <LoginForm userType={selectedUserType} />
            )}
            <button onClick={toggleRegisterForm}>
              {showRegisterForm ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </Fragment>
        )
      )}
    </div>
  );
};
