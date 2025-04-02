import React from 'react';
import Layout from '../../components/layoutAdmin/Layout';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';
import SpecialtyManagement from './SpecialtyManagement';
import ServiceManagement from './ServiceManagement';
// import BillingManagement from './BillingManagement';
// import DoctorManagement from './DoctorManagement';
import PatientManagement from './PatientManagement';
import ReviewPage from './ReviewPage';
// import MedicalRecordManagement from './MedicalRecordManagement';
// import ShiftManagement from './ShiftManagement';

const AdminPage = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/specialty" element={<SpecialtyManagement />} />
                <Route path="/admin/reviews" element={<ReviewPage />} />
                <Route path="/service" element={<ServiceManagement />} />
                <Route path="/users/patients" element={<PatientManagement />} />



                {/* <Route path="/service" element={<ServiceManagement />} />
                <Route path="/review" element={<ReviewManagement />} />
                <Route path="/billing" element={<BillingManagement />} />
                <Route path="/users/doctors" element={<DoctorManagement />} />
                <Route path="/medical-records" element={<MedicalRecordManagement />} />
                <Route path="/shifts" element={<ShiftManagement />} /> */}
            </Routes>
        </Layout>
    );
};

export default AdminPage;