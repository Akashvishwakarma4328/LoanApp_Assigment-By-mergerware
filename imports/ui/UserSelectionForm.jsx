// UserSelectionForm.jsx
import React, { useState } from 'react';

export const UserSelectionForm = ({ onSelectUserType }) => {
    const [userType, setUserType] = useState('');

    const handleUserSelection = (event) => {
        event.preventDefault();
        onSelectUserType(userType);
    };

    const formStyle = {
        maxWidth: '300px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    };

    const labelStyle = {
        display: 'block',
        margin: '10px 0',
        color: '#333',
    };

    const selectStyle = {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        boxSizing: 'border-box',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    };

    return (
        <div style={formStyle}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Select User Type</h2>
            <form onSubmit={handleUserSelection}>
                <label style={labelStyle}>
                    User Type:
                    <select
                        style={selectStyle}
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="">Select User Type</option>
                        <option value="borrower">Borrower</option>
                        <option value="lender">Lender</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <button style={buttonStyle} type="submit" disabled={!userType}>
                    Continue
                </button>
            </form>
        </div>
    );
};
