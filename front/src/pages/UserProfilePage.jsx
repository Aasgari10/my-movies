// src/pages/UserProfilePage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getUserById } from '@/services/users';
import { getUserMovies } from '@/services/movies';
import FollowButton from '@/components/FollowButton';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MoviesTab from '@/components/profile/tabs/MoviesTab';
import ProfileTab from '@/components/profile/tabs/ProfileTab'; // ✅ کامپوننت با دکمه تغییر عکس
import Avatar from '@/components/common/Avatar';
import { FaEnvelope, FaCalendarAlt, FaCrown, FaInfoCircle } from 'react-icons/fa';

const UserProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [userMovies, setUserMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(false);

  // تشخیص تب فعال از روی مسیر URL
  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith('/followers')) {
      setActiveTab('followers');
    } else if (path.endsWith('/following')) {
      setActiveTab('following');
    } else {
      setActiveTab('profile');
    }
  }, [location.pathname]);

  // هدایت اگر id وجود نداشته باشد
  useEffect(() => {
    const currentUserId = currentUser?._id || currentUser?.id || currentUser?.uid;
    if (!id) {
      if (currentUserId) {
        navigate(`/profile/${currentUserId}`, { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }
  }, [id, currentUser, navigate]);

  useEffect(() => {
    if (id) {
      fetchUserProfile();
    }
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserById(id);
      if (response.success) {
        setProfileUser(response.user);
        fetchUserMovies(id);
      } else {
        navigate('/404');
      }
    } catch (error) {
      console.error('❌ خطا در دریافت پروفایل:', error);
      navigate('/404');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserMovies = async (userId) => {
    try {
      setMoviesLoading(true);
      const response = await getUserMovies(userId, { limit: 20 });
      if (response.success) {
        setUserMovies(response.data || []);
      }
    } catch (error) {
      console.error('❌ خطا در دریافت فیلم‌های کاربر:', error);
    } finally {
      setMoviesLoading(false);
    }
  };

  // 🆕 تابع به‌روزرسانی کاربر پس از آپلود آواتار
  const handleAvatarUpdate = (updatedUser) => {
    setProfileUser(updatedUser);
  };

  if (loading) return <LoadingSpinner />;
  if (!profileUser) return <NotFoundMessage />;

  const currentUserId = currentUser?._id || currentUser?.id || currentUser?.uid;
  const profileUserId = profileUser._id || profileUser.id;
  const isOwnProfile = currentUserId && profileUserId && currentUserId === profileUserId;
  const joinedDate = new Date(profileUser.createdAt).toLocaleDateString('fa-IR');

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white rounded-b-3xl overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-gray-400">
            <Link to="/" className="hover:text-orange-400 transition">خانه</Link>
            <span className="mx-2">/</span>
            <Link to="/users" className="hover:text-orange-400 transition">کاربران</Link>
            <span className="mx-2">/</span>
            <span className="text-orange-400 font-bold">{profileUser.name}</span>
          </nav>
        </div>

        {/* Profile Header */}
        <div className="bg-[#2A2A2A] rounded-2xl p-8 mb-8 border border-orange-500/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar - با قابلیت کلیک */}
            <div className="flex-shrink-0">
              {profileUser.avatar ? (
                <div className="cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
<Avatar user={profileUser} size="xl" className="w-40 h-40 shadow-xl border-4 border-orange-500/30" />                </div>
              ) : (
<Avatar user={profileUser} size="xl" className="w-40 h-40 shadow-xl border-4 border-orange-500/30" />              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-right">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profileUser.name}</h1>
                  {profileUser.bio && (
                    <p className="text-gray-200 mb-4 max-w-2xl">{profileUser.bio}</p>
                  )}
                </div>

                {!isOwnProfile && profileUserId && (
                  <FollowButton
                    userId={profileUserId}
                    initialIsFollowing={profileUser.followers?.some((f) => {
                      const followerId = f._id || f.id || f;
                      return followerId === currentUserId;
                    })}
                    initialFollowerCount={profileUser.followers?.length || 0}
                  />
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <StatBox
                  title="دنبال‌کننده"
                  value={profileUser.followers?.length || 0}
                  link={`/profile/${id}/followers`}
                />
                <StatBox
                  title="دنبال‌شده"
                  value={profileUser.following?.length || 0}
                  link={`/profile/${id}/following`}
                />
                <StatBox
                  title="فیلم‌ها"
                  value={userMovies.length}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8 space-x-reverse">
              <TabButton tab="profile" activeTab={activeTab} onClick={setActiveTab}>
                پروفایل
              </TabButton>
              <TabButton tab="movies" activeTab={activeTab} onClick={setActiveTab}>
                فیلم‌ها 
              </TabButton>
              <TabButton tab="followers" activeTab={activeTab} onClick={setActiveTab}>
                دنبال‌کنندگان 
              </TabButton>
              <TabButton tab="following" activeTab={activeTab} onClick={setActiveTab}>
                دنبال‌شده‌ها 
              </TabButton>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-orange-500/30">
          {activeTab === 'profile' && (
            <ProfileTab
              profileUser={profileUser}
              joinedDate={joinedDate}
              isOwnProfile={isOwnProfile}
              onAvatarUpdate={handleAvatarUpdate} // ✅ پاس داده می‌شود
            />
          )}
          {activeTab === 'movies' && (
            <MoviesTab movies={userMovies} isOwnProfile={isOwnProfile} loading={moviesLoading} />
          )}
          {activeTab === 'followers' && <FollowersTab followers={profileUser.followers} />}
          {activeTab === 'following' && <FollowingTab following={profileUser.following} />}
        </div>
      </div>

      {/* Modal for avatar enlargement */}
      {isAvatarModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsAvatarModalOpen(false)}
        >
          <div className="relative max-w-3xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsAvatarModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
            <img
              src={profileUser.avatar}
              alt={profileUser.name}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ======================
// کامپوننت‌های کمکی
// ======================

const NotFoundMessage = () => (
  <div className="text-center py-20 bg-[#171717] text-white">
    <div className="text-6xl mb-4">👤</div>
    <h1 className="text-2xl font-bold mb-4">کاربر یافت نشد</h1>
    <Link to="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition">
      بازگشت به خانه
    </Link>
  </div>
);

const StatBox = ({ title, value, link }) => (
  <div className="text-center p-4 bg-[#374151] rounded-lg border border-gray-700 shadow-sm hover:border-orange-500/50 transition">
    <div className="text-2xl font-bold text-white">{value.toLocaleString('fa-IR')}</div>
    <div className="text-sm text-gray-300 mt-1">{title}</div>
    {link && (
      <Link to={link} className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block transition">
      </Link>
    )}
  </div>
);

const TabButton = ({ tab, activeTab, onClick, children }) => (
  <button
    onClick={() => onClick(tab)}
    className={`py-3 px-1 border-b-2 font-medium text-sm ${
      activeTab === tab
        ? 'border-orange-500 text-orange-400'
        : 'border-transparent text-gray-400 hover:text-gray-200'
    } transition`}
  >
    {children}
  </button>
);

const FollowersTab = ({ followers }) => (
  <UserList users={followers} emptyMessage="هنوز کسی این کاربر را دنبال نکرده است." />
);

const FollowingTab = ({ following }) => (
  <UserList users={following} emptyMessage="این کاربر هنوز کسی را دنبال نکرده است." />
);

const UserList = ({ users, emptyMessage }) => (
  <div>
    {users && users.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user, index) => (
          <Link
            key={user._id || user.id || index}
            to={`/profile/${user._id || user.id}`}
            className="flex items-center p-4 bg-[#374151] border border-gray-700 rounded-lg hover:border-orange-500/50 hover:bg-[#3f4a5a] transition"
          >
            <Avatar user={user} size="md" />
            <div className="mr-4">
              <p className="font-bold text-white">{user.name || `کاربر ${index + 1}`}</p>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">👥</div>
        <h3 className="text-xl font-bold mb-2 text-white">{emptyMessage}</h3>
      </div>
    )}
  </div>
);

const InfoItem = ({ icon: Icon, label, value, isMultiLine = false }) => (
  <div className="flex items-start bg-[#374151] p-4 rounded-lg border border-gray-700">
    {Icon && <Icon className="text-orange-400 text-2xl ml-3" />}
    <div>
      <div className="text-sm text-gray-300">{label}</div>
      {isMultiLine ? (
        <p className="text-white mt-1 leading-relaxed">{value}</p>
      ) : (
        <div className="font-bold text-white text-lg">{value}</div>
      )}
    </div>
  </div>
);

export default UserProfilePage;