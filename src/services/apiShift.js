import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

const handleError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    return Promise.reject({
      status: error.response.status,
      data: error.response.data,
      message: error.response.data.detail || 'Lỗi từ server'
    });
  } else if (error.request) {
    return Promise.reject({
      status: 0,
      message: 'Không thể kết nối đến server'
    });
  } else {
    return Promise.reject({
      message: error.message || 'Đã xảy ra lỗi khi gọi API'
    });
  }
};

export const caLamViecApi = {
  create: async (data) => {
    try {
      const response = await api.post('/ca-lam-viec', data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getById: async (caLamViecId) => {
    try {
      const response = await api.get(`/ca-lam-viec/${caLamViecId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getByDoctor: async (doctorId, sessionDate = null) => {
    try {
      let url = `/ca-lam-viec/bac-si/${doctorId}`;
      if (sessionDate) {
        url += `?session_date=${sessionDate}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  update: async (caLamViecId, updateData) => {
    try {
      const response = await api.put(`/ca-lam-viec/${caLamViecId}`, updateData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Xóa ca làm việc
  delete: async (caLamViecId) => {
    try {
      const response = await api.delete(`/ca-lam-viec/${caLamViecId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getCaKhamBenh: async (caLamViecId) => {
    try {
      const response = await api.get(`/ca-lam-viec/${caLamViecId}/ca-kham-benh`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

export const caKhamBenhApi = {
  getById: async (caKhamBenhId) => {
    try {
      const response = await api.get(`/ca-kham-benh/${caKhamBenhId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  getByDoctor: async (doctorId, sessionDate = null, status = null) => {
    try {
      let url = `/ca-kham-benh/bac-si/${doctorId}`;
      const params = [];
      
      if (sessionDate) {
        params.push(`session_date=${sessionDate}`);
      }
      
      if (status) {
        params.push(`status=${status}`);
      }
      
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  update: async (caKhamBenhId, updateData) => {
    try {
      const response = await api.put(`/ca-kham-benh/${caKhamBenhId}`, updateData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }
};

export default {
  caLamViecApi,
  caKhamBenhApi
};