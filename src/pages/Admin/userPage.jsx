import React, { useState, useEffect } from 'react';
import { getAllUser, deleteUser, updateUser } from '../../services/apiAuth';
import TableUser from '../../components/common/tableUser';
import Layout from '../../components/layoutAdmin/Layout';
import { motion } from "framer-motion";

const UserPageAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const result = await getAllUser();
            setUsers(result);
            setError(null);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Không thể tải danh sách người dùng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            // Remove user from state instead of re-fetching
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error("Error deleting user:", err);
            setError("Không thể xóa người dùng");
        }
    };

    const handleEdit = async (user) => {
        try {
            await updateUser(user.id, user);
            // Update user in state instead of re-fetching
            setUsers(users.map(u => u.id === user.id ? user : u));
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Không thể cập nhật người dùng");
        }
    };

    return (
        <Layout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách người dùng</h1>
                    <button 
                        onClick={fetchUsers} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Làm mới
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {loading ? (
                        <div className="p-4 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : users.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <TableUser users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
                        </motion.div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            Không có người dùng nào
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UserPageAdmin;