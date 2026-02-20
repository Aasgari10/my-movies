// توابع کمکی برای صفحات فیلم

export const getPersianGenre = (genre) => {
  const genreMap = {
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
  return genreMap[genre] || genre || 'سایر';
};

export const getTabTitle = (tab, movie) => {
  const titles = {
    details: 'جزئیات',
    comments: `نظرات (${movie.comments?.length || 0})`,
    likes: `لایک‌ها (${movie.likes?.length || 0})`,
    shares: `اشتراک‌ها (${movie.shares?.length || 0})`
  };
  return titles[tab] || tab;
};

export const formatPersianDate = (dateString) => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export const renderStars = (rating) => {
  if (!rating) return Array(5).fill(<span key={Math.random()} className="text-gray-300">★</span>);
  const stars = [];
  const normalizedRating = Math.max(0, Math.min(10, rating));
  const fullStars = Math.floor(normalizedRating / 2);
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="text-yellow-500">★</span>);
    } else {
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }
  }
  return stars;
};