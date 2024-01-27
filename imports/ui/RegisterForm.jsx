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

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
