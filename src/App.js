import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import SpecialtiesPage from './pages/Specialties';
import SpecialtyDetails from './pages/SpecialtyDetails/SpecialtyDetails';
import ClinicPage from './pages/Clinics';
import ClinicDetails from './pages/ClinicDetails/ClinicDetails';
import DoctorPage from './pages/Doctor';
import DoctorDetails from './pages/DoctorDetails/DoctorDetails';
import LoginPage from './pages/Auth/login';
import RegisterPage from './pages/Auth/register';
import AdminPage from './pages/Admin/adminPage';
import DoctorPageAdmin from './pages/Admin/doctorPage';
import SpecialtyManagement from './pages/Admin/SpecialtyManagement';
import ServiceManagement from './pages/Admin/ServiceManagement';
import ClinicPageAdmin from './pages/Admin/clinicPage';
import BookingPageAdmin from './pages/Admin/bookingPage';
import UserPageAdmin from './pages/Admin/userPage';
import AccountPage from './pages/Guest/account';
import BookingGuestPage from './pages/Guest/booking';
import ChangePasswordGuestPage from './pages/Guest/changePassword';
import AccountDoctorPage from './pages/RoleDoctor/account';
import BookingDoctorPage from './pages/RoleDoctor/bookingOfDoctor';
import ChangePasswordDoctorPage from './pages/RoleDoctor/changePassword';
import PatientManagement from './pages/Admin/PatientManagement';
import ShiftManagement from './pages/Admin/ShiftManagement';
import ReviewPage from './pages/Admin/ReviewPage';
import BillPage from './pages/Admin/BillPage';
import hosobenhanPage from './pages/Admin/hosobenhanPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chuyenkhoa" element={<SpecialtiesPage />} />
        <Route path="/chuyenkhoa/:id" element={<SpecialtyDetails />} />
        <Route path="/cosokhambenh" element={<ClinicPage />} />
        <Route path="/cosokhambenh/:id" element={<ClinicDetails />} />
        <Route path="/bacsi" element={<DoctorPage />} />
        <Route path="/bacsi/:id" element={<DoctorDetails />} />
        <Route path="/dangnhap" element={<LoginPage />} />
        <Route path="/dangky" element={<RegisterPage />} />
        <Route path="/taikhoan" element={<AccountPage />} />
        <Route path="/taikhoanbacsi" element={<AccountDoctorPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users/doctors" element={<DoctorPageAdmin />} />
        <Route path="/admin/users/patients" element={<PatientManagement />} />
        <Route path="/admin/specialty" element={<SpecialtyManagement />} />
        <Route path="/admin/service" element={<ServiceManagement />} />
        <Route path="/admin/shifts" element={<ShiftManagement />} />
        <Route path="/admin/coso" element={<ClinicPageAdmin />} />
        <Route path="/admin/lichkham" element={<BookingPageAdmin />} />
        <Route path="/admin/users/users" element={<UserPageAdmin />} />
        <Route path="/admin/review" element={<ReviewPage />} />
        <Route path="/admin/billing" element={<BillPage />} />
        <Route path="/admin/medical-records" element={<hosobenhanPage />} />
        <Route path="/lichkham" element={<BookingGuestPage />} />
        <Route path="/lichkhambacsi" element={<BookingDoctorPage />} />
        <Route path="/doimatkhau" element={<ChangePasswordGuestPage />} />
        <Route path="/doimatkhaubacsi" element={<ChangePasswordDoctorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
