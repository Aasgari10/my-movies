import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getMovieById } from '@/services/movies';
import { checkFollowingStatus } from '@/services/users';
import FollowButton from '@/components/FollowButton';
import LikeButton from '@/components/LikeButton';
import ShareButton from '@/components/ShareButton';
import CommentSection from '@/components/comments/CommentSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Avatar from '@/components/common/Avatar';
import { FaStar } from 'react-icons/fa';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [userInteraction, setUserInteraction] = useState({
    liked: false,
    shared: false,
  });
  const [publisherFollowStatus, setPublisherFollowStatus] = useState({
    isFollowing: false,
    followerCount: 0
  });

  useEffect(() => {
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (movie?.creator?._id && user) {
      checkFollowingStatus(movie.creator._id).then((status) => {
        setPublisherFollowStatus(status);
      });
    }
  }, [movie, user]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const response = await getMovieById(id);
      if (response.success) {
        const movieData = response.data;
        setMovie({
          ...movieData,
          likes: movieData.likes || [],
          shares: movieData.shares || [],
          comments: movieData.comments || []
        });
        setUserInteraction({
          liked: movieData.userInteraction?.liked || false,
          shared: movieData.userInteraction?.shared || false,
        });
      } else {
        setError('فیلم مورد نظر یافت نشد');
      }
    } catch (err) {
      console.error('❌ خطای دریافت فیلم:', err);
      setError('خطا در دریافت اطلاعات فیلم');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
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

  const renderStars = (rating) => {
    if (!rating) return Array(5).fill(<FaStar key={Math.random()} className="text-gray-600" />);
    const stars = [];
    const normalizedRating = Math.max(0, Math.min(10, rating));
    const fullStars = Math.floor(normalizedRating / 2);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-600" />);
      }
    }
    return stars;
  };

  const handleLikeChange = async (liked, likesCount) => {
    if (!movie || !user) return;

    const tempLike = {
      _id: user._id || user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };

    setMovie((prev) => ({
      ...prev,
      likes: liked
        ? [...prev.likes, tempLike]
        : prev.likes.filter((like) => (like._id || like.id) !== (user._id || user.id)),
      likesCount: likesCount,
    }));
    setUserInteraction((prev) => ({ ...prev, liked }));

    try {
      const response = await getMovieById(id);
      if (response.success) {
        const movieData = response.data;
        setMovie((prev) => ({
          ...prev,
          likes: movieData.likes || [],
          likesCount: movieData.likesCount || movieData.likes?.length || 0,
        }));
      }
    } catch (err) {
      console.error('❌ خطا در همگام‌سازی لایک‌ها:', err);
    }
  };

  const handleShareChange = (shared, shareCount) => {
    if (!movie || !user) return;
    setMovie((prev) => ({
      ...prev,
      shares: shared
        ? [...prev.shares, { user: user.id, sharedAt: new Date().toISOString() }]
        : prev.shares.filter((share) => share.user !== user.id),
      shareCount: shareCount || (shared ? (prev.shareCount || 0) + 1 : Math.max(0, (prev.shareCount || 0) - 1))
    }));
    setUserInteraction((prev) => ({ ...prev, shared }));
  };

  if (loading) return <LoadingSpinner />;
  if (error || !movie) return <NotFoundMessage />;

  const isOwner = user && movie.creator && user.id === movie.creator.id;

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link to="/" className="hover:text-orange-400 transition">خانه</Link>
            <span className="mx-2">/</span>
            <Link to="/movies" className="hover:text-orange-400 transition">فیلم‌ها</Link>
            <span className="mx-2">/</span>
            <span className="text-orange-400 font-bold">{movie.title}</span>
          </nav>
        </div>

        {/* تصویر مخصوص موبایل - در وسط کادر */}
        <div className="lg:hidden mb-6 flex justify-center">
          <div className="max-w-full rounded-xl overflow-hidden shadow-xl border border-gray-700">
            <img
              src={movie.image || 'https://via.placeholder.com/400x400?text=Film+Memories'}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/400x400?text=Film+Memories')}
            />
          </div>
        </div>

        {/* Movie Header */}
        <div className="bg-[#2A2A2A] rounded-2xl p-8 mb-8 shadow-lg border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster - دسکتاپ */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="aspect-square rounded-xl overflow-hidden shadow-xl border border-gray-700">
                <img
                  src={movie.image || 'https://via.placeholder.com/400x400?text=Film+Memories'}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/400x400?text=Film+Memories')}
                />
              </div>
            </div>

            {/* Right content - 2/3 width */}
            <div className="lg:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                  {isOwner && (
                    <button
                      onClick={() => navigate(`/edit-movie/${id}`)}
                      className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition text-sm border border-orange-500/30"
                    >
                      ویرایش
                    </button>
                  )}
                </div>

                {/* Metadata vertical */}
                <div className="mb-6">
                  <div className="bg-[#374151] px-5 py-3 rounded-full shadow-sm mb-3">
                    <span className="text-white">سال انتشار: {movie.year || 'نامشخص'}</span>
                  </div>
                  <div className="bg-[#374151] px-5 py-3 rounded-full shadow-sm mb-3">
                    <span className="text-white">ژانر: {getPersianGenre(movie.genre)}</span>
                  </div>
                  <div className="bg-[#374151] px-5 py-3 rounded-full shadow-sm">
                    <span className="text-white">کارگردان: {movie.director || 'نامشخص'}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center ml-4 gap-1">{renderStars(movie.rating || 0)}</div>
                    <span className="text-2xl font-bold text-white">
                      {movie.rating || 0}
                      <span className="text-lg text-gray-400">/10</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Publisher section - اصلاح شده برای موبایل */}
              <div className="mt-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 bg-[#374151] rounded-xl">
                  {movie.creator && (
                    <Link to={`/profile/${movie.creator._id || movie.creator.id}`} className="flex items-center hover:opacity-80 transition">
                      <Avatar user={movie.creator} size="lg" />
                      <div className="mr-4">
                        <p className="font-bold text-white">{movie.creator.name || 'کاربر'}</p>
                        <p className="text-sm text-gray-300">منتشر شده در {formatDate(movie.createdAt)}</p>
                      </div>
                    </Link>
                  )}
                  {!isOwner && user && (movie.creator?._id || movie.creator?.id) && (
                    <FollowButton
                      userId={movie.creator._id || movie.creator.id}
                      initialIsFollowing={publisherFollowStatus.isFollowing}
                      initialFollowerCount={publisherFollowStatus.followerCount}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <div className="flex space-x-8 space-x-reverse">
              {['details', 'comments', 'likes'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-400'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {getTabTitle(tab, movie)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'details' && <MovieDetails movie={movie} />}
            {activeTab === 'comments' && <CommentSection movieId={id} />}
            {activeTab === 'likes' && <LikesTab likes={movie.likes} />}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 border border-orange-500/30 hover:border-orange-500/50 transition">
              <h3 className="font-bold mb-4 text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                عملیات
              </h3>
              <div className="space-y-3">
                <LikeButton
                  movieId={id}
                  initialLikes={movie.likes || []}
                  initialLiked={userInteraction.liked}
                  showCount={true}
                  size="lg"
                  onLikeChange={handleLikeChange}
                />
                <ShareButton
                  movieId={id}
                  movieTitle={movie.title}
                  initialShared={userInteraction.shared}
                  initialShareCount={movie.shares?.length || 0}
                  onShareChange={handleShareChange}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// NotFoundMessage
const NotFoundMessage = () => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-[#171717] text-white">
    <div className="text-center">
      <div className="text-6xl mb-4">🎬</div>
      <h1 className="text-2xl font-bold mb-4">فیلم پیدا نشد</h1>
      <Link to="/movies" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition">
        بازگشت به لیست فیلم‌ها
      </Link>
    </div>
  </div>
);

// MovieDetails
const MovieDetails = ({ movie }) => (
  <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-gray-700">
    <h2 className="text-xl font-bold mb-6 text-white">خاطره فیلم</h2>
    <div className="prose prose-lg max-w-none text-gray-300">
      <p className="leading-relaxed whitespace-pre-line">
        {movie.description || 'توضیحی برای این فیلم ثبت نشده است.'}
      </p>
    </div>
    <div className="mt-8 pt-8 border-t border-gray-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-[#374151] rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{movie.likes?.length || 0}</div>
          <div className="text-sm text-gray-300">لایک</div>
        </div>
        <div className="text-center p-4 bg-[#374151] rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{movie.comments?.length || 0}</div>
          <div className="text-sm text-gray-300">نظر</div>
        </div>
        <div className="text-center p-4 bg-[#374151] rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{movie.shares?.length || 0}</div>
          <div className="text-sm text-gray-300">اشتراک</div>
        </div>
        <div className="text-center p-4 bg-[#374151] rounded-lg">
          <div className="text-2xl font-bold text-orange-400">{movie.rating || 0}/10</div>
          <div className="text-sm text-gray-300">امتیاز</div>
        </div>
      </div>
    </div>
  </div>
);

// LikesTab
const LikesTab = ({ likes }) => (
  <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-gray-700">
    <h2 className="text-xl font-bold mb-6 text-white">افرادی که این فیلم را دوست دارند</h2>
    {likes && likes.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {likes.map((like, index) => (
          <Link
            key={like._id || index}
            to={`/profile/${like._id}`}
            className="flex items-center p-4 border border-gray-700 rounded-lg hover:bg-[#374151] transition"
          >
            <Avatar user={like} size="md" />
            <div className="mr-4">
              <p className="font-bold text-white">{like.name || `کاربر ${index + 1}`}</p>
              <p className="text-sm text-gray-400">لایک</p>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">❤️</div>
        <h3 className="text-xl font-bold mb-2 text-white">هنوز کسی این فیلم را لایک نکرده</h3>
        <p className="text-gray-400">اولین نفری باشید که این فیلم را لایک می‌کند</p>
      </div>
    )}
  </div>
);

// Helper functions
const getPersianGenre = (genre) => {
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
  };
  return genreMap[genre] || genre || 'سایر';
};

const getTabTitle = (tab, movie) => {
  const titles = {
    details: 'جزئیات',
    comments: `نظرات (${movie.comments?.length || 0})`,
    likes: `لایک‌ها (${movie.likes?.length || 0})`,
  };
  return titles[tab] || tab;
};

export default MovieDetailPage;