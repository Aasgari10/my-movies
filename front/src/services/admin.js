import api from './api';

/**
 * پردازش خطاهای API
 * @param {Error} error - خطای دریافتی
 * @returns {Object} - آبجکت خطای یکسان‌شده
 */
const handleError = (error) => {
  if (error.response?.data) {
    return error.response.data;
  }
  return {
    success: false,
    message: 'خطا در برقراری ارتباط با سرور'
  };
};

// ======================
// 📊 آمار سیستم
// ======================

/**
 * دریافت آمار کلی سیستم
 * @returns {Promise<{success: boolean, stats: object}>}
 */
export const getAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// 👥 مدیریت کاربران
// ======================

/**
 * دریافت لیست همه کاربران (با صفحه‌بندی و جستجو)
 * @param {Object} params - { page, limit, search, role }
 * @returns {Promise<{success: boolean, users: array, total: number}>}
 */
export const getUsers = async (params = {}) => {
  try {
    const response = await api.get('/admin/users', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * دریافت اطلاعات یک کاربر خاص
 * @param {string} userId
 * @returns {Promise<{success: boolean, user: object}>}
 */
export const getUser = async (userId) => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * حذف کاربر
 * @param {string} userId
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * تغییر نقش کاربر
 * @param {string} userId
 * @param {'user'|'admin'} role
 * @returns {Promise<{success: boolean, user: object}>}
 */
export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * حذف دسته‌ای کاربران
 * @param {string[]} userIds
 * @returns {Promise<{success: boolean, deletedCount: number}>}
 */
export const deleteMultipleUsers = async (userIds) => {
  try {
    const response = await api.delete('/admin/users', { data: { userIds } });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// 🎬 مدیریت فیلم‌ها
// ======================

/**
 * دریافت لیست فیلم‌ها (ویژه ادمین)
 * @param {Object} params - { page, limit, search, genre, year }
 * @returns {Promise<{success: boolean, movies: array, total: number}>}
 */
export const getMovies = async (params = {}) => {
  try {
    const response = await api.get('/admin/movies', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * حذف فیلم (ادمین می‌تواند هر فیلمی را حذف کند)
 * @param {string} movieId
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const deleteMovie = async (movieId) => {
  try {
    const response = await api.delete(`/admin/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * حذف دسته‌ای فیلم‌ها
 * @param {string[]} movieIds
 * @returns {Promise<{success: boolean, deletedCount: number}>}
 */
export const deleteMultipleMovies = async (movieIds) => {
  try {
    const response = await api.delete('/admin/movies', { data: { movieIds } });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// 💬 مدیریت نظرات (ادمین)
// ======================

/**
 * دریافت لیست نظرات (با فیلتر وضعیت تأیید)
 * @param {Object} params - { page, limit, isApproved, movieId }
 * @returns {Promise<{success: boolean, comments: array, total: number}>}
 */
export const getComments = async (params = {}) => {
  try {
    const response = await api.get('/admin/comments', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * تأیید نظر
 * @param {string} commentId
 * @returns {Promise<{success: boolean, comment: object}>}
 */
export const approveComment = async (commentId) => {
  try {
    const response = await api.patch(`/admin/comments/${commentId}/approve`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * حذف نظر
 * @param {string} commentId
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/admin/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ======================
// 🧪 تست دسترسی ادمین
// ======================

/**
 * تست دسترسی ادمین
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const testAdminAccess = async () => {
  try {
    const response = await api.get('/admin/test');
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw {
        success: false,
        message: 'دسترسی غیرمجاز. شما ادمین نیستید.'
      };
    }
    throw handleError(error);
  }
};

// ======================
// 📈 گزارش فعالیت سیستم
// ======================

/**
 * دریافت گزارش فعالیت سیستم
 * @param {Object} params - { from, to, type }
 * @returns {Promise<{success: boolean, report: object}>}
 */
export const getActivityReport = async (params = {}) => {
  try {
    const response = await api.get('/admin/reports/activity', { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};