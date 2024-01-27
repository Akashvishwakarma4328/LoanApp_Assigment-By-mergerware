// UserSelectionForm.jsx
import React, { useState } from 'react';

export const UserSelectionForm = ({ onSelectUserType }) => {
    const [userType, setUserType] = useState('');

    const handleUserSelection = (event) => {
        event.preventDefault();
        onSelectUserType(userType);
    };

    return (
        <div>
            <h2>Select User Type</h2>
            <form onSubmit={handleUserSelection}>
                <label>
                    User Type:
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="">Select User Type</option>
                        <option value="borrower">Borrower</option>
                        <option value="lender">Lender</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <br />
                <button type="submit" disabled={!userType}>
                    Continue
                </button>
            </form>
        </div>
    );
};
