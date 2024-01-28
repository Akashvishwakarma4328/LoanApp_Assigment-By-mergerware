import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { Meteor } from 'meteor/meteor';
import Footer from './Footer';

const Lender = () => {
    const location = useLocation();
    const { userId, userName, userType } = location.state || {};
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPurpose, setLoanPurpose] = useState('');
    const [loanHistory, setLoanHistory] = useState([]);

    useEffect(() => {
        fetchLoanHistory();
    }, [userId]);

    const fetchLoanHistory = () => {
        Meteor.call('lender.getLoanHistory', userId, (error, result) => {
            if (error) {
                console.error(error.reason);
            } else {
                setLoanHistory(result);
            }
        });
    };

    const handleLoanLend = (event) => {
        event.preventDefault();

        Meteor.call('lender.lendLoan', userId, loanAmount, loanPurpose, (error, result) => {
            if (error) {
                console.error(error.reason);
            } else {
                console.log('Loan lended successfully. Loan ID:', result);
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

    const historyItemStyle = {
        color: '#3498db', 
        marginBottom: '10px',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        margin: '10px 0',
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
        <div>
            
            <Header user={{ username: userName }} selectedUserType={userType} />

            
            <div style={containerStyle}>
                
                <div style={formStyle}>
                    <h2 style={{ textAlign: 'center', color: '#3498db' }}>Lend Money Form</h2>
                    
                    <form onSubmit={handleLoanLend}>
                        <label>
                            Amount:
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Purpose:
                            <input
                                type="text"
                                value={loanPurpose}
                                onChange={(e) => setLoanPurpose(e.target.value)}
                                style={inputStyle}
                            />
                        </label>
                        <button type="submit" style={buttonStyle}>
                            Lend Money
                        </button>
                    </form>
                </div>

               
                <div style={historyStyle}>
                    <h2 style={{ textAlign: 'center', color: '#3498db' }}>Lending History</h2>
                   
                    <ul>
                        {loanHistory.map((lending) => (
                            <li key={lending._id} style={historyItemStyle}>
                                Amount: {lending.amount}, Purpose: {lending.purpose}, Date: {lending.dateLent.toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Lender;
