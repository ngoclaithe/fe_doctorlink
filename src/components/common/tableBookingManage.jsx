import React, { useState } from 'react';

const TableBookingManage = ({ bookings, handleEdit, handleDelete }) => {
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
          <th className="py-2 px-4 text-left border-b">Ngày</th>
          <th className="py-2 px-4 text-left border-b">Thời Gian</th>
          <th className="py-2 px-4 text-left border-b">Email người đăng ký</th>
          <th className="py-2 px-4 text-left border-b">Tên Phòng Khám</th>
          <th className="py-2 px-4 text-left border-b">Trạng thái</th>
          <th className="py-2 px-4 text-left border-b w-48">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">
              {editableBooking && editableBooking.id === booking.id ? (
                <input
                  type="date"
                  value={editableBooking.date}
                  onChange={(e) => handleChange(e, 'date')}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              ) : (
                booking.date
              )}
            </td>
            <td className="py-2 px-4 border-b">
              {editableBooking && editableBooking.id === booking.id ? (
                <input
                  type="text"
                  value={editableBooking.timeSlot}
                  onChange={(e) => handleChange(e, 'timeSlot')}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              ) : (
                booking.timeSlot
              )}
            </td>
            <td className="py-2 px-4 border-b">
              {editableBooking && editableBooking.id === booking.id ? (
                <input
                  type="email"
                  value={editableBooking.user?.email}
                  onChange={(e) => handleChange(e, 'user.email')}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              ) : (
                booking.user?.email
              )}
            </td>
            <td className="py-2 px-4 border-b">
              {editableBooking && editableBooking.id === booking.id ? (
                <input
                  type="text"
                  value={editableBooking.doctor?.clinic?.name}
                  onChange={(e) => handleChange(e, 'doctor.clinic.name')}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              ) : (
                booking.doctor?.clinic?.name
              )}
            </td>
            <td className="py-2 px-4 border-b">
              {editableBooking && editableBooking.id === booking.id ? (
                <select
                  value={editableBooking.statusid}
                  onChange={(e) => handleChange(e, 'statusid')}
                  className="border border-gray-300 p-2 rounded-md w-full"
                >
                  <option value="true">Thành công</option>
                  <option value="waiting">Chờ phê duyệt</option>
                  <option value="false">Thất bại</option>
                </select>
              ) : (
                booking.statusid === 'true' ? 'Thành công' :
                booking.statusid === 'waiting' ? 'Chờ phê duyệt' :
                'Thất bại'
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

export default TableBookingManage;
