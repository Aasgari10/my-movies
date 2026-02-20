// src/hooks/useMovieForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { createMovie } from '@/services/movies';
import { CURRENT_YEAR } from '@/utils/constants';

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  year: CURRENT_YEAR,
  director: '',
  genre: '',
  rating: '',
};

export const useMovieForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = (imageFile) => {
    if (!formData.title.trim()) {
      setError('عنوان فیلم الزامی است');
      return false;
    }
    if (!formData.description.trim()) {
      setError('توضیحات الزامی است');
      return false;
    }
    if (formData.description.length < 10) {
      setError('توضیحات باید حداقل ۱۰ حرف باشد');
      return false;
    }
    if (!formData.year) {
      setError('سال انتشار الزامی است');
      return false;
    }
    if (!formData.director.trim()) {
      setError('نام کارگردان الزامی است');
      return false;
    }
    if (!imageFile) {
      setError('لطفاً یک تصویر برای فیلم انتخاب کنید');
      return false;
    }
    return true;
  };

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(interval);
  };

  const handleSubmit = async (imageFile) => {
    if (!validateForm(imageFile)) return;

    setIsLoading(true);
    setError('');
    const clearProgress = simulateProgress();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });
      formDataToSend.append('image', imageFile);

      const response = await createMovie(formDataToSend);
      
      clearProgress();
      setUploadProgress(100);

      setTimeout(() => {
        navigate(`/movies/${response.data?.id || response.data?._id}`);
      }, 2000);

      return response;
    } catch (err) {
      clearProgress();
      setUploadProgress(0);
      setError(err.message || 'خطا در ایجاد فیلم. لطفاً دوباره تلاش کنید');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    uploadProgress,
    handleInputChange,
    handleSubmit,
    resetForm: () => setFormData(INITIAL_FORM_STATE),
  };
};