import { useState, useEffect, useCallback } from 'react';
import { getMovies, searchMovies } from '../services/movies';

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    sortBy: 'newest'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = useCallback(async (page = currentPage, filterValues = filters, query = searchQuery) => {
    try {
      setLoading(true);
      setError('');

      let response;
      if (query.trim()) {
        response = await searchMovies(query, filterValues);
      } else {
        const params = {
          page,
          limit: 12,
          ...(filterValues.genre && { genre: filterValues.genre }),
          ...(filterValues.year && { year: filterValues.year }),
          sort: filterValues.sortBy === 'newest' ? '-createdAt' : 
                filterValues.sortBy === 'oldest' ? 'createdAt' :
                filterValues.sortBy === 'rating' ? '-rating' : '-createdAt'
        };
        response = await getMovies(params);
      }

      if (response.success) {
        setMovies(response.data || []);
        setTotalPages(response.totalPages || response.pagination?.totalPages || 1);
      } else {
        setError('خطا در دریافت فیلم‌ها');
      }
    } catch (err) {
      console.error('❌ خطای دریافت فیلم‌ها:', err);
      setError('خطا در اتصال به سرور');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, searchQuery]);

  // بارگذاری اولیه و هنگام تغییر صفحه/فیلترها
  useEffect(() => {
    fetchMovies(currentPage, filters, searchQuery);
  }, [currentPage, filters, searchQuery, fetchMovies]);

  const handleSearch = (e) => {
    e?.preventDefault();
    setCurrentPage(1);
    // نیازی به صدا زدن fetchMovies نیست، useEffect انجام می‌دهد
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
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
  };
};

export default useMovies;