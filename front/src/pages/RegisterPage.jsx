import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/common/Alert';
import FormInput from '../components/common/FormInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'نام الزامی است';
    if (!formData.email.trim()) return 'ایمیل الزامی است';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'ایمیل معتبر نیست';
    if (!formData.password) return 'رمز عبور الزامی است';
    if (formData.password.length < 6) return 'رمز عبور باید حداقل ۶ حرف باشد';
    if (formData.password !== formData.confirmPassword) return 'رمز عبور و تکرار آن مطابقت ندارند';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setSuccess('حساب کاربری با موفقیت ایجاد شد!');
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      setError(err.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" rounded-b-3xl overflow-hidden min-h-screen bg-[#171717] text-white flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">ایجاد حساب کاربری</h1>
          <p className="text-gray-300">همین حالا به جمع ما بپیوندید</p>
        </div>

        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-orange-500/30">
          <Alert type="error" message={error} />
          <Alert type="success" message={success} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="نام کامل"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="محمد احمدی"
              required
              disabled={isLoading}
              className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
              labelClassName="text-gray-200"
            />

            <FormInput
              label="ایمیل"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              disabled={isLoading}
              className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
              labelClassName="text-gray-200"
            />

            <div>
              <label className="block text-gray-200 mb-2" >رمز عبور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#374151] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="حداقل ۶ کاراکتر"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <FormInput
              label="تکرار رمز عبور"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              disabled={isLoading}
              className="bg-[#374151] border-gray-600 text-white placeholder-gray-400 focus:ring-orange-500"
              labelClassName="text-gray-200"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 bg-[#374151] border-gray-600 text-orange-500 rounded focus:ring-orange-500"
                required
                disabled={isLoading}
              />
              <label htmlFor="terms" className="mr-2 text-gray-300 text-sm">
                با{' '}
                <Link to="/terms" className="text-orange-400 hover:text-orange-300 transition">
                  قوانین و مقررات
                </Link>{' '}
                موافقم
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="mr-2">در حال ایجاد حساب...</span>
                </span>
              ) : (
                'ایجاد حساب کاربری'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-center text-gray-300">
              قبلاً حساب دارید؟{' '}
              <Link to="/login" className="text-orange-400 hover:text-orange-300 font-bold transition">
                وارد شوید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;