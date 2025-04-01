import React, { useState } from 'react';

const TableUser = ({ users, handleEdit, handleDelete }) => {
    const [editableUser, setEditableUser] = useState(null);
    const [originalUser, setOriginalUser] = useState(null);

    const handleChange = (e, field) => {
        setEditableUser({ ...editableUser, [field]: e.target.value });
    };

    const handleSave = () => {
        if (editableUser) {
            handleEdit(editableUser);
            setEditableUser(null);
            setOriginalUser(null);
        }
    };

    const handleCancel = () => {
        setEditableUser(null);
        setOriginalUser(null);
    };

    const roleLabels = {
        'admin': 'Quản trị viên',
        'doctor': 'Bác sĩ',
        'user': 'Người dùng'
    };

    const getRoleLabel = (role) => {
        return roleLabels[role] || role;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700">{user.id}</td>
                                <td className="py-3 px-4 text-sm">
                                    {editableUser && editableUser.id === user.id ? (
                                        <input
                                            value={editableUser.username || ''}
                                            onChange={(e) => handleChange(e, 'username')}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <span className="text-gray-700">{user.username}</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    {editableUser && editableUser.id === user.id ? (
                                        <input
                                            value={editableUser.email || ''}
                                            onChange={(e) => handleChange(e, 'email')}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <span className="text-gray-700">{user.email}</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    {editableUser && editableUser.id === user.id ? (
                                        <select
                                            value={editableUser.role || ''}
                                            onChange={(e) => handleChange(e, 'role')}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="admin">Quản trị viên</option>
                                            <option value="doctor">Bác sĩ</option>
                                            <option value="user">Người dùng</option>
                                        </select>
                                    ) : (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                                            user.role === 'doctor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {getRoleLabel(user.role)}
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-sm whitespace-nowrap">
                                    {editableUser && editableUser.id === user.id ? (
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={handleSave} 
                                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded transition-colors duration-200"
                                            >
                                                Lưu
                                            </button>
                                            <button 
                                                onClick={handleCancel} 
                                                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded transition-colors duration-200"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditableUser({...user});
                                                    setOriginalUser({...user});
                                                }}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors duration-200"
                                            >
                                                Sửa
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(user.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-colors duration-200"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                                Không có dữ liệu người dùng
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableUser;