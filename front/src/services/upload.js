// src/services/upload.js
import api from './api';

// آپلود تصویر به Cloudinary
export const uploadImage = async (file) => {
  try {
    console.log('📤 شروع آپلود تصویر:', file.name);
    
    const formData = new FormData();
    formData.append('image', file);
    
    // تست آپلود (از route تستی که در بک‌اند دارید)
    const response = await api.post('/movies/upload-test', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('✅ آپلود موفق:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ خطای آپلود تصویر:', error);
    throw error;
  }
};

// حذف تصویر از Cloudinary
export const deleteImage = async (publicId) => {
  try {
    // توجه: این نیاز به API اختصاصی در بک‌اند دارد
    const response = await api.delete(`/upload/${publicId}`);
    return response.data;
  } catch (error) {
    console.error('❌ خطای حذف تصویر:', error);
    throw error;
  }
};