import React, { useState, useEffect } from 'react';
import { getAllUser, deleteUser, updateUser } from '../../services/apiShift';

import Layout from '../../components/layoutAdmin/Layout';

const ShiftManagement = () => {
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
        </Layout>
    );
};

export default ShiftManagement;