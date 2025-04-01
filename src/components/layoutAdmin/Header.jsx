import React, { useState } from 'react';
import { BellIcon, UserIcon, Bars3Icon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Header = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationsCount] = useState(3);

  return (
    <header id="header" className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          className="text-gray-500 mr-4 md:hidden" 
          onClick={toggleSidebar}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">DoctorLink</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="text-gray-500 hover:text-gray-700">
            <BellIcon className="h-6 w-6" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationsCount}
              </span>
            )}
          </button>
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="bg-gray-200 p-2 rounded-full">
              <UserIcon className="h-5 w-5 text-gray-600" />
            </div>
            <span className="hidden md:block">Admin</span>
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <a href="/admin/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <UserIcon className="h-4 w-4 mr-2" />
                Hồ sơ cá nhân
              </a>
              <a href="/admin/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cài đặt
              </a>
              <hr className="my-1" />
              <a href="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                Đăng xuất
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;