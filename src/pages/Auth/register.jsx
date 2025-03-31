import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/apiAuth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    gender: '',
    address: '',
    roleId: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const roleId = formData.role === 'guest' ? 'guest' : 'manage';
    const dataToSend = { ...formData, roleId };

    try {
      const result = await registerUser(dataToSend);
      if (result?.message === "Tạo tài khoản thành công.") {
        toast.success('Đăng ký thành công!');
        navigate('/dangnhap', { replace: true });
      } else {
        toast.error(result?.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-sm";
  const labelStyle = "block text-gray-600 text-sm font-medium mb-1";

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-sky-100 flex items-center justify-center py-8">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng ký tài khoản</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className={labelStyle}>Họ</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className={inputStyle}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="lastname" className={labelStyle}>Tên</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className={inputStyle}
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelStyle}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={inputStyle}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="password" className={labelStyle}>Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={inputStyle}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className={labelStyle}>Số điện thoại</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={inputStyle}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="gender" className={labelStyle}>Giới tính</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={inputStyle}
                >
                  <option value="">Chọn</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="address" className={labelStyle}>Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={inputStyle}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="role" className={labelStyle}>Vai trò</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={inputStyle}
              >
                <option value="">Chọn vai trò</option>
                <option value="guest">Người khám</option>
                <option value="manage">Quản lý</option>
              </select>
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white font-medium text-sm transition-colors duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Đã có tài khoản? </span>
            <a href="/dangnhap" className="text-blue-500 hover:underline font-medium">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
