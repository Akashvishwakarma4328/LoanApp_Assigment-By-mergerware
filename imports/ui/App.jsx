// App.jsx
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { UserSelectionForm } from './UserSelectionForm';

export const App = () => {
  const [selectedUserType, setSelectedUserType] = useState('');

  const user = useTracker(() => Meteor.user());

  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);
  };

  return (
    <div className="main">
      {!selectedUserType && (
        <UserSelectionForm onSelectUserType={handleUserTypeSelection} />
      )}

      {selectedUserType === 'borrower' && (
        // Borrower-specific content or forms
        <div>Borrower Content</div>
      )}

      {selectedUserType === 'lender' && (
        // Lender-specific content or forms
        <div>Lender Content</div>
      )}

      {selectedUserType === 'admin' && (
        // Admin-specific content or forms
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
            <LoginForm userType={selectedUserType} />
            <RegisterForm userType={selectedUserType} />
          </Fragment>
        )
      )}
    </div>
  );
};
