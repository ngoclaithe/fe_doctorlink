import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../common/SectionTitle';
import { getSpecialties } from '../../services/apiSpecialtie';

export const SpecialtiesSection = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties();
        setSpecialties(data); 
      } catch (error) {
        console.error('Lỗi khi tải danh sách chuyên khoa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const handleItemClick = (specialty) => {
    setSelectedSpecialty(specialty);
    navigate(`/specialty/${specialty.id}`);
    console.log("Đã click vào chuyên khoa:", specialty.name);
  };

  if (loading) {
    return <div>Đang tải danh sách chuyên khoa...</div>;
  }

  return (
    <section className="py-12 container mx-auto px-4">
      <SectionTitle>Khám chuyên khoa</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {specialties.map((specialty) => (
          <div
            key={specialty.id}
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleItemClick(specialty)} 
          >
            <img
              src={require(`../../assets/images/chuyenkhoa/${specialty.image_url}`)}
              alt={specialty.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{specialty.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{specialty.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};