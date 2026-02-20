import api from './api';

// ======================
// 👥 سرویس‌های کاربران
// ======================

export const saveMovie = async (movieId) => {
  try {
    console.log(`📥 درخواست ذخیره فیلم ${movieId}`);
    const response = await api.post(`/users/save-movie/${movieId}`);
    console.log('✅ فیلم ذخیره شد');
    return response.data;
  } catch (error) {
    console.error('❌ خطا در ذخیره فیلم:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در ذخیره فیلم. لطفاً دوباره تلاش کنید.'
    };
  }
};

export const unsaveMovie = async (movieId) => {
  try {
    console.log(`🗑️ درخواست حذف فیلم ${movieId} از ذخیره‌ها`);
    const response = await api.delete(`/users/unsave-movie/${movieId}`);
    console.log('✅ فیلم از ذخیره‌ها حذف شد');
    return response.data;
  } catch (error) {
    console.error('❌ خطا در حذف فیلم:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در حذف فیلم. لطفاً دوباره تلاش کنید.'
    };
  }
};

export const getSavedMovies = async () => {
  try {
    console.log('📥 دریافت فیلم‌های ذخیره شده');
    const response = await api.get('/users/saved-movies');
    console.log(`✅ ${response.data.savedMovies?.length || 0} فیلم ذخیره شده دریافت شد`);
    return response.data;
  } catch (error) {
    console.error('❌ خطا در دریافت فیلم‌های ذخیره شده:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در دریافت فیلم‌های ذخیره شده'
    };
  }
};

export const followUser = async (userId) => {
  try {
    console.log(`📤 درخواست دنبال کردن کاربر ${userId}`);
    const response = await api.post(`/users/${userId}/follow`);
    console.log('✅ پاسخ دنبال کردن:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ خطا در دنبال کردن:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.'
    };
  }
};

export const getUserById = async (userId) => {
  try {
    console.log(`📤 دریافت اطلاعات کاربر ${userId}`);
    const response = await api.get(`/users/${userId}`);
    console.log('✅ اطلاعات کاربر دریافت شد');
    return response.data;
  } catch (error) {
    console.error('❌ خطا در دریافت کاربر:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      throw { success: false, message: 'کاربر پیدا نشد' };
    }
    throw error.response?.data || {
      success: false,
      message: 'خطا در دریافت اطلاعات کاربر'
    };
  }
};

export const getSuggestedUsers = async () => {
  try {
    console.log('📤 دریافت کاربران پیشنهادی');
    const response = await api.get('/users/suggestions');
    console.log(`✅ ${response.data.count} کاربر پیشنهادی دریافت شد`);
    return response.data;
  } catch (error) {
    console.error('❌ خطا در دریافت پیشنهادات:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در دریافت کاربران پیشنهادی'
    };
  }
};

