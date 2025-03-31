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
import SpecialtyPageAdmin from './pages/Admin/specialtyPage';
import ClinicPageAdmin from './pages/Admin/clinicPage';
import BookingPageAdmin from './pages/Admin/bookingPage';
import UserPageAdmin from './pages/Admin/userPage';
import AccountPage from './pages/Guest/account';
import BookingGuestPage from './pages/Guest/booking';
import ChangePasswordGuestPage from './pages/Guest/changePassword';
import AccountDoctorPage from './pages/RoleDoctor/account';
import BookingDoctorPage from './pages/RoleDoctor/bookingOfDoctor';
import ChangePasswordDoctorPage from './pages/RoleDoctor/changePassword';

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
        <Route path="/admin/bacsi" element={<DoctorPageAdmin />} />
        <Route path="/admin/chuyenkhoa" element={<SpecialtyPageAdmin />} />
        <Route path="/admin/coso" element={<ClinicPageAdmin />} />
        <Route path="/admin/lichkham" element={<BookingPageAdmin />} />
        <Route path="/admin/nguoidung" element={<UserPageAdmin />} />
        <Route path="/lichkham" element={<BookingGuestPage />} />
        <Route path="/lichkhambacsi" element={<BookingDoctorPage />} />
        <Route path="/doimatkhau" element={<ChangePasswordGuestPage />} />
        <Route path="/doimatkhaubacsi" element={<ChangePasswordDoctorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
