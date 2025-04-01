import React, { useState, useEffect } from 'react';
import Layout from '../../components/layoutAdmin/Layout';
import PatientModal from '../../components/modal/PatientModal';
import { getPatients, createPatient, updatePatient, deletePatient } from '../../services/apiPatient';

const PatientManagement = () => {
    const [patients, setPatients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const result = await getPatients();
            setPatients(result);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bệnh nhân:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePatient(id);
            await fetchPatients();
        } catch (error) {
            console.error("Lỗi khi xóa bệnh nhân:", error);
        }
    };

    const handleEdit = (patient) => {
        setSelectedPatient(patient);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedPatient(null);
        setIsModalOpen(true);
    };

    const handleSave = async (patientData) => {
        try {
            if (selectedPatient) {
                await updatePatient(selectedPatient.user_id, patientData);
            } else {
                await createPatient(patientData);
            }
            await fetchPatients();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Lỗi khi lưu thông tin bệnh nhân:", error);
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý bệnh nhân</h1>
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
                                <th className="px-4 py-2 text-left">Họ và tên</th>
                                <th className="px-4 py-2 text-left">Giới tính</th>
                                <th className="px-4 py-2 text-left">Ngày sinh</th>
                                <th className="px-4 py-2 text-left">Số điện thoại</th>
                                <th className="px-4 py-2 text-left">Địa chỉ</th>
                                <th className="px-4 py-2 text-left">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient, index) => (
                                <tr key={patient.user_id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{patient.full_name}</td>
                                    <td className="px-4 py-2">{patient.gender}</td>
                                    <td className="px-4 py-2">{patient.dob}</td>
                                    <td className="px-4 py-2">{patient.phone}</td>
                                    <td className="px-4 py-2">{patient.address}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 mr-4"
                                            onClick={() => handleEdit(patient)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleDelete(patient.user_id)}
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
                    <PatientModal
                        isOpen={isModalOpen}
                        patient={selectedPatient}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </Layout>
    );
};

export default PatientManagement; 