import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../common/SectionTitle';
import { getDoctor } from '../../services/apiDoctor';

export const DoctorSection = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctor();

        const formattedData = data.map((doctor) => {
          let imageUrl;
          try {
            imageUrl = require(`../../assets/images/bacsi/${doctor.image_url}`);
          } catch (error) {
            try {
              imageUrl = require('../../assets/images/bacsi/default.jpg');
            } catch {
              imageUrl = '';
            }
          }

          return {
            id: doctor.user_id || doctor.id,
            name: doctor.full_name,
            image_url: imageUrl,
            speciality: doctor.speciality || '',
            route: `/doctor/${doctor.user_id || doctor.id}`
          };
        });
        
        setDoctors(formattedData);
      } catch (error) {
        console.error('Lỗi khi tải danh sách bác sĩ:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleItemClick = (doctor) => {
    setSelectedDoctor(doctor);
    navigate(doctor.route);
    console.log("Đã click vào bác sĩ:", doctor.id);
  };

  if (loading) {
    return <div className="py-12 container mx-auto px-4 text-center">Đang tải danh sách bác sĩ...</div>;
  }

  return (
    <section className="py-12 container mx-auto px-4">
      <SectionTitle>Danh sách bác sĩ</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleItemClick(doctor)}
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={doctor.image_url}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                {doctor.speciality && (
                  <p className="text-gray-600 mt-1">{doctor.speciality}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Không tìm thấy bác sĩ nào.
          </div>
        )}
      </div>
    </section>
  );
};