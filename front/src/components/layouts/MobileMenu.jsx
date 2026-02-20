import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('آیا از خروج اطمینان دارید؟')) {
      logout();
      onClose();
    }
  };

  const isAuth = isAuthenticated?.();
  const currentUserId = user?._id || user?.id || user?.uid;

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
      <div className="flex flex-col space-y-3">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={onClose}
        >
          خانه
        </Link>
        <Link
          to="/movies"
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={onClose}
        >
          فیلم‌ها
        </Link>
        <Link
          to="/users"
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={onClose}
        >
          کاربران
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-600 transition py-2"
          onClick={onClose}
        >
          درباره ما
        </Link>

        {isAuth ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition py-2"
              onClick={onClose}
            >
              داشبورد
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center py-2 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition"
                onClick={onClose}
              >
                <span className="ml-1">🛡️</span>
                پنل مدیریت
              </Link>
            )}
            <Link
              to={`/profile/${currentUserId}`}
              className="text-gray-700 hover:text-blue-600 transition py-2"
              onClick={onClose}
            >
              پروفایل
            </Link>
            <button
              onClick={handleLogout}
              className="text-right text-red-600 hover:text-red-700 transition py-2"
            >
              خروج از حساب
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition py-2"
              onClick={onClose}
            >
              ورود
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={onClose}
            >
              ثبت‌نام
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;