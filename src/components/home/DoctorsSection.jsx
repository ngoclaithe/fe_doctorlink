import React, { useState, useEffect } from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { getDoctor } from '../../services/apiDoctor';
import { Card } from '../common/Card';
import { Next } from '../common/Next';

export const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await getDoctor();
      const formattedData = data.map((doctor) => {
        let imageUrl;
        try {
          if (doctor.image_url && !doctor.image_url.startsWith('http')) {
            imageUrl = require(`../../assets/images/bacsi/${doctor.image_url}`);
          } else {
            imageUrl = doctor.image_url;
          }
        } catch (error) {
          imageUrl = require('../../assets/images/bacsi/default.jpg');
        }
        
        return {
          name: doctor.full_name,
          image: imageUrl,
          id: doctor.user_id
        };
      });
      setDoctors(formattedData);
    } catch (error) {
      console.error('Lỗi khi tải danh sách bác sĩ:', error);
      setError('Không thể tải dữ liệu bác sĩ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    
    const refreshInterval = setInterval(() => {
      fetchDoctors();
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [doctors]);

  const handleNext = () => {
    const maxPage = Math.ceil(doctors.length / itemsPerPage) - 1;
    setCurrentPage(prev => Math.min(prev + 1, maxPage));
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const getCurrentDoctors = () => {
    const start = currentPage * itemsPerPage;
    return doctors.slice(start, start + itemsPerPage);
  };

  if (loading) {
    return (
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* <div className="text-center">Đang tải dữ liệu...</div> */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        <SectionTitle>Bác sĩ</SectionTitle>
        <div className="relative flex items-center justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`absolute left-0 z-10 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Next direction="prev" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto w-full">
            {getCurrentDoctors().map((doctor, index) => (
              <Card 
                key={`${doctor.id || doctor.name}-${index}`}
                image={doctor.image}
                title={doctor.name}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage >= Math.ceil(doctors.length / itemsPerPage) - 1}
            className={`absolute right-0 z-10 ${
              currentPage >= Math.ceil(doctors.length / itemsPerPage) - 1 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            }`}
          >
            <Next direction="next" />
          </button>
        </div>
      </div>
    </section>
  );
};