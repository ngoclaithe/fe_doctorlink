import React, { useState, useEffect } from 'react';
import { getDoctor, deleteDoctor, registerDoctor, updateDoctor } from '../../services/apiDoctor';
import DoctorModal from '../../components/modal/doctorModal';
import Layout from '../../components/layoutAdmin/Layout';

const DoctorPageAdmin = () => {
    const [doctors, setDoctors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const result = await getDoctor();
            console.log(result);
            setDoctors(result);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await deleteDoctor(userId);
            fetchDoctors();
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

    const handleEdit = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        console.log("Ấn button thêm bác sĩ");
        setSelectedDoctor(null);
        setIsModalOpen(true);
    };

    const handleSave = async (doctorData) => {
        try {
            if (selectedDoctor) {
                // Update existing doctor
                await updateDoctor(selectedDoctor.user_id, doctorData);
            } else {
                console.log("Sending data to backend:", doctorData);
                await registerDoctor(doctorData);
            }
            fetchDoctors();
            setIsModalOpen(false);  
        } catch (error) {
            console.error("Error saving doctor:", error);
        }
    };

    const handleImageError = (e) => {
        e.target.src = require('../../assets/images/bacsi/default.jpg');
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách bác sĩ</h1>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        onClick={handleAdd}
                    >
                        Thêm bác sĩ
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Ảnh</th>
                                <th className="border border-gray-300 px-4 py-2">Tên</th>
                                <th className="border border-gray-300 px-4 py-2">Chuyên khoa</th>
                                <th className="border border-gray-300 px-4 py-2">Số năm KN</th>
                                <th className="border border-gray-300 px-4 py-2">Đánh giá</th>
                                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.length > 0 ? (
                                doctors.map((doctor) => (
                                    <tr key={doctor.user_id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex justify-center">
                                                <img 
                                                    src={doctor.image_url ? require(`../../assets/images/bacsi/${doctor.image_url}`) : require('../../assets/images/bacsi/default.jpg')} 
                                                    alt={`Bác sĩ ${doctor.full_name}`} 
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-300 shadow-md" 
                                                    onError={handleImageError}
                                                />
                                            </div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{doctor.full_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {doctor.specialty?.name || 'Không xác định'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{doctor.experience_years}</td>
                                        <td className="border border-gray-300 px-4 py-2">{doctor.avg_rating}</td>
                                        <td className="border border-gray-300 px-4 py-2">{doctor.bio}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="text-blue-600 hover:underline mr-4"
                                                onClick={() => handleEdit(doctor)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleDelete(doctor.user_id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-500 py-4">
                                        Không có bác sĩ nào được tìm thấy.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <DoctorModal
                        isOpen={isModalOpen}
                        doctor={selectedDoctor}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}  
                    />
                )}
            </div>
        </Layout>
    );
};

export default DoctorPageAdmin;