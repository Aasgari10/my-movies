export const GENRES = [
  { value: '', label: 'انتخاب ژانر' },
  { value: 'action', label: 'اکشن' },
  { value: 'drama', label: 'درام' },
  { value: 'comedy', label: 'کمدی' },
  { value: 'sci-fi', label: 'علمی-تخیلی' },
  { value: 'horror', label: 'وحشت' },
  { value: 'romance', label: 'عاشقانه' },
  { value: 'thriller', label: 'هیجان‌انگیز' },
  { value: 'documentary', label: 'مستند' },
  { value: 'animation', label: 'انیمیشن' },
  { value: 'fantasy', label: 'فانتزی' },
  { value: 'adventure', label: 'ماجراجویی' },
  { value: 'crime', label: 'جنایی' },
  { value: 'mystery', label: 'معمایی' },
  { value: 'biography', label: 'زندگینامه' },
  { value: 'history', label: 'تاریخی' },
  { value: 'war', label: 'جنگی' },
  { value: 'musical', label: 'موزیکال' },
  { value: 'family', label: 'خانوادگی' },
  { value: 'other', label: 'سایر' }
];

export const YEARS = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);