import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { Meteor } from 'meteor/meteor';
import Footer from './Footer';

const Borrower = () => {
    const location = useLocation();
    const { userId, userName, userType } = location.state || {};
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPurpose, setLoanPurpose] = useState('');
    const [loanHistory, setLoanHistory] = useState([]);

    useEffect(() => {
        fetchLoanHistory();
    }, [userId]);

    const fetchLoanHistory = () => {
        Meteor.call('borrower.getLoanHistory', userId, (error, result) => {
            if (error) {
                console.error(error.reason);
            } else {
                setLoanHistory(result);
            }
        });
    };

    const handleLoanRequest = (event) => {
        event.preventDefault();

        Meteor.call('borrower.requestLoan', userId, loanAmount, loanPurpose, (error, result) => {
            if (error) {
                console.error(error.reason);
            } else {
                console.log('Loan requested successfully. Loan ID:', result);
                fetchLoanHistory();
                setLoanAmount('');
                setLoanPurpose('');
            }
        });
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
    };

    const formStyle = {
        width: '45%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    };

    const historyStyle = {
        width: '45%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
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

    const liStyle = {
        margin: '5px 0',
        fontSize: '14px',
        color: '#333',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '5px 0',
        boxSizing: 'border-box',
    };

    return (
        <div>
            <Header user={{ username: userName }} selectedUserType={userType} />
            <div style={containerStyle}>
                <div style={formStyle}>
                    <h2 style={{ textAlign: 'center', color: '#3498db' }}>Loan Request Form</h2>
                    <form onSubmit={handleLoanRequest}>
                        <label>
                            Loan Amount:
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Loan Purpose:
                            <input
                                type="text"
                                value={loanPurpose}
                                onChange={(e) => setLoanPurpose(e.target.value)}
                                style={inputStyle}
                            />
                        </label>
                        <button type="submit" style={buttonStyle}>
                            Request Loan
                        </button>
                    </form>
                </div>
                <div style={historyStyle}>
                    <h2 style={{ textAlign: 'center', color: '#3498db' }}>Loan History</h2>
                    <ul>
                        {loanHistory.map((request) => (
                            <li key={request._id} style={liStyle}>
                                Amount: {request.amount}, Purpose: {request.purpose}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Borrower;
