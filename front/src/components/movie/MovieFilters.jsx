import { useState } from 'react';
import { GENRES, GENRE_MAP, YEARS, SORT_OPTIONS } from '../../utils/constants';

const MovieFilters = ({ filters = {}, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    genre: filters.genre || '',
    year: filters.year || '',
    sortBy: filters.sortBy || 'newest'
  });

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = { genre: '', year: '', sortBy: 'newest' };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">فیلترها</h3>
        <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700">
          پاک کردن فیلترها
        </button>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-3">ژانر</label>
          <select
            value={localFilters.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">همه ژانرها</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>{GENRE_MAP[g]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-3">سال انتشار</label>
          <select
            value={localFilters.year}
            onChange={(e) => handleChange('year', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">همه سال‌ها</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-3">مرتب‌سازی</label>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;