import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecialtiesByID, getDoctorSpecialties } from '../../services/apiSpecialtie';
import { Layout } from '../../components/layout/Layout';
import DoctorList from '../../components/doctorlist/DoctorList'; 

const SpecialtyDetails = () => {
  const { id } = useParams();
  const [specialtyDetails, setSpecialtyDetails] = useState(null);
  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialtyDetails = async () => {
      try {
        const data = await getSpecialtiesByID(id);
        const dataToSet = Array.isArray(data) ? data : [data];
        setSpecialtyDetails(dataToSet);
      } catch (error) {
        console.error('Lỗi khi tải thông tin chuyên khoa:', error);
        setSpecialtyDetails([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchDoctorList = async () => {
      try {
        const doctorsData = await getDoctorSpecialties(id); 
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Lỗi khi tải danh sách bác sĩ:', error);
        setDoctors([]);
      }
    };

    fetchSpecialtyDetails();
    fetchDoctorList();
  }, [id]);

  if (loading) {
    return <div>Đang tải thông tin chuyên khoa...</div>;
  }

  if (!specialtyDetails || specialtyDetails.length === 0) {
    return <div>Không tìm thấy thông tin chuyên khoa.</div>;
  }

  const specialty = specialtyDetails[0];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{specialty?.name}</h1>
            <p className="text-gray-600">{specialty?.descriptionMarkdown}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Mô tả chi tiết</h2>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: specialty?.descriptionHTML }}></p>
          </div>
        </div>
        {doctors.length > 0 && <DoctorList doctors={doctors} />}
      </div>
    </Layout>
  );
};

export default SpecialtyDetails;
