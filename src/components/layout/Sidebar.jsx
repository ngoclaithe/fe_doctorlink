import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const handleLogout = () => {
    console.log("Đã đăng xuất");
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/dangnhap', { replace: true }); 
    console.log("Session sau khi logout", sessionStorage);
  };

  return (
    <div className="sidebar" style={styles.sidebar}>
      <h3 style={styles.title}>Dashboard</h3>
      {isLoggedIn ? (
        <>
          <button onClick={() => navigate('/admin/chuyenkhoa')} style={styles.button}>Chuyên khoa</button>
          <button onClick={() => navigate('/admin/bacsi')} style={styles.button}>Bác sĩ</button>
          <button onClick={() => navigate('/admin/coso')} style={styles.button}>Cơ sở khám chữa bệnh</button>
          <button onClick={() => navigate('/admin/lichkham')} style={styles.button}>Lịch khám</button>
          <button onClick={() => navigate('/admin/nguoidung')} style={styles.button}>Người dùng</button>
        </>
      ) : (
        <div>Chưa đăng nhập, vui lòng đăng nhập lại!</div>
      )}
      <button onClick={handleLogout} style={styles.button}>Đăng xuất</button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRight: '1px solid #ddd',
    height: '100vh',
  },
  title: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'block',
    textDecoration: 'none',
  },
};

export default Sidebar;
