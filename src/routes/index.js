import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import SpecialtiesPage from '../pages/Specialties';
import FacilitiesPage from '../pages/Facilities';
import DoctorsPage from '../pages/Doctors';
import LoginPage from '../pages/Auth/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chuyenkhoa',
    element: <SpecialtiesPage />,
  },
  {
    path: '/cosoyte',
    element: <FacilitiesPage />,
  },
  {
    path: '/bacsi',
    element: <DoctorsPage />,
  },
  {
    path: '/dangnhap',
    element: <LoginPage />,
  },
]);