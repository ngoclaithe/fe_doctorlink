import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionTitle } from '../common/SectionTitle';
import { getClinics } from '../../services/apiClinic';

export const ClinicSection = () => {
  const navigate = useNavigate();
  const [selectedClinic, setSelectedclinic] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const data = await getClinics();

        const formattedData = data.map((clinic) => ({
          id: clinic.id, 
          name: clinic.name,
          addres: clinic.address,
          image: require(`../../assets/images/cosoyte/${clinic.image}`), 
          route: `${clinic.id}`, 
        }));
        setClinics(formattedData);
      } catch (error) {
        console.error('Lỗi khi tải danh sách sơ sở:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinic();
  }, []);

  const handleItemClick = (clinic) => {
    setSelectedclinic(clinic);
    navigate(clinic.route);
    console.log("Đã click vào cơ sở:", clinic.id);
  };

  if (loading) {
    return <div>Đang tải danh sách cở sở...</div>;
  }

  return (
    <section className="py-12 container mx-auto px-4">
      <SectionTitle>Danh sách cơ sở khám chữa bệnh</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
            onClick={() => handleItemClick(clinic)} 
          >
            <img
              src={clinic.image}
              alt={clinic.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{clinic.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
