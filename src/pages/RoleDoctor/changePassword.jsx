import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../../services/apiAuth'; 
import { changePassword } from '../../services/apiAuth'; 
import { Layout } from '../../components/layout/Layout';

export const ChangePasswordDoctorPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = () => {
    navigate('/dangnhap');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    try {
      await changePassword(userId, newPassword);
      alert('Đổi mật khẩu thành công');
      navigate('/dangnhap');
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await checkLogin();
        if (response && response.user.id) {
          setUserId(response.user.id); 
        } else {
          navigate('/dangnhap');
        }
      } catch (error) {
        navigate('/dangnhap');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-auto lg:h-screen bg-gray-50 p-6">
        <aside className="lg:w-1/4 w-full bg-gray-100 p-6 border-r border-gray-200 rounded-lg mb-6 lg:mb-0 mt-[5%]">
          <ul className="space-y-4">
            <li>
              <button onClick={() => navigate('/lichkham')} className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300">Lịch khám</button>
            </li>
            <li>
              <button onClick={() => navigate('/doimatkhau')} className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300">Đổi mật khẩu</button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300">Đăng xuất</button>
            </li>
          </ul>
        </aside>

        <div className="lg:w-3/4 w-full p-6 bg-white rounded-lg shadow-md mt-[5%]">
          <h2 className="text-2xl font-bold mb-4">Đổi mật khẩu</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
              <input 
                type="password" 
                id="newPassword" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="mt-2 p-2 border border-gray-300 rounded-md w-full" 
                required 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
              <input 
                type="password" 
                id="confirmPassword" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="mt-2 p-2 border border-gray-300 rounded-md w-full" 
                required 
              />
            </div>
            <button type="submit" className="py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600">Đổi mật khẩu</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePasswordDoctorPage;
