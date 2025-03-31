import React, { useState } from 'react';

const TableBookingAdmin = ({ bookings, handleEdit, handleDelete }) => {
    const [editableBooking, setEditableBooking] = useState(null);
    const [originalBooking, setOriginalBooking] = useState(null);

    const handleChange = (e, field) => {
        const updatedBooking = { ...editableBooking, [field]: e.target.value };
        setEditableBooking(updatedBooking);
    };

    const handleSave = () => {
        if (editableBooking) {
            handleEdit(editableBooking); 
            setOriginalBooking(null); 
            setEditableBooking(null); 
        }
    };

    return (
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 text-left border-b w-20">Id</th>
                    <th className="py-2 px-4 text-left border-b w-32">Status</th>
                    <th className="py-2 px-4 text-left border-b w-32">Bác sĩ khám</th>
                    <th className="py-2 px-4 text-left border-b w-32">Người dùng đặt lịch</th>
                    <th className="py-2 px-4 text-left border-b w-32">Ngày</th>
                    <th className="py-2 px-4 text-left border-b w-40">Giờ</th>
                    <th className="py-2 px-4 text-left border-b w-48">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.id}>
                        <td className="py-2 px-4 border-b w-20">
                            {editableBooking && editableBooking.id === booking.id ? (
                                booking.id
                            ) : (
                                booking.id
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableBooking && editableBooking.id === booking.id ? (
                                <select
                                    value={editableBooking.statusid}
                                    onChange={(e) => handleChange(e, 'statusid')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                >
                                    <option value="true">Thành công</option>
                                    <option value="waiting">Chờ xét duyệt</option>
                                    <option value="false">Thất bại</option>
                                </select>
                            ) : (
                                booking.statusid
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableBooking && editableBooking.id === booking.id ? (
                                <input
                                    value={editableBooking.doctor.name}
                                    onChange={(e) => handleChange(e, 'doctor.name')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                booking.doctor.name
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableBooking && editableBooking.id === booking.id ? (
                                <input
                                    value={editableBooking.user.email}
                                    onChange={(e) => handleChange(e, 'user.email')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                booking.user.email
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-32">
                            {editableBooking && editableBooking.id === booking.id ? (
                                <input
                                    value={editableBooking.date}
                                    onChange={(e) => handleChange(e, 'date')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                booking.date
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-40">
                            {editableBooking && editableBooking.id === booking.id ? (
                                <input
                                    value={editableBooking.timeType}
                                    onChange={(e) => handleChange(e, 'timeType')}
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                />
                            ) : (
                                booking.timeType
                            )}
                        </td>
                        <td className="py-2 px-4 border-b w-48">
                            {editableBooking && editableBooking.id === booking.id ? (
                                <>
                                    <button onClick={handleSave} className="text-green-600 hover:underline mr-4">
                                        Lưu
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="text-blue-600 hover:underline mr-4"
                                    onClick={() => {
                                        setEditableBooking(booking);
                                        setOriginalBooking(booking); 
                                    }}
                                >
                                    Sửa
                                </button>
                            )}
                            <button className="text-red-600 hover:underline" onClick={() => handleDelete(booking.id)}>
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableBookingAdmin;
