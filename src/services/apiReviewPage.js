import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

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

export const updateReview = async (id, reviewData) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/reviews/${id}`,
        reviewData,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật review:', error);
      throw new Error('Lỗi khi cập nhật review');
    }
};

export const deleteReview = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/reviews/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Lỗi khi xóa review:', error);
      throw new Error('Lỗi khi xóa review');
    }
};