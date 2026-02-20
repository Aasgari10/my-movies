// src/utils/constants.js
export const GENRE_MAP = {
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
  other: 'سایر',
};

export const GENRE_OPTIONS = [
  { value: '', label: 'انتخاب ژانر' },
  ...Object.entries(GENRE_MAP).map(([value, label]) => ({ value, label })),
];

export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);

export const SORT_OPTIONS = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'oldest', label: 'قدیمی‌ترین' },
  { value: 'rating', label: 'بالاترین امتیاز' },
];

// upload limitations
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];