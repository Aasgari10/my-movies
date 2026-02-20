import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useMovies from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import SearchFilters from '@/components/SearchFilters';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const MoviesPage = () => {
  const { isAuthenticated } = useAuth();
  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleFilterChange,
    handlePageChange
  } = useMovies();

  if (loading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white  rounded-b-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">فیلم‌ها و خاطرات</h1>
              <p className="text-gray-300">خاطرات فیلمی کاربران جامعه ما</p>
            </div>
            
            {/* دکمه‌های سمت راست */}
            <div className="flex flex-wrap gap-3">
              {/* دکمه کاربران سینماباز */}
              <Link
                to="/users"
                className="inline-flex items-center bg-[#48A07B] hover:bg-[#3A8060] text-white px-6 py-3 rounded-lg transition font-bold shadow-md"
              >
                کاربران سینماباز
              </Link>
              
              {/* دکمه افزودن فیلم (فقط برای کاربران وارد شده) */}
              {isAuthenticated() && (
                <Link
                  to="/add-movie"
                  className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition font-bold shadow-md"
                >
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  افزودن فیلم جدید
                </Link>
              )}
            </div>
          </div>

          {/* Search */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
          />
        </div>

        {/* Filters & Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Movies List */}
          <div className="lg:w-3/4">
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-300">
                نمایش {movies.length} فیلم
                {searchQuery && <span> برای "{searchQuery}"</span>}
              </div>
              <div className="text-sm text-gray-400">
                صفحه {currentPage} از {totalPages}
              </div>
            </div>

            {/* Movies Grid */}
            {movies.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id || movie._id} movie={movie} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-16 bg-[#2A2A2A] rounded-xl border border-gray-700">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-bold mb-2 text-white">فیلمی یافت نشد</h3>
                <p className="text-gray-300 mb-6">
                  {searchQuery
                    ? `نتیجه‌ای برای "${searchQuery}" پیدا نشد`
                    : 'هنوز فیلمی ثبت نشده است'}
                </p>
                {isAuthenticated() && (
                  <Link
                    to="/add-movie"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition shadow-md"
                  >
                    اولین فیلم را اضافه کنید
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;