// src/components/common/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#171717]">
      <div className="text-center">
        <div className="relative">
          {/* حلقه ثابت (پس‌زمینه اسپینر) */}
          <div className="w-20 h-20 border-4 border-orange-500/30 rounded-full"></div>
          {/* حلقه متحرک (جلوی اسپینر) */}
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="mt-6 text-white">در حال بارگذاری اطلاعات...</p>
        <p className="text-sm text-gray-400 mt-2">لطفاً کمی صبر کنید</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;