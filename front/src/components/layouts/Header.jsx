import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/logu.png';
import phoneImage from '@/assets/arrow.png';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    if (window.confirm('آیا از خروج اطمینان دارید؟')) {
      logout();
      closeMobileMenu();
    }
  };

  return (
    <>
      <header className="bg-[#171717] text-white shadow-md sticky top-0 z-50 rounded-t-3xl">
        <div className="container mx-auto px-4 sm:px-8 pt-6 pb-3 flex items-center justify-between">
          {/* لوگو + نام سایت */}
          <Link to="/" className="flex items-center gap-x-2" onClick={closeMobileMenu}>
            <img
              src={logo}
              alt="لوگو"
              className="w-9 h-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-white text-2xl font-bold">سینماباز</span>
          </Link>

          {/* منوی دسکتاپ - مخفی در موبایل (تا lg) */}
          <nav className="hidden lg:flex flex-1 justify-center gap-x-12">
            <NavLink to="/">خانه</NavLink>
            <NavLink to="/movies">فیلم‌ها</NavLink>
            <NavLink to="/about">درباره ما</NavLink>

            {isAuthenticated() ? (
              <>
                <NavLink to="/dashboard">داشبورد</NavLink>
                {isAdmin && <NavLink to="/admin">ادمین</NavLink>}
              </>
            ) : (
              <>
                <NavLink to="/login">ورود</NavLink>
                <NavLink to="/register">ثبت‌نام</NavLink>
              </>
            )}
          </nav>

          {/* دکمه تماس با ما (دسکتاپ) - مخفی در موبایل (تا lg) */}
          <div className="hidden lg:block">
            <ContactButtonDesktop />
          </div>

          {/* دکمه همبرگری برای موبایل (تا lg) */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#2A2A2A] transition"
            onClick={toggleMobileMenu}
            aria-label="منو"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* منوی موبایل (تا lg) */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeMobileMenu} />
            <div className="absolute left-0 right-0 top-full bg-[#2A2A2A] border-t border-gray-700 px-4 py-3 space-y-3 z-40 lg:hidden shadow-xl rounded-b-3xl">
              <MobileNavLink to="/" onClick={closeMobileMenu}>خانه</MobileNavLink>
              <MobileNavLink to="/movies" onClick={closeMobileMenu}>فیلم‌ها</MobileNavLink>
              <MobileNavLink to="/about" onClick={closeMobileMenu}>درباره ما</MobileNavLink>

              {isAuthenticated() ? (
                <>
                  <MobileNavLink to="/dashboard" onClick={closeMobileMenu}>داشبورد</MobileNavLink>
                  {isAdmin && <MobileNavLink to="/admin" onClick={closeMobileMenu}>پنل مدیریت</MobileNavLink>}
                </>
              ) : (
                <>
                  <MobileNavLink to="/login" onClick={closeMobileMenu}>ورود</MobileNavLink>
                  <MobileNavLink to="/register" onClick={closeMobileMenu}>ثبت‌نام</MobileNavLink>
                </>
              )}

              <MobileNavLink to="/contact" onClick={closeMobileMenu}>تماس با ما</MobileNavLink>
              {isAuthenticated() && (
                <button onClick={handleLogout} className="block w-full text-right py-2 text-red-400 hover:text-red-300">
                  خروج از حساب
                </button>
              )}
            </div>
          </>
        )}
      </header>
    </>
  );
};

// کامپوننت‌های کمکی (بدون تغییر)
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative overflow-hidden text-white transition-colors duration-700 z-10 after:content-[''] after:absolute after:inset-0 after:bg-[#666666] after:z-[-1] after:origin-bottom after:scale-y-0 after:transition-transform after:duration-700 hover:after:scale-y-100 px-3 py-1"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link to={to} className="block py-2 text-white hover:text-orange-400 transition" onClick={onClick}>
    {children}
  </Link>
);

const ContactButtonDesktop = () => (
  <Link to="/contact" className="bg-[#666666] text-white py-1 ps-3 pe-1 rounded-full flex items-center gap-x-4 rtl:gap-x-4">
    <span>تماس با ما</span>
    <span className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
      <img src={phoneImage} alt="تلفن قدیمی" className="w-5 h-5 object-contain" />
    </span>
  </Link>
);

export default Header;