// src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoBookingCare from '../../assets/images/logo.png';
import { checkLogin } from '../../services/apiAuth';  

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyLoginStatus = async () => {
      try {
        const data = await checkLogin();
        setIsLoggedIn(data.loggedIn);  
      } catch (error) {
        console.error('Lỗi khi kiểm tra đăng nhập:', error);
        setIsLoggedIn(false);  
      }
    };

    verifyLoginStatus();  
  }, []);

  const menuItems = [
    { title: 'Chuyên khoa', path: '/chuyenkhoa' },
    // { title: 'Cơ sở y tế', path: '/cosokhambenh' },
    { title: 'Bác sĩ', path: '/bacsi' },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logoBookingCare} alt="BookingCare Logo" className="h-8 w-auto" />
          <span className="text-xl font-semibold text-sky-400">DoctorLink</span>
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-gray-700 font-medium hover:text-teal-500 transition"
            >
              {item.title}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              to="/taikhoan"
              className="text-gray-700 font-medium hover:text-teal-500 transition"
            >
              Tài khoản
            </Link>
          ) : (
            <Link
              to="/dangnhap"
              className="text-gray-700 font-medium hover:text-teal-500 transition"
            >
              Đăng nhập
            </Link>
          )}
        </nav>

        {/* Language Switcher */}
        <div className="flex space-x-2">
          <Link to="#" className="text-gray-700 hover:text-teal-500">
            VI
          </Link>
          <span className="text-gray-500">|</span>
          <Link to="#" className="text-gray-700 hover:text-teal-500">
            EN
          </Link>
        </div>
      </div>
    </header>
  );
};
