// src/pages/AboutPage.jsx
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import { SiVite, SiTailwindcss, SiExpress, SiMongodb } from 'react-icons/si';

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#171717] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* هدر */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">درباره سینماباز</h1>
        </div>

        {/* کارت اصلی */}
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 mb-8 border border-orange-500/30">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-200 mb-6 leading-relaxed">
              سینماباز  یک پلتفرم اجتماعی برای علاقه‌مندان به سینماست که می‌خواهند تجربیات و خاطرات خود از فیلم‌ها را ثبت و به اشتراک بگذارند. 
تمام بخش های این پلتفرم توسط  علی عسگری طرح ریزی و اجرایی شده.            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">هدف ما</h2>
            <p className="text-gray-200 mb-4">
              ایجاد جامعه‌ای صمیمی از فیلم‌دوستان که بتوانند:
            </p>
            <ul className="list-disc pr-6 space-y-3 text-gray-200">
              <li>خاطرات فیلمی خود را ثبت و نگهداری کنند</li>
              <li>با دیگران درباره فیلم‌های مورد علاقه بحث و تبادل نظر کنند</li>
              <li>فیلم‌های جدید را کشف کنند</li>
              <li>نظرات و امتیازات خود را با دیگران به اشتراک بگذارند</li>
            </ul>
          </div>
        </div>

        {/* تکنولوژی‌ها */}
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 border border-orange-500/30">
          <h2 className="text-2xl font-bold text-white mb-6">تکنولوژی‌های استفاده شده</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* فرانت‌اند */}
            <div className="bg-[#374151] rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <FaReact className="text-3xl text-blue-400" />
                <SiVite className="text-3xl text-purple-400" />
                <SiTailwindcss className="text-3xl text-cyan-400" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">فرانت‌اند</h3>
              <p className="text-gray-300 text-sm">React + Vite + Tailwind CSS</p>
            </div>

            {/* بک‌اند */}
            <div className="bg-[#374151] rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <FaNodeJs className="text-3xl text-green-500" />
                <SiExpress className="text-3xl text-gray-300" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">بک‌اند</h3>
              <p className="text-gray-300 text-sm">Node.js + Express</p>
            </div>

            {/* دیتابیس */}
            <div className="bg-[#374151] rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition">
              <div className="flex items-center gap-3 mb-4">
                <FaDatabase className="text-3xl text-green-600" />
                <SiMongodb className="text-3xl text-green-500" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">دیتابیس</h3>
              <p className="text-gray-300 text-sm">MongoDB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;