// src/components/layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">🎬 فیلم خاطرات</h2>
            <p className="text-gray-400">
              جایی برای به اشتراک‌گذاری خاطرات فیلم‌هایتان
            </p>
          </div>
          <div className="flex space-x-6 space-x-reverse">
            <a href="#" className="text-gray-400 hover:text-white transition">
              قوانین
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              حریم خصوصی
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              تماس با ما
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-500 text-sm">
          <p>© ۲۰۲۴ فیلم خاطرات. ساخته شده با ❤️ و React + Vite + Tailwind</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;