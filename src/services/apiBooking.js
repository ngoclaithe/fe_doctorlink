import axios from 'axios';

export const getBookings = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/danhsachlichkham`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách lịch khám:', error);
    throw new Error('Lỗi khi lấy danh sách lịch khám');
  }
};


export const getBookingsByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/danhsachlichkham/${id}`, {
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


export const registerBooking = async (data) => {
  try {
    console.log("Data gửi lên backend",data);
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/dangkylichkham`,
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


export const deleteBooking = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/xoalichkham/${id}`, {
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


export const updateBooking = async (id, data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/sualichkham/${id}`,
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

export const checkBookingByDoctorAndDate = async (id, data) => {
  try {
    let formattedDate;
    
    if (data.date instanceof Date) {
      const day = data.date.getDate().toString().padStart(2, '0');
      const month = (data.date.getMonth() + 1).toString().padStart(2, '0');
      const year = data.date.getFullYear();
      formattedDate = `${day}/${month}/${year}`;
    } else {
      formattedDate = data.date; 
    }

    console.log('doctorid:', data.doctorid);
    console.log('date ở apiBooking:', formattedDate);

    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/kiemtralichkham`,
      {
        doctorid: data.doctorid,
        date: formattedDate,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Giá trị Backend trả về:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi kiểm tra lịch khám:', error);
    throw new Error('Lỗi khi kiểm tra lịch khám');
  }
};


export const checkBookingByDoctor = async (id, data) => {
  try {

    console.log('Giá trị trước khi gọi BACKEND của doctorid:', data.doctorid);

    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/kiemtralichkhamtheobacsi`,
      {
        doctorid: data.doctorid,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Giá trị Backend trả về:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi kiểm tra lịch khám:', error);
    throw new Error('Lỗi khi kiểm tra lịch khám');
  }
};