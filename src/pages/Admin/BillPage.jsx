import React, { useState, useEffect } from 'react';
import Layout from '../../components/layoutAdmin/Layout';
import { getBills, createBill, updateBill } from '../../services/apiBill';
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 13;

const BillPage = () => {
    const [bills, setBills] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isBillModalOpen, setIsBillModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [billFormData, setBillFormData] = useState({ appointment_id: '', amount: '', status: '', id: null });

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const data = await getBills();
                setBills(data);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };
        fetchBills();
    }, []);

    // Filter bills based on selectedStatus
    const filteredBills = bills.filter(bill =>
        selectedStatus === 'all' ? true : bill.status === selectedStatus
    );

    const totalPages = Math.ceil(filteredBills.length / ITEMS_PER_PAGE);
    const currentBills = filteredBills.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setCurrentPage(1); // Reset to first page
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    // Open modal for creating a new bill
    const openCreateModal = () => {
        setBillFormData({ appointment_id: '', amount: '', status: '', id: null });
        setIsEditMode(false);
        setIsBillModalOpen(true);
    };

    // Open modal for editing bill (only status editable)
    const openEditModal = (bill) => {
        setBillFormData({ appointment_id: bill.appointment_id, amount: bill.amount, status: bill.status, id: bill.id });
        setIsEditMode(true);
        setIsBillModalOpen(true);
    };

    const handleModalChange = (e) => {
        setBillFormData({ ...billFormData, [e.target.name]: e.target.value });
    };

    const handleSaveBill = async () => {
        try {
            if (isEditMode) {
                // Only update status field for editing
                await updateBill(billFormData.id, { status: billFormData.status });
            } else {
                await createBill(billFormData);
            }
            const data = await getBills();
            setBills(data);
            setIsBillModalOpen(false);
        } catch (error) {
            console.error("Error saving bill:", error);
        }
    };

    return (
        <Layout>
            <div className="p-6">
                {/* Updated Filter & Create Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Danh sách hóa đơn</h1>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="statusFilter" className="text-gray-700 font-medium">
                            Trạng thái:
                        </label>
                        <select
                            id="statusFilter"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tất cả</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                            onClick={openCreateModal}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
                        >
                            Thêm hóa đơn
                        </button>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Appointment ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Amount</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Paid Date</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Created At</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBills.length > 0 ? (
                                currentBills.map((bill, index) => (
                                    <motion.tr
                                        key={bill.id}
                                        className="hover:bg-gray-100"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                    >
                                        <td className="border border-gray-300 px-4 py-2 text-center">{bill.id}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{bill.appointment_id}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{bill.amount}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{bill.status}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{bill.paid_date || '-'}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{bill.created_at}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                onClick={() => openEditModal(bill)}
                                                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-200"
                                            >
                                                Sửa
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-gray-500 py-4">
                                        Không có dữ liệu.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Section */}
                <div className="flex items-center justify-center mt-4 space-x-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Trang {currentPage} / {totalPages || 1}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
            {/* Modal for Create/Edit Bill */}
            {isBillModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditMode ? "Sửa hóa đơn" : "Thêm hóa đơn"}
                        </h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Appointment ID</label>
                            <input
                                type="text"
                                name="appointment_id"
                                value={billFormData.appointment_id}
                                onChange={handleModalChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isEditMode}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Amount</label>
                            <input
                                type="text"
                                name="amount"
                                value={billFormData.amount}
                                onChange={handleModalChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isEditMode}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={billFormData.status}
                                onChange={handleModalChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsBillModalOpen(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleSaveBill}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default BillPage;