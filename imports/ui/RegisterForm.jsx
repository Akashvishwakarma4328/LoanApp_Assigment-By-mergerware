// client/components/RegisterForm.js
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const RegisterForm = ({ showAlert }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userTypeInput, setUserTypeInput] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();

        Meteor.call('user.register', email, password, userTypeInput, name, (error, result) => {
            if (error) {
                console.error(error.reason);
                showAlert('error', 'Registration failed. Please try again.');
            } else {
                console.log('User registered with ID:', result);
                showAlert('success', 'Registration successful!');
            }
        });
    };

    const formStyle = {
        width: '300px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    };

    const labelStyle = {
        display: 'block',
        margin: '10px 0',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        boxSizing: 'border-box',
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
        <div style={formStyle}>
            <h2>Register</h2>
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
                <label style={labelStyle}>
                    User Type:
                    <select
                        style={inputStyle}
                        name="userTypeInput"
                        value={userTypeInput}
                        onChange={(event) => setUserTypeInput(event.target.value)}
                    >
                        <option value="borrower">Borrower</option>
                        <option value="lender">Lender</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <label style={labelStyle}>
                    Name:
                    <input
                        style={inputStyle}
                        type="text"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <button style={buttonStyle} type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
