// RegisterForm.jsx
import React, { useState } from 'react';

export const RegisterForm = ({ userType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        // Use 'userType' as needed
        // Call the 'user.register' method with 'userType' parameter
        Meteor.call('user.register', email, password, userType, (error, result) => {
            if (error) {
                console.error(error.reason);
            } else {
                console.log('User registered with ID:', result);
                // Additional logic after successful registration
            }
        });
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

    const inputStyle = {
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
        backgroundColor: '#2ecc71',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={formStyle}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Register</h2>
            <form onSubmit={handleRegister}>
                <label style={labelStyle}>
                    Email:
                    <input
                        style={inputStyle}
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label style={labelStyle}>
                    Password:
                    <input
                        style={inputStyle}
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <button style={buttonStyle} type="submit">Register</button>
            </form>
        </div>
    );
};
