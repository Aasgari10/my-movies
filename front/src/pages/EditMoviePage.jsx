import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMovieById, updateMovie } from '../services/movies';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Alert from '../components/common/Alert';
import FormInput from '../components/common/FormInput';
import FormSelect from '../components/common/FormSelect';
import FormTextarea from '../components/common/FormTextarea';
import ImageUploader from '../components/movie/ImageUploader';
import { FaSave, FaTimes, FaArrowRight } from 'react-icons/fa';
import { GENRES, YEARS } from '../constants/movie';

const EditMoviePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    director: '',
    genre: '',
    rating: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await getMovieById(id);

        if (response.success) {
          const movie = response.data;
          const creatorId = movie.creator?.id || movie.creator?._id;
          if (creatorId !== user.id && user.role !== 'admin') {
            alert('شما اجازه ویرایش این فیلم را ندارید');
            navigate('/movies');
            return;
          }

          setFormData({
            title: movie.title || '',
            description: movie.description || '',
            year: movie.year || new Date().getFullYear(),
            director: movie.director || '',
            genre: movie.genre || '',
            rating: movie.rating || ''
          });

          setCurrentImage(movie.image || '');
          setImagePreview(movie.image || '');
        } else {
          setError('فیلم یافت نشد');
        }
      } catch (err) {
        console.error('❌ Failed to fetch movie:', err);
        setError('خطا در دریافت اطلاعات فیلم');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id, user, navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  }, []);

  const handleImageChange = useCallback((file) => {
    setImageFile(file);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const validateForm = () => {
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
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('director', formData.director);
      formDataToSend.append('genre', formData.genre);
      if (formData.rating) formDataToSend.append('rating', formData.rating);
      if (imageFile) formDataToSend.append('image', imageFile);

      const response = await updateMovie(id, formDataToSend);

      if (response.success) {
        setSuccess('فیلم با موفقیت ویرایش شد!');
        setTimeout(() => navigate(`/movies/${id}`), 2000);
      } else {
        setError(response.message || 'خطا در ویرایش فیلم');
      }
    } catch (err) {
      console.error('❌ Update failed:', err);
      setError(err.message || 'خطا در ویرایش فیلم. لطفاً دوباره تلاش کنید');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white  rounded-b-3xl overflow-hidden ">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">ویرایش فیلم</h1>
          <p className="text-gray-200">اطلاعات فیلم را ویرایش کنید</p>
        </div>

        {/* Form */}
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-orange-500/30">
          <Alert type="error" message={error} />
          <Alert type="success" message={success} />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image upload section */}
            <ImageUploader
              imageFile={imageFile}
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              currentImage={currentImage}
            />

            {/* Movie info fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="عنوان فیلم"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="مثال: اینتراستلار"
                required
                disabled={isSubmitting}
                className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
                labelClassName="text-gray-200" // روشن‌تر کردن برچسب
              />

              <FormInput
                label="کارگردان"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                placeholder="مثال: کریستوفر نولان"
                required
                disabled={isSubmitting}
                className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
                labelClassName="text-gray-200"
              />

              <FormSelect
                label="سال انتشار"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                options={YEARS.map(y => ({ value: y, label: y }))}
                required
                disabled={isSubmitting}
                className="bg-[#374151] border-gray-600 text-white focus:ring-orange-500"
                labelClassName="text-gray-200"
              />

              <FormSelect
                label="ژانر"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                options={GENRES}
                disabled={isSubmitting}
                className="bg-[#374151] border-gray-600 text-white focus:ring-orange-500"
                labelClassName="text-gray-200"
              />
            </div>

            {/* Description */}
            <FormTextarea
              label="توضیحات و خاطره شما"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="خاطره‌ای که این فیلم برای شما ساخته است را شرح دهید..."
              maxLength={1000}
              required
              disabled={isSubmitting}
              className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
              labelClassName="text-gray-200"
            />

            {/* Rating slider */}
            <div>
              <label className="block text-gray-200 mb-2">امتیاز شما به فیلم (اختیاری)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="rating"
                  min="0"
                  max="10"
                  step="0.5"
                  value={formData.rating || 0}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  disabled={isSubmitting}
                />
                <span className="mr-4 min-w-[40px] font-bold text-white">
                  {formData.rating || 0}/10
                </span>
              </div>
            </div>

            {/* Action buttons with icons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    در حال ذخیره...
                  </span>
                ) : (
                  <>
                    <FaSave />
                    ذخیره تغییرات
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/movies/${id}`)}
                disabled={isSubmitting}
                className="px-8 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FaTimes />
                انصراف
              </button>

              <button
                type="button"
                onClick={() => navigate('/movies')}
                className="px-8 py-3 border border-red-700 text-red-200 rounded-lg hover:bg-red-900/30 transition flex items-center justify-center gap-2"
              >
                <FaArrowRight />
                لغو و بازگشت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMoviePage;