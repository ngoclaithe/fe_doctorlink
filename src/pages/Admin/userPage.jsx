import React, { useState, useEffect } from 'react';
import { getAllUser, deleteUser, updateUser } from '../../services/apiAuth';

import Sidebar from '../../components/layout/Sidebar';
import TableUser from '../../components/common/tableUser'; 

const UserPageAdmin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getAllUser();
            console.log(result);
            setUsers(result);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteUser(id);
        const result = await getAllUser();
        setUsers(result);
    };

    const handleEdit = async (user) => {
        try {
            console.log("Đây là user.id nè:",user.id);
            await updateUser(user.id, user);  
            const result = await getAllUser();
            setUsers(result);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách người dùng</h1>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <TableUser users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default UserPageAdmin;
