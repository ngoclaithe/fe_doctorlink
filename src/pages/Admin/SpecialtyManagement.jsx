import React, { useState, useEffect } from 'react';
import { getSpecialties, deleteSpecialty, registerSpecialty, updateSpecialty } from '../../services/apiSpecialtie';
import SpecialtyModal from '../../components/modal/specialtyModal';
import Layout from '../../components/layoutAdmin/Layout';
import { motion } from "framer-motion";

const SpecialtyManagement = () => {
    const [specialties, setSpecialties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);

    useEffect(() => {
        const fetchSpecialties = async () => {
            const result = await getSpecialties();
            console.log(result);
            setSpecialties(result);
        };

        fetchSpecialties();
    }, []);

    const handleDelete = async (id) => {
        await deleteSpecialty(id);
        const result = await getSpecialties();
        setSpecialties(result);
    };

    const handleEdit = (specialty) => {
        setSelectedSpecialty(specialty);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        console.log("Ấn button thêm chuyên khoa");
        setSelectedSpecialty(null);
        setIsModalOpen(true);
    };

    const handleSave = async (specialtyData) => {
        try {
            if (selectedSpecialty) {
                // Update existing 
                await updateSpecialty(selectedSpecialty.id, specialtyData);
            } else {
                console.log("Da gui form tao chuyen khoa thanh cong");
                await registerSpecialty(specialtyData);
            }
            const result = await getSpecialties();
            setSpecialties(result);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving doctor:", error);
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách chuyên khoa</h1>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        onClick={handleAdd}
                    >
                        Thêm chuyên khoa
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Tên chuyên khoa</th>
                                <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                                <th className="border border-gray-300 px-4 py-2">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specialties.length > 0 ? (
                                specialties.map((specialty, index) => (
                                    <motion.tr
                                        key={specialty.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{specialty.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {specialty?.description || 'Không xác định'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="bg-blue-600 text-white p-1 rounded hover:bg-blue-700"
                                                    onClick={() => handleEdit(specialty)}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                                    onClick={() => handleDelete(specialty.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-500 py-4">
                                        Không có dữ liệu.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <SpecialtyModal
                        isOpen={isModalOpen}
                        specialty={selectedSpecialty}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}  
                    />
                )}
            </div>
        </Layout>
    );
};

export default SpecialtyManagement;