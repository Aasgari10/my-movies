import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import useProfile from '@/hooks/useProfile';
import FollowButton from '@/components/FollowButton';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ProfileTab from '@/components/profile/ProfileTab';
import MoviesTab from '@/components/profile/tabs/MoviesTab';
import Avatar from '@/components/common/Avatar';
import { FaEnvelope, FaCalendarAlt, FaCrown, FaInfoCircle } from 'react-icons/fa';

const UserProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const { profileUser, setProfileUser, userMovies, loading, followerStatus, setFollowerStatus } =
    useProfile(id, currentUser);

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

  if (loading) return <LoadingSpinner />;
  if (!profileUser) return <NotFoundMessage />;

  const currentUserId = currentUser?._id || currentUser?.id || currentUser?.uid;
  const profileUserId = profileUser._id || profileUser.id;
  const isOwnProfile = currentUserId && profileUserId && currentUserId === profileUserId;
  const joinedDate = new Date(profileUser.createdAt).toLocaleDateString('fa-IR');

  const handleAvatarUpdate = (updatedUser) => {
    setProfileUser(updatedUser);
  };

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white">
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
            {/* Avatar */}
            <div className="flex-shrink-0">
              {profileUser.avatar ? (
                <div
                  className="cursor-pointer"
                  onClick={() => setIsAvatarModalOpen(true)}
                >
                  <Avatar user={profileUser} size="xl" className="shadow-xl border-4 border-orange-500/30" />
                </div>
              ) : (
                <Avatar user={profileUser} size="xl" className="shadow-xl border-4 border-orange-500/30" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-right">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profileUser.name}</h1>
                  <p className="text-gray-300 mb-4">{profileUser.email}</p>
                  {profileUser.bio && (
                    <p className="text-gray-200 mb-4 max-w-2xl">{profileUser.bio}</p>
                  )}
                </div>

                {!isOwnProfile && profileUserId && (
                  <FollowButton
                    userId={profileUserId}
                    initialIsFollowing={followerStatus.isFollowing}
                    initialFollowerCount={followerStatus.followerCount}
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
                فیلم‌ها ({userMovies.length})
              </TabButton>
              <TabButton tab="followers" activeTab={activeTab} onClick={setActiveTab}>
                دنبال‌کنندگان ({profileUser.followers?.length || 0})
              </TabButton>
              <TabButton tab="following" activeTab={activeTab} onClick={setActiveTab}>
                دنبال‌شده‌ها ({profileUser.following?.length || 0})
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
              onAvatarUpdate={handleAvatarUpdate}
            />
          )}
          {activeTab === 'movies' && (
            <MoviesTab movies={userMovies} isOwnProfile={isOwnProfile} loading={false} />
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
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
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
  <div className="min-h-screen flex items-center justify-center px-4 bg-[#171717] text-white">
    <div className="text-center">
      <div className="text-6xl mb-4">👤</div>
      <h1 className="text-2xl font-bold mb-4">کاربر یافت نشد</h1>
      <Link to="/" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition">
        بازگشت به خانه
      </Link>
    </div>
  </div>
);

const StatBox = ({ title, value, link }) => (
  <div className="text-center p-4 bg-[#374151] rounded-lg border border-gray-700 shadow-sm hover:border-orange-500/50 transition">
    <div className="text-2xl font-bold text-white">{value.toLocaleString('fa-IR')}</div>
    <div className="text-sm text-gray-300 mt-1">{title}</div>
    {link && (
      <Link to={link} className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block transition">
        مشاهده →
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

export default UserProfilePage;