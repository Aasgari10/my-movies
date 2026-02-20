import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const DesktopNav = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('آیا از خروج اطمینان دارید؟')) {
      logout();
    }
  };

  const isAuth = isAuthenticated?.();
  const currentUserId = user?._id || user?.id || user?.uid;

  return (
    <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
      <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
        خانه
      </Link>
      <Link to="/movies" className="text-gray-700 hover:text-blue-600 transition">
        فیلم‌ها
      </Link>
      {/* لینک جدید کاربران */}
      <Link to="/users" className="text-gray-700 hover:text-blue-600 transition">
        کاربران
      </Link>
      <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
        درباره ما
      </Link>

      {isAuth ? (
        <>
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
            داشبورد
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-sm"
            >
              <span className="ml-1">🛡️</span>
              پنل مدیریت
            </Link>
          )}
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-sm text-gray-600">سلام، {user?.name || 'کاربر'}</span>
            <Link
              to={`/profile/${currentUserId}`}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              پروفایل
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 transition"
            >
              خروج
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
            ورود
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ثبت‌نام
          </Link>
        </>
      )}
    </nav>
  );
};

export default DesktopNav;