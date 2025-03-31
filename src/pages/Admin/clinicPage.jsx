import React, { useState, useEffect } from 'react';
import { getClinics, deleteClinic, registerClinic, updateClinic } from '../../services/apiClinic';
import ClinicModal from '../../components/modal/clinicModal';
import Sidebar from '../../components/layout/Sidebar';

const ClinicPageAdmin = () => {
    const [clinics, setClinics] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);

    useEffect(() => {
        const fetchClinics = async () => {
            const result = await getClinics();
            console.log(result);
            setClinics(result);
        };

        fetchClinics();
    }, []);

    const handleDelete = async (id) => {
        await deleteClinic(id);
        const result = await getClinics();
        setClinics(result);
    };

    const handleEdit = (clinic) => {
        setSelectedClinic(clinic);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        console.log("Ấn button thêm cơ sở khám bệnh");
        setSelectedClinic(null);
        setIsModalOpen(true);
    };
    const handleSave = async (clinicData) => {
        try {
            if (selectedClinic) {
                // Update existing clinic
                await updateClinic(clinicData.id, clinicData);
            } else {
                // Create new clinic
                console.log("Sending data to backend:", clinicData);
                await registerClinic(clinicData);
            }
            // Fetch updated list
            const result = await getClinics();
            setClinics(result);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving clinic:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách cơ sở khám chữa bệnh</h1>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        onClick={handleAdd}
                    >
                        Thêm cơ sở khám chữa bệnh
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Tên cơ sở</th>
                                <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clinics.length > 0 ? (
                                clinics.map((clinic) => (
                                    <tr key={clinic.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{clinic.name}</td>

                                        <td className="border border-gray-300 px-4 py-2">
                                            {clinic?.address || 'Không xác định'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {clinic?.descriptionHTML	 || 'Không xác định'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                className="text-blue-600 hover:underline mr-4"
                                                onClick={() => handleEdit(clinic)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleDelete(clinic.id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-500 py-4">
                                        Không có data.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <ClinicModal
                        isOpen={isModalOpen}
                        clinic={selectedClinic}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}  
                    />
                )}
            </div>
        </div>
    );
};

export default ClinicPageAdmin;
