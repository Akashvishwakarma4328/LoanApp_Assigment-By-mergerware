// client/components/LoginForm.js
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedUserType, setSelectedUserType] = useState('borrower');
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (event) => {
        event.preventDefault();

        Meteor.call('user.login', email, password, selectedUserType, (error, result) => {
            if (error) {
                console.error(error.reason);
            } else {
                console.log('User logged in', result);
                if (result && result.userType && result.name && result.userId) {
                    onLogin(result);
                    // Pass the user type, name, and userId to the parent component
                    console.log(result.userType + " " + result.name + " " + result.userId);
                    handleNavigation(result.userType, result.name, result.userId);
                } else {
                    // Handle the case where result is missing expected properties
                    console.error('Invalid login result structure');
                }
            }
        });
    };

    const handleNavigation = (userType, userName, userId) => {
        console.log(userType, userName, userId);
        if (userType === 'borrower') {
            navigate('/borrower', { state: { userName, userType, userId } });
        } else if (userType === 'lender') {
            navigate('/lender', { state: { userName, userType, userId } });
        } else if (userType === 'admin') {
            navigate('/admin', { state: { userName, userType, userId } });
        } else {
            navigate('/home');
        }
    };

    // Access state from the previous location
    const previousState = location.state;

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
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                        name="userType"
                        value={selectedUserType}
                        onChange={(event) => setSelectedUserType(event.target.value)}
                    >
                        <option value="borrower">Borrower</option>
                        <option value="lender">Lender</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <button style={buttonStyle} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
