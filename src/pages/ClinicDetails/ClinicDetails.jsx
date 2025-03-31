import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorClinics } from '../../services/apiDoctor';
import { Layout } from '../../components/layout/Layout';
import DoctorList from '../../components/doctorlist/DoctorList'; 
import { getClinicsByID } from '../../services/apiClinic';

const ClinicDetails = () => {
  const { id  } = useParams();
  const [clinicDetails, setClinicDetails] = useState(null);
  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinicDetails = async () => {
      try {
        console.log('Giá trị slug',id );
        const data = await getClinicsByID(id);
        
        const dataToSet = Array.isArray(data) ? data : [data];
        setClinicDetails(dataToSet);
      } catch (error) {
        console.error('Lỗi khi tải thông tin cơ sở:', error);
        setClinicDetails([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchDoctorList = async () => {
      try {
        const doctorsData = await getDoctorClinics(id); 
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Lỗi khi tải danh sách bác sĩ:', error);
        setDoctors([]);
      }
    };

    fetchClinicDetails();
    fetchDoctorList();
  }, [id]);

  if (loading) {
    return <div>Đang tải thông tin cơ sở y tế...</div>;
  }

  if (!clinicDetails || clinicDetails.length === 0) {
    return <div>Không tìm thấy thông tin cơ sở t té.</div>;
  }

  const clinic = clinicDetails[0];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{clinic?.name}</h1>
            <p className="text-gray-600">{clinic?.descriptionMarkdown}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Mô tả chi tiết</h2>
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: clinic?.descriptionHTML }}></p>
          </div>
        </div>
        
        {doctors.length > 0 && <DoctorList doctors={doctors} />}
      </div>
    </Layout>
  );
};

export default ClinicDetails;
