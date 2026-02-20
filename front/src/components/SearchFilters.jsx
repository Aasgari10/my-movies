import { useState } from 'react';

const GENRE_MAP = {
  action: 'اکشن',
  drama: 'درام',
  comedy: 'کمدی',
  'sci-fi': 'علمی-تخیلی',
  horror: 'وحشت',
  romance: 'عاشقانه',
  thriller: 'هیجان‌انگیز',
  documentary: 'مستند',
  animation: 'انیمیشن',
  fantasy: 'فانتزی',
  adventure: 'ماجراجویی',
  crime: 'جنایی',
  mystery: 'معمایی',
  biography: 'زندگینامه',
  history: 'تاریخی',
  war: 'جنگی',
  musical: 'موزیکال',
  family: 'خانوادگی',
  other: 'سایر'
};

const GENRES = Object.keys(GENRE_MAP);

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => CURRENT_YEAR - i);

const SORT_OPTIONS = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'oldest', label: 'قدیمی‌ترین' },
  { value: 'rating', label: 'بالاترین امتیاز' }
];

const SearchFilters = ({ filters = {}, onFilterChange }) => {
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
    <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 border border-orange-500/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-white">فیلترها</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-orange-400 hover:text-orange-300 transition"
        >
          پاک کردن فیلترها
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-3">ژانر</label>
          <select
            value={localFilters.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            className="w-full px-4 py-2 bg-[#374151] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="" className="bg-[#374151]">همه ژانرها</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre} className="bg-[#374151]">
                {GENRE_MAP[genre]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-3">سال انتشار</label>
          <select
            value={localFilters.year}
            onChange={(e) => handleChange('year', e.target.value)}
            className="w-full px-4 py-2 bg-[#374151] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="" className="bg-[#374151]">همه سال‌ها</option>
            {YEARS.map((year) => (
              <option key={year} value={year} className="bg-[#374151]">{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-3">مرتب‌سازی بر اساس</label>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full px-4 py-2 bg-[#374151] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value} className="bg-[#374151]">{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;