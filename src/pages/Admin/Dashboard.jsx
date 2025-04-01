import React from 'react';
import { 
  UserGroupIcon, 
  ClipboardDocumentCheckIcon, 
  BanknotesIcon, 
  CalendarIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  // Dữ liệu mẫu
  const stats = [
    { id: 1, name: 'Tổng bệnh nhân', value: '1,245', icon: UserGroupIcon, color: 'bg-blue-500' },
    { id: 2, name: 'Tổng lịch hẹn', value: '4,320', icon: ClipboardDocumentCheckIcon, color: 'bg-green-500' },
    { id: 3, name: 'Doanh thu tháng', value: '235,600,000đ', icon: BanknotesIcon, color: 'bg-yellow-500' },
    { id: 4, name: 'Ca làm hôm nay', value: '12', icon: CalendarIcon, color: 'bg-purple-500' },
  ];

  const recentAppointments = [
    { id: 1, patient: 'Nguyễn Văn A', doctor: 'BS. Trần Thị B', time: '09:00', date: '01/04/2025', status: 'Đã xác nhận' },
    { id: 2, patient: 'Lê Văn C', doctor: 'BS. Phạm Văn D', time: '10:30', date: '01/04/2025', status: 'Đang chờ' },
    { id: 3, patient: 'Trần Thị E', doctor: 'BS. Nguyễn Văn F', time: '13:45', date: '01/04/2025', status: 'Hoàn thành' },
    { id: 4, patient: 'Phạm Văn G', doctor: 'BS. Lê Thị H', time: '15:15', date: '01/04/2025', status: 'Đã hủy' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Bảng điều khiển</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-full p-3 mr-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Lịch hẹn gần đây</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bệnh nhân
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bác sĩ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{appointment.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{appointment.time}, {appointment.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'Đã xác nhận' 
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'Đang chờ'
                        ? 'bg-yellow-100 text-yellow-800'
                        : appointment.status === 'Hoàn thành'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Thao tác nhanh</h3>
          <div className="space-y-2">
            <a href="/admin/appointment/new" className="block text-blue-600 hover:text-blue-800">+ Tạo lịch hẹn mới</a>
            <a href="/admin/patient/new" className="block text-blue-600 hover:text-blue-800">+ Thêm bệnh nhân mới</a>
            <a href="/admin/invoice/new" className="block text-blue-600 hover:text-blue-800">+ Tạo hóa đơn mới</a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Thông báo hệ thống</h3>
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-yellow-700">Bảo trì hệ thống vào ngày 05/04/2025 lúc 22:00 - 24:00</p>
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-sm text-blue-700">Cập nhật phiên bản mới 2.3.4 vào ngày 03/04/2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;