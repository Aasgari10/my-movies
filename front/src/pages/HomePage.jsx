import { Link } from 'react-router-dom';
import phoneImage from '@/assets/arrow.png';
import logo from '@/assets/logu.png';
import coffee from '@/assets/cofeee.png';
import search from '@/assets/searchh.png';
import all from '@/assets/all.jpg';

const HomePage = () => {
  return (
    <>
      {/* ---------- نسخه دسکتاپ (فقط در lg به بالا) ---------- */}
      <div className="hidden lg:flex w-full min-h-screen bg-[#171717] rounded-b-3xl overflow-hidden">
        {/* بخش چپ - 55% */}
        <div className="w-[55%] px-8 pt-14 pb-8 flex flex-col space-y-12 text-white">
          <h1 className="text-[2.6rem] font-bold mt-6 leading-relaxed">
            به سینماباز خوش‌آمدید. خاطراتتان از فیلم های مورد علاقه تان را با دوستانتان به اشتراک بگذارید و لذت ببرید.
          </h1>

          <p className="text-lg text-gray-300">
            در این مکان میتوانید به نقد و برسی فیلم ها بپردازید نظر خود را بیان کنید و نظرات سایر افراد را راجه به فیلم مورد نظر مشاهده بفرمایید و لذت ببرید.
          </p>

          <div className="flex space-x-4 rtl:space-x-reverse">
            <span className="bg-[#171717] px-4 py-2 rounded text-white">نگاهی به آپلود شده ها بندازید!</span>
            <Link
              to="/my-movies"
              className="bg-[#666666] text-white py-1 ps-3 pe-1 rounded-full flex items-center gap-x-4 rtl:gap-x-4"
            >
              <span>مشاهده فیلم ها</span>
              <span className="bg-white rounded-full w-7 h-7 flex items-center justify-center">
                <img
                  src={phoneImage}
                  alt="تلفن قدیمی"
                  className="w-5 h-5 object-contain"
                />
              </span>
            </Link>
          </div>

          {/* دیو نارنجی با لوگو */}
          <div className="bg-orange-500 text-black p-7 pt-24 rounded-lg relative">
            <img 
              src={logo} 
              alt="لوگو" 
              className="absolute top-6 right-6 w-14 h-14 object-contain" 
            />
            <p className="font-bold"> 
              "سینما گاهی داروخانه ای برای التیام روح بیمار تماشاچیست. پس بهتر است حواستمان باشد چه دارویی تهیه کنیم آیا این دارو برای ما مناسب است یا برای یک بیمار با بیماری دیگری میباشد. آيای سیستم دفاعی ما نسبت به آن حساسیت ندارد؟ سینما یاز برای سوالتان جواب دارد."
            </p>
          </div>
        </div> 

        {/* بخش راست - 45% */}
        <div className="w-[45%] flex flex-col px-8">
          {/* دو باکس رنگی بالایی */}
          <div className="h-[30%] flex items-center justify-between mt-6 gap-x-4">
            {/* باکس صورتی */}
            <div className="w-[48%] p-5 pt-8 pr-8 text-black bg-[#E89AD2] rounded-[5%] overflow-hidden relative">
              <img 
                src={search} 
                alt="search" 
                className="absolute top-6 right-6 w-16 h-16 object-contain shadow-lg" 
              />
              <p className="mt-20">فیلم خوب و مناسب با ذائقه و شخصیت خود را پیدا کنید.</p>
            </div>
            {/* باکس سبز */}
            <div className="w-[48%] p-5 pt-8 pr-8 text-black bg-[#48A07B] rounded-[5%] overflow-hidden relative">
              <img 
                src={coffee} 
                alt="coffee" 
                className="absolute top-6 right-6 w-16 h-16 object-contain shadow-lg" 
              />
              <p className="mt-20">از تماشای فیلم به درد بخور خود لذت ببرید.</p>
            </div>
          </div>

          {/* تصویر پایینی */}
          <div className="h-[70%] py-6">
            <div className="h-full w-full rounded-lg overflow-hidden relative">
              <img
                src={all}
                alt="تصویر تصادفی"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- نسخه موبایل - اصلاح شده با اینلاین استایل ---------- */}
      <div 
        className="lg:hidden flex flex-col w-full bg-[#171717] rounded-b-3xl overflow-hidden px-4 py-6 text-white"
        style={{ height: 'auto' }}
      >
        {/* عنوان */}
        <h1 className="text-2xl font-bold leading-relaxed">
          به سینماباز خوش‌آمدید.
        </h1>

        {/* تصویر */}
        <div className="w-full rounded-lg overflow-hidden mt-4">
          <img
            src={all}
            alt="تصویر تصادفی"
            className="w-full h-auto object-cover grayscale"
          />
        </div>

        {/* کادر نارنجی با لوگو */}
        <div className="bg-orange-500 text-black pt-8 pb-5 px-4 rounded-lg relative mt-6">
          <img 
            src={logo} 
            alt="لوگو" 
            className="absolute top-3 right-3 w-12 h-12 object-contain" 
          />
          <p className="font-bold text-sm mt-9"> 
            "سینما گاهی داروخانه‌ای برای التیام بخشیدن به روح بیمار تماشاچیست. پس بهتر است حواستمان باشد چه دارویی تهیه می‌کنیم"
          </p>
        </div>

        {/* دکمه‌ها – با فاصله ثابت از کادر نارنجی */}
        <div className="flex flex-col gap-3 mt-4">
          <Link
            to="/register"
            className="w-full bg-[#374151] hover:bg-[#4B5563] text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300 border border-gray-600"
          >
            ثبت‌نام
          </Link>
          <Link
            to="/login"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300 shadow-lg"
          >
            ورود به پنل
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;