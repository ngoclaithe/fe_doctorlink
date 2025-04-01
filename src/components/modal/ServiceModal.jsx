import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ServiceModal = ({ isOpen, service, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        doctor_id: '',
        service_name: 'kham_tai_nha',
        description: '',
        price: '',
        duration: 60
    });

    useEffect(() => {
        if (service) {
            setFormData({
                doctor_id: service.doctor_id || '',
                service_name: service.service_name || 'kham_tai_nha',
                description: service.description || '',
                price: service.price || '',
                duration: service.duration || 60
            });
        } else {
            // Reset form khi thêm mới
            setFormData({
                doctor_id: '',
                service_name: 'kham_tai_nha',
                description: '',
                price: '',
                duration: 60
            });
        }
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Chuyển đổi giá trị price thành số
        const formattedData = {
            ...formData,
            price: parseFloat(formData.price),
            doctor_id: parseInt(formData.doctor_id)
        };
        onSave(formattedData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <h2 className="text-2xl font-bold mb-4">
                {service ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Mã bác sĩ</label>
                    <input
                        type="number"
                        name="doctor_id"
                        value={formData.doctor_id}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Mô tả dịch vụ</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Giá dịch vụ (VNĐ)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
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

export default ServiceModal; 