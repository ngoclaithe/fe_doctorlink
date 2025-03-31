import React, { useState } from 'react';

const TableUser = ({ users, handleEdit, handleDelete }) => {
    const [editableUser, setEditableUser] = useState(null);
    const [originalUser, setOriginalUser] = useState(null);

    const handleChange = (e, field) => {
        const updatedUser = { ...editableUser, [field]: e.target.value };
        setEditableUser(updatedUser);
    };

    const handleSave = () => {
        if (editableUser) {
            handleEdit(editableUser); 
            setOriginalUser(null); 
            setEditableUser(null); 
        }
    };

    return (
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 text-left border-b w-20">Id</th>
                    <th className="py-2 px-4 text-left border-b w-32">Email</th>
                    <th className="py-2 px-4 text-left border-b w-32">Password</th>
                    <th className="py-2 px-4 text-left border-b w-32">Họ</th>
                    <th className="py-2 px-4 text-left border-b w-32">Tên</th>
                    <th className="py-2 px-4 text-left border-b w-40">Địa chỉ</th>
                    <th className="py-2 px-4 text-left border-b w-32">Giới tính</th>
                    <th className="py-2 px-4 text-left border-b w-32">Role</th>
                    <th className="py-2 px-4 text-left border-b w-32">Số điện thoại</th>
                    <th className="py-2 px-4 text-left border-b w-48">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="py-2 px-4 border-b w-20">
                            {editableUser && editableUser.id === user.id ? (
                                user.id
                            ) : (
                                user.id
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableUser && editableUser.id === user.id ? (
                                <input
                                    value={editableUser.email}
                                    onChange={(e) => handleChange(e, 'email')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                user.email
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableUser && editableUser.id === user.id ? (
                                <input
                                    value={editableUser.password}
                                    onChange={(e) => handleChange(e, 'password')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                user.password
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableUser && editableUser.id === user.id ? (
                                <input
                                    value={editableUser.firstname}
                                    onChange={(e) => handleChange(e, 'firstname')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                user.firstname
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableUser && editableUser.id === user.id ? (
                                <input
                                    value={editableUser.lastname}
                                    onChange={(e) => handleChange(e, 'lastname')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                user.lastname
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-40">
                            {editableUser && editableUser.id === user.id ? (
                                <input
                                    value={editableUser.address}
                                    onChange={(e) => handleChange(e, 'address')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                user.address
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableUser && editableUser.id === user.id ? (
                                <input
                                    value={editableUser.gender}
                                    onChange={(e) => handleChange(e, 'gender')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                user.gender
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableUser && editableUser.id === user.id ? (
                                <input
                                    value={editableUser.roleId}
                                    onChange={(e) => handleChange(e, 'roleId')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                user.roleId
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableUser && editableUser.id === user.id ? (
                                <input
                                    value={editableUser.phoneNumber}
                                    onChange={(e) => handleChange(e, 'phoneNumber')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                user.phoneNumber
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-48">
                            {editableUser && editableUser.id === user.id ? (
                                <>
                                    <button onClick={handleSave} className="text-green-600 hover:underline mr-4">
                                        Lưu
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="text-blue-600 hover:underline mr-4"
                                    onClick={() => {
                                        setEditableUser(user);
                                        setOriginalUser(user); 
                                    }}
                                >
                                    Sửa
                                </button>
                            )}
                            <button className="text-red-600 hover:underline" onClick={() => handleDelete(user.id)}>
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableUser;
