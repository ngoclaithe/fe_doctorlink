import axios from 'axios';

export const getClinics = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/danhsachcoso`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách chuyên khoa:', error);
    throw new Error('Lỗi khi lấy danh sách chuyên khoa');
  }
};


export const getClinicsByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/danhsachcoso/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách theo ID:', error);
    throw new Error('Lỗi khi lấy danh sách theo ID');
  }
};


export const getDoctorClinics = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/bacsicoso/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bác sĩ theo cơ sở:', error);
    throw new Error('Lỗi khi lấy danh sách bác sĩ theo cơ sở');
  }
};


export const registerClinic = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/dangkycoso`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi đăng ký cơ sở:', error);
    throw new Error('Lỗi khi đăng ký cơ sở');
  }
};


export const deleteClinic = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/xoacoso/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa chuyên khoa:', error);
    throw new Error('Lỗi khi xóa chuyên khoa');
  }
};


export const updateClinic = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/suacoso/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi sửa thông tin chuyên khoa:', error);
    throw new Error('Lỗi khi sửa thông tin chuyên khoa');
  }
};
