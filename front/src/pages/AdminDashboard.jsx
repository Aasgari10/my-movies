import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminStats from '@/components/admin/AdminStats';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminMovies from '@/components/admin/AdminMovies';
import AdminComments from '@/components/admin/AdminComments';
import { FaChartBar, FaUsers, FaFilm, FaComment } from 'react-icons/fa';

const TABS = [
  { id: 'stats', label: 'داشبورد', icon: FaChartBar },
  { id: 'users', label: 'کاربران', icon: FaUsers },
  { id: 'movies', label: 'فیلم‌ها', icon: FaFilm },
  { id: 'comments', label: 'نظرات', icon: FaComment }
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white  rounded-b-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">پنل مدیریت</h1>
          <p className="text-gray-300">
            خوش آمدید، <span className="font-bold text-orange-400">{user?.name}</span> (مدیر سیستم)
          </p>
        </div>

        {/* تب‌ها */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8 space-x-reverse overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <tab.icon className="text-lg" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* محتوا */}
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 border border-orange-500/30">
          {activeTab === 'stats' && <AdminStats />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'movies' && <AdminMovies />}
          {activeTab === 'comments' && <AdminComments />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;