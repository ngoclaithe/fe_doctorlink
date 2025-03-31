import axios from 'axios';

export const getSpecialties = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/specialty`,
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

export const getSpecialtiesByID = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/specialty/${id}`,
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

export const getDoctorSpecialties = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/specialty/doctor/${id}`,
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

export const registerSpecialty = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/specialty`,
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

export const deleteSpecialty = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/specialty/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa chuyên khoa:', error);
    throw new Error('Lỗi khi xóa chuyên khoa');
  }
};

export const updateSpecialty = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/specialty/${id}`,
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
    console.error('Lỗi khi sửa thông tin chuyên khoa:', error);
    throw new Error('Lỗi khi sửa thông tin chuyên khoa');
  }
};
