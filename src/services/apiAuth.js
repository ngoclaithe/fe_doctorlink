import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export const login = async (email, password) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await api.post('/user/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};

export const checkLogin = async () => {
  try {
    const response = await api.get('/user/check-login');
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};

export const changePassword = async (userId, newPassword) => {
  try {
    const response = await api.post('/api/change-password', {
      id: userId,
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};

export const getAllUser = async (data) => {
  try {
    const response = await api.get(
      '/user/users',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Something went wrong!';
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    throw new Error('Lỗi khi xóa người dùng');
  }
};

export const updateUser = async (id, data) => {
  try {
    console.log("gia tri user id khi da sua", id);
    const response = await api.put(
      `/user/users/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi sửa thông tin người dùng:', error);
    throw new Error('Lỗi khi sửa thông tin người dùng');
  }
};

export const registerUser = async (userData) => {
  try {
    const payload = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };

    const response = await api.post('/user/register', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Lỗi khi đăng ký người dùng';
      console.error('Lỗi khi đăng ký người dùng:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Lỗi kết nối với server:', error);
      throw new Error('Không thể kết nối với server. Vui lòng thử lại.');
    }
  }
};
