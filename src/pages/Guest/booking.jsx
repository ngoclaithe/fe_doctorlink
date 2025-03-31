import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookingsByID } from '../../services/apiBooking'; 
import TableBooking from '../../components/common/tableBooking'; 
import { checkLogin } from '../../services/apiAuth'; 
import { Layout } from '../../components/layout/Layout';

export const BookingGuestPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const handleLogout = () => {
    console.log("Đã đăng xuất");
    navigate('/dangnhap');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await checkLogin();
        
        if (response && response.user.id) {
          console.log("Đây là id của session", response.user.id);
          setUserId(response.user.id); 
        } else {
          navigate('/dangnhap');
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra đăng nhập:', error);
        navigate('/dangnhap'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      const fetchBookings = async () => {
        try {
          const data = await getBookingsByID(userId); 
          setBookings(data);
        } catch (error) {
          console.error('Lỗi khi lấy lịch khám:', error);
        }
      };

      fetchBookings();
    }
  }, [userId]);

  if (loading) {
    return <p>Đang tải...</p>; 
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-auto lg:h-screen bg-gray-50 p-6">
        {/* Sidebar */}
        <aside className="lg:w-1/4 w-full bg-gray-100 p-6 border-r border-gray-200 rounded-lg mb-6 lg:mb-0 mt-[5%]">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => navigate('/lichkham')}
                className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
              >
                Lịch khám
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/doimatkhau')}
                className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
              >
                Đổi mật khẩu
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition duration-300"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </aside>

        <div className="lg:w-3/4 w-full p-6 bg-white rounded-lg shadow-md mt-[5%]">
          <h2 className="text-2xl font-bold mb-4">Lịch Khám Của Bạn</h2>
          {bookings.length > 0 ? (
            <TableBooking bookings={bookings} />
          ) : (
            <p>Không có lịch hẹn nào.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingGuestPage;
