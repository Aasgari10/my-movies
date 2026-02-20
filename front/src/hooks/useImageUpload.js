import { useState, useRef } from 'react';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '@/utils/constants';

export const useImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateImage = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError('فقط فایل‌های تصویری (JPG, PNG, GIF, WebP) مجاز هستند');
      return false;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError('حجم فایل نباید بیشتر از ۱۰ مگابایت باشد');
      return false;
    }
    return true;
  };

  // تابع برای دریافت مستقیم فایل (مناسب برای ImageUploader)
  const setImage = (file) => {
    if (!file) return;
    if (!validateImage(file)) return;
    setImageFile(file);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // تابع سازگار با رویداد (برای input type file)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const resetImage = () => {
    setImageFile(null);
    setImagePreview('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return {
    imageFile,
    imagePreview,
    imageError: error,
    fileInputRef,
    handleImageChange,  // برای استفاده با <input onChange={handleImageChange}>
    setImage,           // برای استفاده مستقیم با فایل
    triggerFileInput,
    resetImage,
  };
};