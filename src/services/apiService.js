import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getServices = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/service`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyên khoa:', error);
    throw new Error('Lỗi khi lấy danh sách chuyên khoa');
  }
};

export const getServicesByID = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/service/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyên khoa theo ID:', error);
    throw new Error('Lỗi khi lấy danh sách chuyên khoa theo ID');
  }
};

export const getDoctorService = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/service/doctor/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyên khoa theo ID:', error);
    throw new Error('Lỗi khi lấy danh sách chuyên khoa theo ID');
  }
};

export const registerService = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/service`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi đăng ký chuyên khoa:', error);
    throw new Error('Lỗi khi đăng ký chuyên khoa');
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/service/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa dịch vụ:', error);
    throw error;
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/service/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật dịch vụ:', error);
    throw error;
  }
};

export const getDoctorServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/service`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dịch vụ:', error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await axios.post(`${API_URL}/service`, serviceData, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo dịch vụ:', error);
    throw error;
  }
};
