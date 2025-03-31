import React from 'react';

const TableBooking = ({ bookings }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 text-left border-b">Ngày</th>
          <th className="py-2 px-4 text-left border-b">Thời Gian</th>
          <th className="py-2 px-4 text-left border-b">Tên Bác Sĩ</th>
          <th className="py-2 px-4 text-left border-b">Tên Phòng Khám</th>
          <th className="py-2 px-4 text-left border-b">Kết quả đăng ký</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">{booking.date}</td>
            <td className="py-2 px-4 border-b">{booking.timeSlot}</td>
            <td className="py-2 px-4 border-b">{booking.doctor?.name}</td>
            <td className="py-2 px-4 border-b">{booking.doctor?.clinic?.name}</td>
            <td className="py-2 px-4 border-b">{booking.statusresult}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBooking;