export const getUserFollowers = async (userId, page = 1, limit = 20) => {
  try {
    console.log(`📤 دریافت دنبال‌کنندگان کاربر ${userId}`);
    const response = await api.get(`/users/${userId}`);
    if (response.data.success) {
      const followers = response.data.user.followers || [];
      const total = followers.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedFollowers = followers.slice(startIndex, endIndex);
      return {
        success: true,
        data: paginatedFollowers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    throw new Error('داده‌های کاربر نامعتبر است');
  } catch (error) {
    console.error('❌ خطا در دریافت دنبال‌کنندگان:', error);
    throw {
      success: false,
      message: 'خطا در دریافت دنبال‌کنندگان'
    };
  }
};

export const getUserFollowing = async (userId, page = 1, limit = 20) => {
  try {
    console.log(`📤 دریافت دنبال‌شده‌های کاربر ${userId}`);
    const response = await api.get(`/users/${userId}`);
    if (response.data.success) {
      const following = response.data.user.following || [];
      const total = following.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedFollowing = following.slice(startIndex, endIndex);
      return {
        success: true,
        data: paginatedFollowing,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    throw new Error('داده‌های کاربر نامعتبر است');
  } catch (error) {
    console.error('❌ خطا در دریافت دنبال‌شده‌ها:', error);
    throw {
      success: false,
      message: 'خطا در دریافت دنبال‌شده‌ها'
    };
  }
};

export const updateProfile = async (userData) => {
  try {
    console.log('📤 به‌روزرسانی پروفایل:', userData);
    const response = await api.put('/users/profile', userData);
    console.log('✅ پروفایل به‌روزرسانی شد');
    return response.data;
  } catch (error) {
    console.error('❌ خطا در به‌روزرسانی پروفایل:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در به‌روزرسانی پروفایل'
    };
  }
};

export const uploadAvatar = async (avatarFile) => {
  try {
    console.log('📤 آپلود آواتار:', avatarFile.name);
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    const response = await api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('✅ آواتار آپلود شد');
    return response.data;
  } catch (error) {
    console.error('❌ خطا در آپلود آواتار:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در آپلود آواتار'
    };
  }
};

export const getUserStats = async (userId) => {
  try {
    console.log(`📊 دریافت آمار کاربر ${userId}`);
    const response = await api.get(`/users/${userId}`);
    if (response.data.success) {
      const user = response.data.user;
      const stats = {
        followers: user.followerCount || 0,
        following: user.followingCount || 0,
        savedMovies: user.savedMoviesCount || user.savedMovies?.length || 0,
        favoriteMovies: user.favoriteMovies?.length || 0,
        activityScore: 0
      };
      return { success: true, stats };
    }
    throw new Error('داده‌های کاربر نامعتبر است');
  } catch (error) {
    console.error('❌ خطا در دریافت آمار کاربر:', error);
    throw {
      success: false,
      message: 'خطا در دریافت آمار کاربر'
    };
  }
};

export const checkFollowingStatus = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    if (response.data.success) {
      const targetUser = response.data.user;
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const currentUserId = currentUser.id || currentUser._id;
      
      const isFollowing = targetUser.followers?.some(
        (follower) => (follower.id || follower._id) === currentUserId
      ) || false;

      return {
        isFollowing,
        followerCount: targetUser.followerCount || targetUser.followers?.length || 0
      };
    }
    return { isFollowing: false, followerCount: 0 };
  } catch (error) {
    console.error('❌ خطا در بررسی وضعیت دنبال کردن:', error);
    return { isFollowing: false, followerCount: 0 };
  }
};

export const checkMovieSavedStatus = async (movieId) => {
  try {
    console.log(`🔍 بررسی وضعیت ذخیره فیلم ${movieId}`);
    const response = await api.get(`/users/check-saved/${movieId}`);
    return response.data;
  } catch (error) {
    try {
      const savedResponse = await getSavedMovies();
      const isSaved = savedResponse.savedMovies?.some(
        (item) => item.movie?._id === movieId || item.movie === movieId
      ) || false;
      return { success: true, isSaved };
    } catch (savedError) {
      console.error('❌ خطا در بررسی وضعیت ذخیره:', error);
      throw {
        success: false,
        message: 'خطا در بررسی وضعیت ذخیره فیلم'
      };
    }
  }
};

export const getAllUsers = async (params = {}) => {
  try {
    console.log('👥 دریافت لیست همه کاربران');
    const response = await api.get('/users/all', { params });
    console.log(`✅ ${response.data.users?.length || 0} کاربر دریافت شد`);
    return response.data;
  } catch (error) {
    console.error('❌ خطا در دریافت لیست کاربران:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در دریافت لیست کاربران'
    };
  }
};

export const deleteAccount = async (userId) => {
  try {
    console.log(`🗑️ درخواست حذف حساب کاربر ${userId}`);
    const response = await api.delete(`/users/${userId}`);
    console.log('✅ حساب کاربری حذف شد');
    return response.data;
  } catch (error) {
    console.error('❌ خطا در حذف حساب کاربری:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در حذف حساب کاربری'
    };
  }
};

// ======================
// 🔍 جستجوی کاربران (اضافه شده)
// ======================
export const searchUsers = async (query, page = 1, limit = 10) => {
  try {
    console.log(`🔍 جستجوی کاربران: "${query}"`);
    const response = await api.get('/users/search', {
      params: { q: query, page, limit }
    });
    console.log(`✅ ${response.data.users?.length || 0} نتیجه جستجو دریافت شد`);
    return response.data;
  } catch (error) {
    console.error('❌ خطا در جستجوی کاربران:', error.response?.data || error.message);
    throw error.response?.data || {
      success: false,
      message: 'خطا در جستجوی کاربران'
    };
  }
};

// ======================
// 🖼️ آپلود آواتار (با patch)
// ======================
export const updateUserAvatar = async (avatarFile) => {
  const formData = new FormData();
  formData.append('avatar', avatarFile);

  try {
    const response = await api.patch('/users/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000, // 30 ثانیه
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw { success: false, message: 'مدت زمان درخواست طولانی شد. لطفاً دوباره تلاش کنید.' };
    }
    if (error.message?.includes('ECONNRESET')) {
      throw { success: false, message: 'ارتباط با سرور قطع شد. لطفاً دوباره تلاش کنید.' };
    }
    throw error.response?.data || {
      success: false,
      message: 'خطا در آپلود تصویر'
    };
  }
};

export default {
  saveMovie,
  unsaveMovie,
  getSavedMovies,
  checkMovieSavedStatus,
  followUser,
  getUserById,
  getSuggestedUsers,
  getUserFollowers,
  getUserFollowing,
  updateProfile,
  uploadAvatar,
  getUserStats,
  checkFollowingStatus,
  getAllUsers,
  deleteAccount,
  searchUsers, // ✅ اضافه شد
  updateUserAvatar,
};