import React, { useState, useEffect } from 'react';
import Layout from '../../components/layoutAdmin/Layout';
import { getBills } from '../../services/apiBill';
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 16;

const BillPage = () => {
    const [bills, setBills] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

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

    return (
        <Layout>
            <div className="p-6">
                {/* Updated Filter Section */}
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
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-gray-500 py-4">
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
        </Layout>
    );
};

export default BillPage;