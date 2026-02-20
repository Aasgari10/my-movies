import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ContactPage from './pages/ContactMe';

import './index.css';

// Layouts
import MainLayout from './components/layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import UsersPage from '@/pages/UsersPage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import AddMoviePage from './pages/AddMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import MyMoviesPage from './pages/MyMoviesPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import TermsPage from './pages/TermsPage';

// ======================
// 🛡️ کامپوننت محافظت از مسیرها
// ======================
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    alert('دسترسی غیرمجاز. فقط ادمین‌ها می‌توانند وارد این صفحه شوند.');
    return <Navigate to="/" replace />;
  }

  return children;
};

// ======================
// 📍 مسیرهای اصلی برنامه
// ======================
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* ========== مسیرهای عمومی ========== */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="users" element={<UsersPage />} />

        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:id" element={<MovieDetailPage />} />
        <Route path="profile/:id" element={<UserProfilePage />} />
        <Route path="profile/:id/followers" element={<UserProfilePage />} />
        <Route path="profile/:id/following" element={<UserProfilePage />} />

        {/* ========== مسیرهای محافظت‌شده (نیاز به ورود) ========== */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-movie"
          element={
            <ProtectedRoute>
              <AddMoviePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit-movie/:id"
          element={
            <ProtectedRoute>
              <EditMoviePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-movies"
          element={
            <ProtectedRoute>
              <MyMoviesPage />
            </ProtectedRoute>
          }
        />

        {/* ========== مسیرهای مدیریت (فقط ادمین) ========== */}
        <Route
          path="admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
          <Route path="/contact" element={<ContactPage />} />

        {/* ========== صفحه 404 ========== */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

// ======================
// 🚀 کامپوننت اصلی
// ======================
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="font-sans text-right">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;