import React, { useState, useEffect } from 'react';
import { getDoctor, deleteDoctor, registerDoctor, updateDoctor } from '../../services/apiDoctor';
import DoctorModal from '../../components/modal/doctorModal';
import Sidebar from '../../components/layout/Sidebar';

const DoctorPageAdmin = () => {
    const [doctors, setDoctors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            const result = await getDoctor();
            console.log(result);
            setDoctors(result);
        };

        fetchDoctors();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoctor(id);
        const result = await getDoctor();
        setDoctors(result);
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
                await updateDoctor(selectedDoctor.id, doctorData);
            } else {
                console.log("Sending data to backend:", doctorData);
                await registerDoctor(doctorData);
            }
            const result = await getDoctor();
            setDoctors(result);
            setIsModalOpen(false);  
        } catch (error) {
            console.error("Error saving doctor:", error);
        }

    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6">
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
                                <th className="border border-gray-300 px-4 py-2">Tên</th>
                                <th className="border border-gray-300 px-4 py-2">Chuyên khoa</th>
                                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.length > 0 ? (
                                doctors.map((doctor) => (
                                    <tr key={doctor.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{doctor.name}</td>

                                        <td className="border border-gray-300 px-4 py-2">
                                            {doctor.specialty?.name || 'Không xác định'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{doctor.note}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="text-blue-600 hover:underline mr-4"
                                                onClick={() => handleEdit(doctor)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleDelete(doctor.id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-500 py-4">
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
        </div>
    );
};

export default DoctorPageAdmin;
