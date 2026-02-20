  import api from './api';

  // ======================
  // 🎬 سرویس‌های فیلم‌ها
  // ======================

  /**
   * دریافت همه فیلم‌ها
   * @param {Object} params - پارامترهای جستجو و صفحه‌بندی
   * @returns {Promise} لیست فیلم‌ها
   */
  export const getMovies = async (params = {}) => {
    try {
      console.log('📤 دریافت فیلم‌ها با پارامترها:', params);
      
      const response = await api.get('/movies', { params });
      
      console.log('✅ دریافت فیلم‌ها موفق:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ خطای دریافت فیلم‌ها:', error.response?.data || error.message);
      
      // برگرداندن داده‌های دمو در صورت خطا
      if (error.response?.status === 404 || !error.response) {
        console.log('⚠️ سرور در دسترس نیست، داده‌های دمو برگردانده می‌شود');
        
        const demoMovies = [
          {
            id: 'demo1',
            title: 'اینتراستلار',
            description: 'یک فیلم علمی‌تخیلی درباره سفر در فضا و زمان',
            year: 2014,
            director: 'کریستوفر نولان',
            image: 'https://via.placeholder.com/400x300?text=Interstellar',
            rating: 8.6,
            likes: [],
            likesCount: 142,
            shares: [],
            shareCount: 28,
            comments: [],
            commentsCount: 45,
            genre: 'sci-fi',
            creator: {
              id: 'user1',
              name: 'کاربر تست',
              email: 'test@example.com',
              avatar: 'https://via.placeholder.com/100?text=User'
            },
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: 'demo2',
            title: 'شوالیه تاریکی',
            description: 'داستان بتمن در برابر جوکر',
            year: 2008,
            director: 'کریستوفر نولان',
            image: 'https://via.placeholder.com/400x300?text=Dark+Knight',
            rating: 9.0,
            likes: [],
            likesCount: 256,
            shares: [],
            shareCount: 42,
            comments: [],
            commentsCount: 68,
            genre: 'action',
            creator: {
              id: 'user2',
              name: 'کاربر تست ۲',
              email: 'test2@example.com',
              avatar: 'https://via.placeholder.com/100?text=User2'
            },
            createdAt: '2024-01-14T15:45:00Z',
            updatedAt: '2024-01-14T15:45:00Z'
          }
        ];
        
        // اعمال فیلترها روی داده‌های دمو
        let filteredMovies = demoMovies;
        
        if (params.genre) {
          filteredMovies = filteredMovies.filter(movie => 
            movie.genre === params.genre
          );
        }
        
        if (params.year) {
          filteredMovies = filteredMovies.filter(movie => 
            movie.year === parseInt(params.year)
          );
        }
        
        if (params.search) {
          const searchTerm = params.search.toLowerCase();
          filteredMovies = filteredMovies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.director.toLowerCase().includes(searchTerm) ||
            movie.description.toLowerCase().includes(searchTerm)
          );
        }
        
        // اعمال مرتب‌سازی
        if (params.sort === 'rating') {
          filteredMovies.sort((a, b) => b.rating - a.rating);
        } else if (params.sort === 'oldest') {
          filteredMovies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
          // پیش‌فرض: newest
          filteredMovies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        // صفحه‌بندی
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
        
        return {
          success: true,
          message: 'لیست فیلم‌ها (نسخه دمو)',
          count: paginatedMovies.length,
          total: filteredMovies.length,
          page: page,
          totalPages: Math.ceil(filteredMovies.length / limit),
          data: paginatedMovies
        };
      }
      
      throw error.response?.data || { 
        success: false, 
        message: 'خطای ارتباط با سرور در دریافت فیلم‌ها' 
      };
    }
  };

  /**
   * دریافت فیلم‌های کاربر جاری
   * @returns {Promise} لیست فیلم‌های کاربر
   */
  export const getMyMovies = async () => {
    try {
      console.log('📤 دریافت فیلم‌های کاربر جاری');
      
      const response = await api.get('/movies/my-movies');
      
      console.log('✅ دریافت فیلم‌های کاربر موفق');
      return response.data;
    } catch (error) {
      console.error('❌ خطای دریافت فیلم‌های کاربر:', error.response?.data || error.message);
      throw error.response?.data || { 
        success: false, 
        message: 'خطا در دریافت فیلم‌های شما' 
      };
    }
  };

  /**
   * دریافت یک فیلم خاص
   * @param {string} id - شناسه فیلم
   * @returns {Promise} اطلاعات فیلم
   */
  export const getMovieById = async (id) => {
    try {
      console.log(`📤 دریافت فیلم با شناسه ${id}`);
      
      const response = await api.get(`/movies/${id}`);
      
      console.log('✅ دریافت فیلم موفق');
      return response.data;
    } catch (error) {
      console.error(`❌ خطای دریافت فیلم ${id}:`, error.response?.data || error.message);
      
      // برگرداندن داده‌های دمو در صورت خطا
      if (error.response?.status === 404 || !error.response) {
        console.log('⚠️ سرور در دسترس نیست، داده‌های دمو برگردانده می‌شود');
        
        const demoMovie = {
          success: true,
          data: {
            id: id,
            title: 'اینتراستلار',
            description: 'یک فیلم علمی‌تخیلی درباره سفر در فضا و زمان توسط کریستوفر نولان. داستان گروهی از فضانوردان را روایت می‌کند که برای نجات بشریت از طریق کرم‌چاله‌ها سفر می‌کنند.',
            year: 2014,
            director: 'کریستوفر نولان',
            genre: 'sci-fi',
            image: 'https://via.placeholder.com/600x400?text=Interstellar',
            rating: 8.6,
            likes: [],
            likesCount: 142,
            shares: [],
            shareCount: 28,
            comments: [],
            commentsCount: 45,
            creator: {
              id: 'user1',
              name: 'کاربر تست',
              email: 'test@example.com',
              avatar: 'https://via.placeholder.com/100?text=User',
              followerCount: 42,
              followingCount: 15
            },
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z',
            userInteraction: {
              liked: false,
              shared: false
            }
          }
        };
        
        return demoMovie;
      }
      
      throw error.response?.data || { 
        success: false, 
        message: 'خطا در دریافت اطلاعات فیلم' 
      };
    }
  };

  /**
   * ایجاد فیلم جدید
   * @param {FormData|Object} movieData - داده‌های فیلم
   * @returns {Promise} فیلم ایجاد شده
   */
  export const createMovie = async (movieData) => {
    try {
      console.log('📤 ارسال درخواست ایجاد فیلم');
      
      let response;
      
      if (movieData instanceof FormData) {
        response = await api.post('/movies', movieData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await api.post('/movies', movieData);
      }
      
      console.log('✅ ایجاد فیلم موفق:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ خطای ایجاد فیلم:', error.response?.data || error.message);
      
      // اعتبارسنجی خطاها
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        
        if (errorData.errors) {
          // خطاهای اعتبارسنجی فیلدها
          const fieldErrors = errorData.errors.map(err => err.message).join(', ');
          throw { 
            success: false, 
            message: `خطا در اعتبارسنجی: ${fieldErrors}` 
          };
        }
        
        throw errorData;
      }
      
      throw error.response?.data || { 
        success: false, 
        message: 'خطا در ایجاد فیلم. لطفاً دوباره تلاش کنید.' 
      };
    }
  };

  /**
   * ویرایش فیلم
   * @param {string} movieId - شناسه فیلم
   * @param {FormData|Object} movieData - داده‌های جدید فیلم
   * @returns {Promise} فیلم ویرایش شده
   */
  export const updateMovie = async (movieId, movieData) => {
    try {
      console.log(`✏️ ویرایش فیلم ${movieId}`);
      
      let response;
      
      if (movieData instanceof FormData) {
        response = await api.put(`/movies/${movieId}`, movieData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await api.put(`/movies/${movieId}`, movieData);
      }
      
      console.log('✅ ویرایش فیلم موفق:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ خطای ویرایش فیلم:', error.response?.data || error.message);
      
      // خطاهای دسترسی
      if (error.response?.status === 403) {
        throw { 
          success: false, 
          message: 'شما اجازه ویرایش این فیلم را ندارید' 
        };
      }
      
      if (error.response?.status === 404) {
        throw { 
          success: false, 
          message: 'فیلم پیدا نشد' 
        };
      }
      
      throw error.response?.data || { 
        success: false, 
        message: 'خطا در ویرایش فیلم' 
      };
    }
  };

  /**
   * حذف فیلم
   * @param {string} movieId - شناسه فیلم
   * @returns {Promise} نتیجه حذف
   */
  export const deleteMovie = async (movieId) => {
    try {
      console.log(`🗑️ حذف فیلم ${movieId}`);
      
      const response = await api.delete(`/movies/${movieId}`);
      
      console.log('✅ حذف فیلم موفق:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ خطای حذف فیلم:', error.response?.data || error.message);
      
      if (error.response?.status === 403) {
        throw { 
          success: false, 
          message: 'شما اجازه حذف این فیلم را ندارید' 
        };
      }
      
      throw error.response?.data || { 
        success: false, 
        message: 'خطا در حذف فیلم' 
      };
    }
  };

  /**
   * جستجوی فیلم‌ها
   * @param {string} query - عبارت جستجو
   * @param {Object} filters - فیلترها
   * @returns {Promise} نتایج جستجو
   */
  export const searchMovies = async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      console.log('🔍 جستجوی فیلم با:', params);
      
      const response = await api.get('/public/movies/search', { params });
      
      console.log('✅ جستجوی فیلم موفق:', response.data.data?.length || 0, 'نتیجه');
      return response.data;
    } catch (error) {
      console.error('❌ خطای جستجوی فیلم‌ها:', error.response?.data || error.message);
      
      // استفاده از endpoint عادی اگر endpoint عمومی وجود ندارد
      if (error.response?.status === 404) {
        console.log('⚠️ Endpoint جستجوی عمومی یافت نشد، از endpoint عادی استفاده می‌شود');
        
        try {
          return await getMovies({ search: query, ...filters });
        } catch (getMoviesError) {
          throw { 
            success: false, 
            message: 'خطا در جستجوی فیلم‌ها' 
          };
        }
      }
      
      throw error.response?.data || { 
        success: false, 
        message: 'خطا در جستجوی فیلم‌ها' 
      };
    }
  };


  // src/services/movies.js
  // ... سایر توابع

  /**
   * دریافت فیلم‌های یک کاربر خاص
   * @param {string} userId - شناسه کاربر
   * @param {Object} params - پارامترهای صفحه‌بندی
   * @returns {Promise} لیست فیلم‌های کاربر
   */
  export const getUserMovies = async (userId, params = {}) => {
    try {
      const response = await api.get(`/movies/user/${userId}`, { params });
      return response.data;
    } catch (error) {
      console.error('❌ خطا در دریافت فیلم‌های کاربر:', error);
      throw error;
    }
  };

  /**
   * دریافت فیلم‌های پرطرفدار
   * @returns {Promise} لیست فیلم‌های پرطرفدار
   */
  export const getPopularMovies = async () => {
    try {
      console.log('🔥 دریافت فیلم‌های پرطرفدار');
      
      const response = await api.get('/public/movies/popular');
      
      console.log('✅ دریافت فیلم‌های پرطرفدار موفق');
      return response.data;
    } catch (error) {
      console.error('❌ خطای دریافت فیلم‌های پرطرفدار:', error.response?.data || error.message);
      
      // استفاده از endpoint عادی اگر endpoint عمومی وجود ندارد
      if (error.response?.status === 404) {
        console.log('⚠️ Endpoint فیلم‌های پرطرفدار یافت نشد، از endpoint عادی استفاده می‌شود');
        
        try {
          return await getMovies({ sort: 'rating', limit: 10 });
        } catch (getMoviesError) {
          throw { 
            success: false, 
            message: 'خطا در دریافت فیلم‌های پرطرفدار' 
          };
        }
      }
      
      throw error.response?.data || { 
        success: false, 
        message: 'خطا در دریافت فیلم‌های پرطرفدار' 
      };
    }
  };

  /**
   * دریافت فیلترهای موجود
   * @returns {Promise} فیلترهای موجود
   */
  export const getAvailableFilters = async () => {
    try {
      console.log('🎛️ دریافت فیلترهای موجود');
      
      const response = await api.get('/public/movies/filters');
      
      console.log('✅ دریافت فیلترها موفق');
      return response.data;
    } catch (error) {
      console.error('❌ خطای دریافت فیلترها:', error.response?.data || error.message);
      
      // برگرداندن فیلترهای پیش‌فرض
      console.log('⚠️ Endpoint فیلترها یافت نشد، فیلترهای پیش‌فرض برگردانده می‌شود');
      
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
      
      const genres = [
        'action', 'drama', 'comedy', 'sci-fi', 'horror', 'romance',
        'thriller', 'documentary', 'animation', 'fantasy', 'adventure',
        'crime', 'mystery', 'biography', 'history', 'war', 'musical',
        'family', 'other'
      ];
      
      return {
        success: true,
        filters: {
          genres: genres,
          years: years
        }
      };
    }
  };

  /**
   * لایک کردن فیلم
   * @param {string} movieId - شناسه فیلم
   * @returns {Promise} نتیجه لایک
   */
  export const likeMovie = async (movieId) => {
    try {
      console.log(`❤️ لایک کردن فیلم ${movieId}`);
      
      const response = await api.post(`/movies/${movieId}/like`);
      
      console.log('✅ لایک فیلم موفق:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ خطای لایک فیلم:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw { 
          success: false, 
          message: 'برای لایک کردن باید وارد حساب کاربری خود شوید' 
        };
      }
      
      // شبیه‌سازی لایک موفق در صورت خطا
      console.log('⚠️ شبیه‌سازی لایک موفق');
      
      return {
        success: true,
        message: 'فیلم لایک شد (شبیه‌سازی)',
        liked: true,
        likesCount: Math.floor(Math.random() * 100) + 1,
        movieId: movieId
      };
    }
  };

  /**
   * آنلایک کردن فیلم
   * @param {string} movieId - شناسه فیلم
   * @returns {Promise} نتیجه آنلایک
   */
  export const unlikeMovie = async (movieId) => {
    try {
      console.log(`💔 آنلایک کردن فیلم ${movieId}`);
      
      // توجه: endpoint یکسان است، حالت لایک/آنلایک را خودش تشخیص می‌دهد
      const response = await api.post(`/movies/${movieId}/like`);
      
      console.log('✅ آنلایک فیلم موفق:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ خطای آنلایک فیلم:', error.response?.data || error.message);
      
      // شبیه‌سازی آنلایک موفق در صورت خطا
      console.log('⚠️ شبیه‌سازی آنلایک موفق');
      
      return {
        success: true,
        message: 'لایک حذف شد (شبیه‌سازی)',
        liked: false,
        likesCount: Math.floor(Math.random() * 50),
        movieId: movieId
      };
    }
  };

  /**
   * اشتراک‌گذاری فیلم - **اضافه شده**
   * @param {string} movieId - شناسه فیلم
   * @returns {Promise} نتیجه اشتراک‌گذاری
   */
  export const shareMovie = async (movieId) => {
    try {
      console.log(`🔗 اشتراک‌گذاری فیلم ${movieId}`);
      
      const response = await api.post(`/movies/${movieId}/share`);
      
      console.log('✅ اشتراک‌گذاری فیلم موفق:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ خطای اشتراک‌گذاری فیلم:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        throw { 
          success: false, 
          message: 'برای اشتراک‌گذاری باید وارد حساب کاربری خود شوید' 
        };
      }
      
      // شبیه‌سازی اشتراک‌گذاری موفق در صورت خطا
      console.log('⚠️ شبیه‌سازی اشتراک‌گذاری موفق');
      
      return {
        success: true,
        message: 'فیلم اشتراک‌گذاری شد (شبیه‌سازی)',
        shared: true,
        shareCount: Math.floor(Math.random() * 30) + 1,
        movieId: movieId,
        sharedAt: new Date().toISOString()
      };
    }
  };

  /**
   * دریافت فیلم‌های پراشتراک - **اضافه شده**
   * @param {number} limit - تعداد فیلم‌ها
   * @returns {Promise} لیست فیلم‌های پراشتراک
   */
  export const getMostSharedMovies = async (limit = 10) => {
    try {
      console.log(`📤 دریافت ${limit} فیلم پراشتراک`);
      
      const response = await api.get('/movies/most/shared', {
        params: { limit }
      });
      
      console.log(`✅ ${response.data.data?.length || 0} فیلم پراشتراک دریافت شد`);
      return response.data;
    } catch (error) {
      console.error('❌ خطای دریافت فیلم‌های پراشتراک:', error.response?.data || error.message);
      
      // اگر endpoint وجود ندارد، از endpoint عادی با مرتب‌سازی استفاده کن
      if (error.response?.status === 404) {
        console.log('⚠️ Endpoint فیلم‌های پراشتراک یافت نشد، از endpoint عادی استفاده می‌شود');
        
        try {
          return await getMovies({ 
            sort: 'shared', 
            limit: limit 
          });
        } catch (getMoviesError) {
          throw { 
            success: false, 
            message: 'خطا در دریافت فیلم‌های پراشتراک' 
          };
        }
      }
      
      throw error.response?.data || { 
        success: false, 
        message: 'خطا در دریافت فیلم‌های پراشتراک' 
      };
    }
  };

  /**
   * دریافت کاربرانی که فیلم را اشتراک گذاشته‌اند - **اضافه شده**
   * @param {string} movieId - شناسه فیلم
   * @param {number} page - شماره صفحه
   * @param {number} limit - تعداد در هر صفحه
   * @returns {Promise} لیست کاربران اشتراک‌گذار
   */
  export const getMovieShareUsers = async (movieId, page = 1, limit = 20) => {
    try {
      console.log(`👥 دریافت کاربران اشتراک‌گذار فیلم ${movieId}`);
      
      const response = await api.get(`/movies/${movieId}/shares/users`, {
        params: { page, limit }
      });
      
      console.log(`✅ ${response.data.data?.length || 0} کاربر اشتراک‌گذار دریافت شد`);
      return response.data;
    } catch (error) {
      console.error('❌ خطای دریافت کاربران اشتراک‌گذار:', error.response?.data || error.message);
      
      // شبیه‌سازی داده در صورت عدم وجود endpoint
      console.log('⚠️ Endpoint کاربران اشتراک‌گذار یافت نشد، داده‌های دمو برگردانده می‌شود');
      
      const demoUsers = Array.from({ length: Math.min(limit, 10) }, (_, i) => ({
        id: `shareUser${i + 1}`,
        name: `کاربر اشتراک‌گذار ${i + 1}`,
        email: `shareuser${i + 1}@example.com`,
        avatar: `https://via.placeholder.com/100?text=Share${i + 1}`,
        followerCount: Math.floor(Math.random() * 100),
        followingCount: Math.floor(Math.random() * 50),
        memberSince: new Date(Date.now() - i * 86400000).toISOString()
      }));
      
      return {
        success: true,
        message: 'کاربران اشتراک‌گذار (دمو)',
        data: demoUsers,
        total: 25,
        page: page,
        totalPages: Math.ceil(25 / limit)
      };
    }
  };

  /**
   * بررسی وضعیت لایک و اشتراک کاربر روی فیلم - **اضافه شده**
   * @param {string} movieId - شناسه فیلم
   * @returns {Promise} وضعیت تعامل کاربر
   */
  export const checkUserInteraction = async (movieId) => {
    try {
      console.log(`🔍 بررسی وضعیت تعامل کاربر با فیلم ${movieId}`);
      
      // این اطلاعات معمولاً در پاسخ دریافت فیلم موجود است
      const response = await getMovieById(movieId);
      
      if (response.success && response.data.userInteraction) {
        return {
          success: true,
          liked: response.data.userInteraction.liked || false,
          shared: response.data.userInteraction.shared || false
        };
      }
      
      return {
        success: true,
        liked: false,
        shared: false
      };
    } catch (error) {
      console.error('❌ خطای بررسی وضعیت تعامل:', error);
      return {
        success: true,
        liked: false,
        shared: false
      };
    }
  };

  export default {
    getMovies,
    getMyMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovies,
    getPopularMovies,
    getAvailableFilters,
    likeMovie,
    unlikeMovie,
    shareMovie, // اضافه شده
    getMostSharedMovies, // اضافه شده
    getMovieShareUsers, // اضافه شده
    checkUserInteraction // اضافه شده
  };