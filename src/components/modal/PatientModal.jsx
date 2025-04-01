import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getCustomerUsers } from '../../services/apiUser';

const PatientModal = ({ isOpen, patient, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        user_id: '',
        full_name: '',
        gender: 'other',
        dob: '',
        phone: '',
        address: ''
    });
    const [customerUsers, setCustomerUsers] = useState([]);

    useEffect(() => {
        // Lấy danh sách user có role là customer
        const fetchCustomerUsers = async () => {
            try {
                const users = await getCustomerUsers();
                setCustomerUsers(users);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách khách hàng:', error);
            }
        };
        fetchCustomerUsers();
    }, []);

    useEffect(() => {
        if (patient) {
            setFormData({
                user_id: patient.user_id || '',
                full_name: patient.full_name || '',
                gender: patient.gender || 'other',
                dob: patient.dob || '',
                phone: patient.phone || '',
                address: patient.address || ''
            });
        } else {
            // Nếu là thêm mới và có customer users
            if (customerUsers.length > 0) {
                setFormData({
                    user_id: customerUsers[0].id, // Gán user_id mặc định là ID của customer đầu tiên
                    full_name: '',
                    gender: 'other',
                    dob: '',
                    phone: '',
                    address: ''
                });
            }
        }
    }, [patient, customerUsers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <h2 className="text-2xl font-bold mb-4">
                {patient ? 'Chỉnh sửa thông tin bệnh nhân' : 'Thêm bệnh nhân mới'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">ID Người dùng</label>
                    <select
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        {customerUsers.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.id} - {user.email}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Họ và tên</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                        maxLength={100}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Ngày sinh</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Số điện thoại</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        maxLength={15}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        maxLength={255}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default PatientModal; 