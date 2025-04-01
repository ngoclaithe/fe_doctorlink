import React, { useState, useEffect } from 'react';
import { 
  HomeIcon,
  BeakerIcon,
  HandThumbUpIcon,
  ReceiptRefundIcon,
  UserGroupIcon,
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Sidebar = ({ id, isOpen, closeSidebar }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSubMenu = (id) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, path: '/admin/dashboard' },
    { id: 'specialty', label: 'Quản lý chuyên khoa', icon: BeakerIcon, path: '/admin/specialty' },
    { id: 'service', label: 'Quản lý dịch vụ', icon: DocumentTextIcon, path: '/admin/service' },
    { id: 'review', label: 'Quản lý đánh giá', icon: HandThumbUpIcon, path: '/admin/review' },
    { id: 'billing', label: 'Quản lý hóa đơn', icon: ReceiptRefundIcon, path: '/admin/billing' },
    { 
      id: 'users', 
      label: 'Quản lý người dùng', 
      icon: UserGroupIcon,
      hasSubMenu: true,
      subMenus: [
        { id: 'users', label: 'Người dùng', path: '/admin/users/users' },
        { id: 'doctors', label: 'Bác sĩ', path: '/admin/users/doctors' },
        { id: 'patients', label: 'Bệnh nhân', path: '/admin/users/patients' }
      ]
    },
    { id: 'medical-records', label: 'Quản lý hồ sơ bệnh án', icon: DocumentTextIcon, path: '/admin/medical-records' },
    { id: 'shifts', label: 'Quản lý ca làm', icon: ClockIcon, path: '/admin/shifts' },
  ];

  const sidebarClass = `bg-gray-800 text-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
    isMobile ? (isOpen ? 'fixed inset-y-0 left-0 z-50' : 'fixed -left-64 inset-y-0 z-50') : 'relative'
  }`;

  return (
    <aside id={id} className={sidebarClass}>
      {isMobile && isOpen && (
        <button 
          className="absolute top-4 right-4 text-white" 
          onClick={closeSidebar}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )}
      
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Quản trị hệ thống</h2>
      </div>
      
      <nav className="flex-1 pt-4 overflow-y-auto">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1">
              {item.hasSubMenu ? (
                <div>
                  <button
                    className={`w-full flex items-center justify-between py-3 px-6 hover:bg-gray-700 transition-colors ${
                      activeMenu === item.id ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => toggleSubMenu(item.id)}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </div>
                    {openSubMenus[item.id] ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </button>
                  {openSubMenus[item.id] && (
                    <ul className="bg-gray-900 pl-12">
                      {item.subMenus.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.path}
                            className="flex items-center py-2 px-4 hover:bg-gray-700 transition-colors"
                            onClick={() => {
                              setActiveMenu(`${item.id}-${subItem.id}`);
                              if (isMobile) closeSidebar();
                            }}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-6 hover:bg-gray-700 transition-colors ${
                    activeMenu === item.id ? 'bg-gray-700 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (isMobile) closeSidebar();
                  }}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700 mt-auto">
        <p className="text-sm text-gray-400">© 2025 Hệ thống liên kết bác sĩ và bệnh nhân</p>
      </div>
    </aside>
  );
};

export default Sidebar;