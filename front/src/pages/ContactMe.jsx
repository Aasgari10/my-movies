// src/pages/ContactPage.jsx
import { FaPhone, FaInstagram, FaTelegram, FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#171717] rounded-b-3xl overflow-hidden">
      {/* بخش اصلی با عرض مشابه homepage */}
      <div className="w-full max-w-4xl mx-auto px-8 pt-14 pb-8 text-white">
        <h1 className="text-4xl font-bold mt-6 mb-4">ارتباط با من</h1>
        <p className="text-lg text-gray-300 mb-10">
          از راه‌های زیر می‌توانید با من در ارتباط باشید.
        </p>

        {/* نمایش اطلاعات تماس */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* شماره تلفن */}
          <a
            href="tel:09185612083"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 hover:bg-[#3A3A3A] transition group"
          >
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaPhone className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">شماره تلفن</p>
              <p className="font-bold text-lg">۰۹۱۸۵۶۱۲۰۸۳</p>
            </div>
          </a>

          {/* ایمیل */}
          <a
            href="mailto:alimanu.s.s2002@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 hover:bg-[#3A3A3A] transition group"
          >
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaEnvelope className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">ایمیل</p>
              <p className="font-bold text-lg break-all">alimanu.s.s2002@gmail.com</p>
            </div>
          </a>

          {/* اینستاگرام */}
          <a
            href="https://instagram.com/ali_asar2083"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 hover:bg-[#3A3A3A] transition group"
          >
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaInstagram className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">اینستاگرام</p>
              <p className="font-bold text-lg">@ali_asar2083</p>
            </div>
          </a>

          {/* تلگرام */}
          <a
            href="https://t.me/Aasgari10"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 hover:bg-[#3A3A3A] transition group"
          >
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaTelegram className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">تلگرام</p>
              <p className="font-bold text-lg">@Aasgari10</p>
            </div>
          </a>

          {/* لینکدین */}
          <a
            href="https://www.linkedin.com/in/ali-asgari-991827382"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 hover:bg-[#3A3A3A] transition group"
          >
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaLinkedin className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">لینکدین</p>
              <p className="font-bold text-lg">Ali Asgari</p>
            </div>
          </a>

          {/* گیت‌هاب */}
          <a
            href="https://github.com/Aasgari10"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2A2A2A] p-5 rounded-xl flex items-center gap-4 hover:bg-[#3A3A3A] transition group"
          >
            <div className="bg-orange-500/10 p-3 rounded-full group-hover:bg-orange-500/20 transition">
              <FaGithub className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">گیت‌هاب</p>
              <p className="font-bold text-lg">Aasgari10</p>
            </div>
          </a>
        </div>

        {/* توضیحات اضافه (اختیاری) */}
        <p className="text-gray-400 text-sm mt-10 text-center border-t border-gray-700 pt-6">
          با کلیک روی هر آیتم، به صفحه مربوطه هدایت می‌شوید.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;