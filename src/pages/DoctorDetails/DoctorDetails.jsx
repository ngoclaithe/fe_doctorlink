import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorById } from '../../services/apiDoctor';
import { Layout } from '../../components/layout/Layout';
import UserSelectBooking from './userSelectBooking';
import { checkBookingByDoctorAndDate } from '../../services/apiBooking';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    if (!date) return null;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const data = await getDoctorById(id);
        const dataToSet = Array.isArray(data) ? data : [data];
        setDoctorDetails(dataToSet);
      } catch (error) {
        console.error('Lỗi khi tải thông tin bác sĩ:', error);
        setDoctorDetails([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  useEffect(() => {
    if (doctorDetails && doctorDetails[0]?.id && selectedDate) {
      fetchBooking(doctorDetails[0].id, selectedDate);
    }
  }, [doctorDetails, selectedDate]);

  const fetchBooking = async (doctorid, date) => {
    try {
      const formattedDate = formatDate(date);  
      console.log("Gia tri date khi goi ham fetchBooking", formattedDate);
      const data = await checkBookingByDoctorAndDate(doctorid, { 
        doctorid, 
        date: formattedDate 
      });

      setBookings(data);
    } catch (error) {
      console.error('Lỗi khi lấy lịch hẹn:', error);
      setBookings([]);
    }
  };

  if (loading) {
    return <div>Đang tải thông tin bác sĩ...</div>;
  }

  if (!doctorDetails || doctorDetails.length === 0) {
    return <div>Không tìm thấy thông tin bác sĩ.</div>;
  }

  const doctor = doctorDetails[0];
  const doctorImage = require(`../../assets/images/bacsi/${doctor.image}`);

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{doctor?.name}</h1>
            <img
              src={doctorImage} 
              className="w-32 h-32 object-cover rounded-full"
              alt={doctor?.name}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: doctor?.note }}></p>
          </div>
        </div>

        <UserSelectBooking 
          doctorId={doctor.id}
          bookings={bookings}
          selectedDate={selectedDate}  
          setSelectedDate={setSelectedDate}  
        />
      </div>
    </Layout>
  );
};

export default DoctorDetails;
