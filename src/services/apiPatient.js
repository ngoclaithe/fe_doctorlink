import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getPatients = async () => {
    try {
        const response = await axios.get(`${API_URL}/detail_customer`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bệnh nhân:', error);
        throw error;
    }
};

export const createPatient = async (patientData) => {
    try {
        console.log(patientData);
        const response = await axios.post(`${API_URL}/detail_customer`, patientData, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo bệnh nhân:', error);
        throw error;
    }
};

export const updatePatient = async (id, patientData) => {
    try {
        const response = await axios.put(`${API_URL}/detail_customer/${id}`, patientData, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin bệnh nhân:', error);
        throw error;
    }
};

export const deletePatient = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/detail_customer/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa bệnh nhân:', error);
        throw error;
    }
}; 