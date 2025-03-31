import React from 'react';

const DoctorList = ({ doctors }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Danh sách bác sĩ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => {

          const doctorImage = require(`../../assets/images/bacsi/${doctor.image}`);

          return (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
              {}
              <div className="flex justify-center mb-4">
                <img
                  src={doctorImage} 
                  alt={doctor.name}
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>

              {}
              <h3 className="text-xl font-bold">{doctor.name}</h3>
              <p className="text-gray-600">Phòng khám: {doctor.clinic.name}</p>
              <p className="text-gray-600">Giá khám: {doctor.priceid} VND</p>
              {/* <p className="text-gray-600">Ca trống: {doctor.caTrong ? 'Có' : 'Không'}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorList;
