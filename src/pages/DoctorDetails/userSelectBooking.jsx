import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerBooking } from '../../services/apiBooking';

const UserSelectBooking = ({ doctorId, bookings, selectedDate, setSelectedDate }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const timeSlotMap = {
    1: '08:00-08:30', 2: '08:30-09:00', 3: '09:00-09:30', 4: '09:30-10:00', 
    5: '10:00-10:30', 6: '10:30-11:00', 7: '11:00-11:30', 8: '11:30-12:00',
    9: '13:00-13:30', 10: '13:30-14:00', 11: '14:00-14:30', 12: '14:30-15:00', 
    13: '15:00-15:30', 14: '15:30-16:00', 15: '16:00-16:30'
  };
  const baseTimeSlots = Object.values(timeSlotMap);

  const formatDate = (date) => {
    if (!date) return null;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (selectedDate && bookings) {
      console.log('Selected Date:', formatDate(selectedDate));
      console.log('Bookings:', bookings);

      const bookedTimeTypes = bookings
        .filter(booking => {
          // const bookingDate = new Date(booking.date);
          return booking.date === formatDate(selectedDate);
        })
        .map(booking => {
          console.log('booking.timeType:', booking.timeType);
          return booking.timeType;
        });
        
      const available = baseTimeSlots.filter((_, index) => {
        return !bookedTimeTypes.includes(index + 1);
      });

      setAvailableTimeSlots(available);
    } else {
      setAvailableTimeSlots(baseTimeSlots);
    }
  }, [selectedDate, bookings]);

  const handleDateChange = (date) => {
    setSelectedDate(date); 
    setSelectedSlot(null);  
  };

  const handleSlotClick = async (slot) => {
    setSelectedSlot(slot);
    const timeTypeKey = Object.keys(timeSlotMap).find(key => timeSlotMap[key] === slot);
    const timeType = parseInt(timeTypeKey, 10);
    const formattedDate = formatDate(selectedDate);
    const user = JSON.parse(sessionStorage.getItem('user')); 
    try {
      const response = await registerBooking({
        doctorid: doctorId,
        patientId: user.id,
        date: formattedDate,
        timeType: timeType,
      });
      console.log('Booking registered:', response);
    } catch (error) {
      console.error('Error registering booking:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
      <div className="space-y-6">

        <div className="border-b pb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Chọn ngày khám
          </h2>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Chọn ngày khám"
            minDate={new Date()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Time Slots Section */}
        {selectedDate && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Chọn giờ khám
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {baseTimeSlots.map((slot, index) => {
                const isAvailable = availableTimeSlots.includes(slot);
                return (
                  <div
                    key={index}
                    onClick={() => isAvailable && handleSlotClick(slot)}
                    className={`
                      p-4 rounded-lg text-center transition-all duration-200
                      ${isAvailable 
                        ? selectedSlot === slot
                          ? 'bg-blue-500 text-white shadow-md transform scale-105'
                          : 'bg-white border-2 border-blue-200 hover:border-blue-500 hover:shadow-md cursor-pointer'
                        : 'bg-gray-100 border-2 border-gray-200 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className={`text-sm font-medium ${
                      !isAvailable ? 'line-through text-gray-400' : 
                      selectedSlot === slot ? 'text-white' : 'text-gray-700'
                    }`}>
                      {slot}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedSlot && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Bạn đã chọn: {selectedSlot}. Hãy chờ admin và bác sĩ duyệt lịch khám
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSelectBooking;
