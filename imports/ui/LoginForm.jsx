// LoginForm.jsx
import React, { useState } from 'react';

export const LoginForm = ({ userType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Use 'userType' as needed
        // Call the 'user.login' method with 'userType' parameter
        Meteor.call('user.login', email, password, userType, (error) => {
            if (error) {
                console.error(error.reason);
            } else {
                console.log('User logged in');
                // Additional logic after successful login
            }
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
