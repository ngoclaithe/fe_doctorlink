import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AccountSection = () => {
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user')); 
    console.log("Gia tri user trong session", user);
    if (user) {
      setRoleId(user.roleId); 
      if (user.roleId === 'manage') {
        navigate('/lichkhambacsi');
      } else if (user.roleId === 'guest') {
        navigate('/lichkham');
      }
    } else {
      navigate('/dangnhap');
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log("Đã đăng xuất");
    sessionStorage.removeItem('user');
    navigate('/dangnhap'); 
    console.log("Session sau khi logout", sessionStorage);
  };

  const handleNavigate = (roleId) => {
    if (roleId === 'manage') {
      navigate('/lichkhambacsi');
    } else if (roleId === 'guest') {
      navigate('/lichkham');
    } else {
      navigate('/dangnhap');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen bg-gray-50 p-6">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full bg-gray-100 p-6 border-r border-gray-200 rounded-lg mb-6 lg:mb-0 mt-[5%]">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleNavigate(roleId)} 
              className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
            >
              Lịch khám
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/doimatkhau')}
              className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
            >
              Đổi mật khẩu
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </aside>

      <div className="lg:w-3/4 w-full p-6 bg-white rounded-lg shadow-md mt-[5%]">
        <p className="text-gray-600 mt-2">
        </p>
      </div>
    </div>
  );
};
