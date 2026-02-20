import { useState, useRef, useEffect } from 'react';
import user from "@/assets/user.png"
import {
  FaCamera,
  FaSpinner,
  FaCheckCircle,
  FaCalendarAlt,
  FaCrown,
  FaInfoCircle
} from 'react-icons/fa';
import { updateUserAvatar } from '@/services/users';
import Alert from '@/components/common/Alert';
import InfoItem from '@/components/profile/InfoItem';

const ProfileTab = ({ profileUser, joinedDate, isOwnProfile, onAvatarUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // برای مخفی کردن خودکار پیام موفقیت بعد از ۳ ثانیه
  const successTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('لطفاً یک فایل تصویری انتخاب کنید');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('حجم فایل نباید بیشتر از ۵ مگابایت باشد');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await updateUserAvatar(file);
      if (response.success) {
        setSuccess(true);
        if (onAvatarUpdate) onAvatarUpdate(response.user);

        // مخفی کردن پیام موفقیت بعد از ۳ ثانیه
        successTimeoutRef.current = setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(response.message || 'خطا در آپلود تصویر');
      }
    } catch (err) {
      console.error('❌ خطای آپلود:', err);
      setError(err.message || 'خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {isOwnProfile && (
        <div className="flex justify-start">
          <div className="relative">
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={uploading}
            />
            <label
              htmlFor="avatar-upload"
              className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg flex items-center gap-3 ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? (
                <>
                  <FaSpinner className="animate-spin text-lg" />
                  <span>در حال آپلود...</span>
                </>
              ) : (
                <>
                  <FaCamera className="text-lg" />
                  <span>تغییر عکس پروفایل</span>
                </>
              )}
            </label>
          </div>
        </div>
      )}

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-100 p-4 rounded-xl flex items-center gap-3">
          <FaCheckCircle className="text-green-400 text-xl" />
          <span>✅ عکس با موفقیت تغییر کرد.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem icon={FaCalendarAlt} label="تاریخ عضویت" value={joinedDate} />
        <InfoItem
          icon={FaCrown}
          label="نقش"
          value={profileUser.role === 'admin' ? 'مدیر' : 'کاربر'}
        />
        {profileUser.bio && (
          <div className="md:col-span-2">
            <InfoItem icon={FaInfoCircle} label="درباره" value={profileUser.bio} isMultiLine />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;