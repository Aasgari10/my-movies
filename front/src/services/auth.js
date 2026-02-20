import api from './api';

// ثبت‌نام کاربر جدید
export const register = async (userData) => {
  try {
    console.log('📤 ارسال درخواست ثبت‌نام:', userData);
    
    const response = await api.post('/auth/register', userData);
    
    console.log('✅ پاسخ ثبت‌نام:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ خطای ثبت‌نام:', error.response?.data || error.message);
    throw error.response?.data || { message: 'خطای ارتباط با سرور' };
  }
};

// ورود کاربر
export const login = async (credentials) => {
  try {
    console.log('📤 ارسال درخواست ورود:', { ...credentials, password: '***' });
    
    const response = await api.post('/auth/login', credentials);
    
    console.log('✅ پاسخ ورود:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ خطای ورود:', error.response?.data || error.message);
    throw error.response?.data || { message: 'خطای ارتباط با سرور' };
  }
};

// دریافت اطلاعات کاربر جاری
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('❌ خطای دریافت اطلاعات کاربر:', error);
    throw error;
  }
};

// خروج کاربر
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('✅ کاربر با موفقیت خارج شد');
};

// بررسی وضعیت لاگین
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('🔍 بررسی احراز هویت:', !!token);
  return !!token;
};

// دریافت توکن
export const getToken = () => {
  return localStorage.getItem('token');
};

// دریافت اطلاعات کاربر
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};