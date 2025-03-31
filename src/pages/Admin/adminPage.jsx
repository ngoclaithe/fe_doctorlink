// src/pages/Admin/adminpage.jsx
import React from 'react';
import Sidebar from '../../components/layout/Sidebar';

const AdminPage = () => {
    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.content}>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
    },
    content: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '100vh',
    },
};

export default AdminPage;
