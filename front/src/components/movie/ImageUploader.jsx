// ImageUploader.jsx
import React, { useRef } from 'react';
import { FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ImageUploader = ({ imageFile, imagePreview, onImageChange, currentImage }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Only image files (JPG, PNG, GIF, WebP) are allowed.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must not exceed 10MB.');
      return;
    }

    onImageChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-200 font-bold mb-2">تصویر فیلم</label>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* قسمت کلیک‌پذیر عکس */}
          <div
            onClick={handleClick}
            className="relative cursor-pointer inline-block"
          >
            {imagePreview || currentImage ? (
              <img
                src={imagePreview || currentImage}
                alt="Movie"
                className="w-48 h-48 object-cover rounded-lg border border-gray-600"
              />
            ) : (
              <div className="w-48 h-48 bg-[#374151] rounded-lg border border-gray-600 flex items-center justify-center text-gray-400">
                بدون تصویر
              </div>
            )}
          </div>

          {imageFile && (
            <p className="text-sm text-gray-400 mt-2">تصویر جدید انتخاب شد</p>
          )}
          {!imageFile && currentImage && (
            <p className="text-sm text-gray-400 mt-2">برای تغییر روی عکس کلیک کنید</p>
          )}
        </div>

        <div className="md:w-1/2">
          <div className="bg-[#2A2A2A] rounded-lg p-6 border border-gray-700">
            <h3 className="font-bold mb-4 text-gray-200 flex items-center gap-2">
              <FaInfoCircle className="text-orange-400" />
              راهنمای تصویر
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                روی عکس کلیک کنید تا تصویر جدیدی آپلود کنید
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                تصویر با کیفیت بالا تأثیر بیشتری دارد
              </li>
              <li className="flex items-center gap-2">
                <FaTimesCircle className="text-red-500" />
                از تصاویر غیر مرتبط استفاده نکنید
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;