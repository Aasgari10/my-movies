import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '@/services/users';
import { getUserMovies } from '@/services/movies'; // اگر این سرویس را دارید

const useProfile = (id, currentUser) => {
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userMovies, setUserMovies] = useState([]);
  const [followerStatus, setFollowerStatus] = useState({
    isFollowing: false,
    followerCount: 0
  });

  useEffect(() => {
    if (!id) {
      const currentUserId = currentUser?._id || currentUser?.id || currentUser?.uid;
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
        if (currentUser) {
          const currentUserId = currentUser._id || currentUser.id;
          const isFollowing = response.user.followers?.some(
            (f) => (f._id || f.id || f) === currentUserId
          );
          setFollowerStatus({
            isFollowing: isFollowing || false,
            followerCount: response.user.followers?.length || 0
          });
        }
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
      // اگر سرویس getUserMovies دارید
      const response = await getUserMovies(userId, { limit: 20 });
      if (response.success) {
        setUserMovies(response.data || []);
      }
    } catch (error) {
      console.error('❌ خطا در دریافت فیلم‌های کاربر:', error);
      // داده‌های نمونه برای نمایش
      setUserMovies([
        { id: 1, title: 'فیلم نمونه ۱', year: 2023, rating: 8.5 },
        { id: 2, title: 'فیلم نمونه ۲', year: 2022, rating: 7.8 },
      ]);
    }
  };

  // تابع به‌روزرسانی کاربر پس از آپلود آواتار
  const updateProfileUser = (updatedUser) => {
    setProfileUser(updatedUser);
  };

  return {
    profileUser,
    setProfileUser: updateProfileUser, // override setProfileUser با نسخه‌ای که آواتار را به‌روز می‌کند
    userMovies,
    loading,
    followerStatus,
    setFollowerStatus,
    refetch: fetchUserProfile
  };
};

export default useProfile;