// frontend/src/components/MovieCard.jsx
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : '0.0';
  };

  return (
    <div className="bg-white  rounded-b-3xl overflow-hidden shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* تصویر فیلم */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={movie.image || 'https://via.placeholder.com/400x300?text=Film+Memories'}
          alt={movie.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Film+Memories';
          }}
        />
        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {movie.year}
        </div>
      </div>

      {/* اطلاعات فیلم */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
            {movie.title}
          </h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
            <span className="text-yellow-500 ml-1">⭐</span>
            <span className="font-bold">{formatRating(movie.rating)}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {movie.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <span className="ml-2">🎬</span>
            <span>{movie.director}</span>
          </div>
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
            {movie.genre === 'sci-fi' ? 'علمی-تخیلی' : 
             movie.genre === 'action' ? 'اکشن' :
             movie.genre === 'drama' ? 'درام' :
             movie.genre === 'comedy' ? 'کمدی' :
             movie.genre === 'horror' ? 'وحشت' :
             movie.genre === 'romance' ? 'عاشقانه' :
             movie.genre === 'thriller' ? 'هیجان‌انگیز' :
             movie.genre === 'documentary' ? 'مستند' :
             movie.genre === 'animation' ? 'انیمیشن' :
             movie.genre === 'fantasy' ? 'فانتزی' :
             movie.genre === 'adventure' ? 'ماجراجویی' :
             movie.genre === 'crime' ? 'جنایی' :
             movie.genre === 'mystery' ? 'معمایی' :
             movie.genre === 'biography' ? 'زندگینامه' :
             movie.genre === 'history' ? 'تاریخی' :
             movie.genre === 'war' ? 'جنگی' :
             movie.genre === 'musical' ? 'موزیکال' :
             movie.genre === 'family' ? 'خانوادگی' : 'سایر'}
          </span>
        </div>

        {/* سازنده و دکمه‌ها */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {movie.creator?.name?.charAt(0) || 'ک'}
            </div>
            <span className="text-xs text-gray-600 mr-2">
              {movie.creator?.name?.split(' ')[0] || 'کاربر'}
            </span>
          </div>
          
          <Link
            to={`/movies/${movie.id || movie._id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-bold"
          >
            مشاهده جزئیات →
          </Link>
        </div>

        {/* آمار */}
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <div className="flex items-center">
            <span className="text-red-400 ml-1">❤️</span>
            <span>{movie.likes?.length || 0} لایک</span>
          </div>
          <div className="flex items-center">
            <span className="text-blue-400 ml-1">💬</span>
            <span>{movie.comments?.length || 0} نظر</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;