import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        throw error;
    }
};

export const getCustomerUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/users`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });
        // Lọc chỉ lấy các user có role là customer
        return response.data.filter(user => user.role === 'customer');
    } catch (error) {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
        throw error;
    }
}; 