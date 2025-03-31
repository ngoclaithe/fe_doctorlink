import React, { useState, useEffect } from 'react';
import { getBookings, deleteBooking, updateBooking } from '../../services/apiBooking';
import Sidebar from '../../components/layout/Sidebar';
import TableBookingAdmin from '../../components/common/tableBookingAdmin'; 

const BookingPageAdmin = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const result = await getBookings();
            console.log(result);
            setBookings(result);
        };

        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        await deleteBooking(id);
        const result = await getBookings();
        setBookings(result);
    };

    const handleEdit = async (booking) => {
        try {
            console.log("Đây là booking.id nè:",booking.id);
            await updateBooking(booking.id, booking);  
            const result = await getBookings();
            setBookings(result);
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách lịch khám</h1>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <TableBookingAdmin bookings={bookings} handleEdit={handleEdit} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default BookingPageAdmin;
