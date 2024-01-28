import React from 'react';

const Header = ({ user, selectedUserType }) => {
    return (
        <header style={headerStyle}>
            <h1>Welcome, {user?.username || 'Guest'}</h1>
            {selectedUserType && <p>{selectedUserType}</p>}
        </header>
    );
};

const headerStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
};

export default Header;
