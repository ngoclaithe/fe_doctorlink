import React, { useState, useEffect } from 'react';
import Layout from '../../components/layoutAdmin/Layout';
import { getDoctorServices, deleteService, createService, updateService } from '../../services/apiService';
import ServiceModal from '../../components/modal/ServiceModal';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const result = await getDoctorServices();
            setServices(result);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách dịch vụ:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteService(id);
            await fetchServices();
        } catch (error) {
            console.error("Lỗi khi xóa dịch vụ:", error);
        }
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedService(null);
        setIsModalOpen(true);
    };

    const handleSave = async (serviceData) => {
        try {
            if (selectedService) {
                await updateService(selectedService.id, serviceData);
            } else {
                await createService(serviceData);
            }
            await fetchServices();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Lỗi khi lưu dịch vụ:", error);
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý dịch vụ của bác sĩ</h1>
                    <button
                        className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                        onClick={handleAdd}
                    >
                        Thêm mới
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left">STT</th>
                                <th className="px-4 py-2 text-left">Mã bác sĩ</th>
                                <th className="px-4 py-2 text-left">Dịch vụ</th>
                                <th className="px-4 py-2 text-left">Phí dịch vụ</th>
                                <th className="px-4 py-2 text-left">Thao tác khả dụng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={service.id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">BS{String(service.doctor_id).padStart(4, '0')}</td>
                                    <td className="px-4 py-2">{service.description}</td>
                                    <td className="px-4 py-2">
                                        {new Intl.NumberFormat('vi-VN').format(service.price)} đ
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 mr-4"
                                            onClick={() => handleEdit(service)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleDelete(service.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <ServiceModal
                        isOpen={isModalOpen}
                        service={selectedService}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </Layout>
    );
};

export default ServiceManagement;