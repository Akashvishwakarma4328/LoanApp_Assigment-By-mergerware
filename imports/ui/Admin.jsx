
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Header from './Header';
import Footer from './Footer';
const Admin = () => {
    const location = useLocation();
    const { userId, userName, userType } = location.state || {};
    const [borrowerLoanHistory, setBorrowerLoanHistory] = useState([]);
    const [lenderLoanHistory, setLenderLoanHistory] = useState([]);

    useEffect(() => {
        fetchBorrowerLoanHistory();
        fetchLenderLoanHistory();
    }, []);

    const fetchBorrowerLoanHistory = () => {
        Meteor.call('admin.getBorrowerLoanHistory', (error, result) => {
            if (error) {
                console.error(error.reason);
            } else {
                setBorrowerLoanHistory(result);
            }
        });
    };

    const fetchLenderLoanHistory = () => {
        Meteor.call('admin.getLenderLoanHistory', (error, result) => {
            if (error) {
                console.error(error.reason);
            } else {
                setLenderLoanHistory(result);
            }
        });
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
    };

    const historyStyle = {
        width: '45%',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    };

    const liStyle = {
        margin: '5px 0',
        fontSize: '14px',
        color: '#333',
    };

    const headerStyle = {
        marginBottom: '10px',
        fontSize: '18px',
        color: '#333',
    };

    return (
        <div>
            
            <Header user={{ username: userName }} selectedUserType={userType} />
            <h2 style={{ textAlign: 'center' }}>Admin Page</h2>
            <div style={containerStyle}>
                <div style={historyStyle}>
                    <h2 style={headerStyle}>Borrower Loan History</h2>
                    <ul>
                        {borrowerLoanHistory.map((loan) => (
                            <li key={loan._id} style={liStyle}>
                                User: {loan.username}, Amount: {loan.amount}, Purpose: {loan.purpose}, Date Requested: {loan.dateRequested.toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={historyStyle}>
                    <h2 style={headerStyle}>Lender Loan History</h2>
                    <ul>
                        {lenderLoanHistory.map((loan) => (
                            <li key={loan._id} style={liStyle}>
                                User: {loan.username}, Amount: {loan.amount}, Purpose: {loan.purpose}, Date Lent: {loan.dateLent.toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Admin;
