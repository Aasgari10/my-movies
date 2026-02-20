// ShareButton.jsx
import { useState, useEffect } from 'react';
import { shareMovie } from '../services/movies';
import { useAuth } from '../context/AuthContext';
import { FaShareAlt } from 'react-icons/fa';

const ShareButton = ({
  movieId,
  movieTitle,
  initialShareCount = 0,
  initialShared = false,
  size = 'md',
  onShareChange
}) => {
  const { user } = useAuth();
  const [shareCount, setShareCount] = useState(initialShareCount);
  const [isShared, setIsShared] = useState(initialShared);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShareCount(initialShareCount);
    setIsShared(initialShared);
  }, [initialShareCount, initialShared]);

  const handleShare = async () => {
    if (!user) {
      alert('برای اشتراک‌گذاری باید وارد شوید');
      return;
    }

    setLoading(true);
    try {
      // اگر قبلاً اشتراک گذاشته نشده، درخواست به سرور
      let result;
      if (!isShared) {
        result = await shareMovie(movieId);
        setIsShared(true);
        setShareCount(result.shareCount);
        onShareChange?.(true, result.shareCount);
      } else {
        // اگر قبلاً اشتراک گذاشته، فقط عملیات اشتراک اجتماعی انجام می‌شود
        result = { shareCount };
      }

      // اشتراک‌گذاری در شبکه‌های اجتماعی
      const shareUrl = `${window.location.origin}/movies/${movieId}`;
      const shareText = `فیلم "${movieTitle}" را در فیلم خاطرات ببینید!`;

      if (navigator.share) {
        await navigator.share({
          title: movieTitle,
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('لینک فیلم در حافظه کپی شد!');
      }
    } catch (error) {
      console.error('خطا:', error);
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        disabled={loading || !user}
        className={`
          ${sizeClasses[size]} rounded-lg font-medium transition-all duration-200
          bg-[#374151] text-white hover:bg-[#4B5563]
          ${!user ? 'opacity-70 cursor-not-allowed' : ''}
          flex items-center justify-center gap-2
        `}
        title={!user ? 'برای اشتراک‌گذاری وارد شوید' : ''}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>...</span>
          </span>
        ) : (
          <>
            <FaShareAlt className="text-lg" />
            <span>اشتراک</span>
          </>
        )}
      </button>
      {shareCount > 0 && (
        <span className="text-sm text-gray-400">
          {shareCount.toLocaleString('fa-IR')}
        </span>
      )}
    </div>
  );
};

export default ShareButton;