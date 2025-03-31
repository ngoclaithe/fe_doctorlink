import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Next } from '../common/Next';
import { SectionTitle } from '../common/SectionTitle';
import { getClinics } from '../../services/apiClinic';
export const ClinicsSection = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const data = await getClinics();
      const formattedData = data.map((clinic) => ({
        name: clinic.name,
        image: require(`../../assets/images/cosoyte/${clinic.image}`),
      }));
      setClinics(formattedData);
    } catch (error) {
      console.error('Lỗi khi tải danh sách:', error);
      setError('Không thể tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClinics();
    
    const refreshInterval = setInterval(() => {
      fetchClinics();
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [clinics]);

  const handleNext = () => {
    const maxPage = Math.ceil(clinics.length / itemsPerPage) - 1;
    setCurrentPage(prev => Math.min(prev + 1, maxPage));
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const getCurrentClinics = () => {
    const start = currentPage * itemsPerPage;
    return clinics.slice(start, start + itemsPerPage);
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
        <SectionTitle>Cơ sở y tế</SectionTitle>
        <div className="relative flex items-center justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`absolute left-0 z-10 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Next direction="prev" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto w-full">
            {getCurrentClinics().map((clinic, index) => (
              <Card 
                key={`${clinic.name}-${index}`}
                image={clinic.image}
                title={clinic.name}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage >= Math.ceil(clinics.length / itemsPerPage) - 1}
            className={`absolute right-0 z-10 ${
              currentPage >= Math.ceil(clinics.length / itemsPerPage) - 1 
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
