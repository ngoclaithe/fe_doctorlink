import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkBookingByDoctor } from '../../services/apiBooking'; 
import { deleteBooking, updateBooking } from '../../services/apiBooking';
import TableBookingManage from '../../components/common/tableBookingManage'; 
import { Layout } from '../../components/layout/Layout';

export const BookingDoctorPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const handleLogout = () => {
    console.log("Đã đăng xuất");
    sessionStorage.removeItem('user');
    navigate('/dangnhap');
  };
  const handleDelete = async (id) => {
    await deleteBooking(id);
    const result = await checkBookingByDoctor(user.doctorid, { doctorid: user.doctorid });
    setBookings(result);
};

const handleEdit = async (booking) => {
    try {
        console.log("Đây là booking.id nè:",booking.id);
        await updateBooking(booking.id, booking);  
        const result = await checkBookingByDoctor(user.doctorid, { doctorid: user.doctorid });
        setBookings(result);
    } catch (error) {
        console.error("Error updating booking:", error);
    }
};
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user')); 
        
        if (userData && userData.id) {

          setUser(userData); 
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
    if (user && user.doctorid) {
      const fetchBookings = async () => {
        try {
          console.log("Đây là doctorid của session khi fetchBooking", user.doctorid);
          const data = await checkBookingByDoctor(user.doctorid, { doctorid: user.doctorid });
          setBookings(data);
        } catch (error) {
          console.error('Lỗi khi lấy lịch khám:', error);
        }
      };

      fetchBookings();
    }
  }, [user]);

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
            <TableBookingManage bookings={bookings} handleEdit={handleEdit} handleDelete={handleDelete} />
          ) : (
            <p>Không có lịch hẹn nào.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingDoctorPage;
