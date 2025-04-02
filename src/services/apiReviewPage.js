import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// export const getReviews = async () => {
//     try {
//         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/reviews`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//         throw error;
//     }
// };

export const getReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/reviews`,
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