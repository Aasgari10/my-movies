import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#171717] text-white  rounded-b-3xl overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">قوانین و مقررات</h1>
        <div className="bg-[#2A2A2A] rounded-xl shadow-md p-8 space-y-6 border border-orange-500/30">
          <section>
            <h2 className="text-xl font-bold mb-3 text-white">۱. حساب کاربری</h2>
            <p className="text-gray-300">
              برای استفاده از خدمات سایت نیاز به ثبت‌نام دارید. اطلاعات وارد شده باید صحیح و کامل باشد.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-3 text-white">۲. محتوای کاربران</h2>
            <p className="text-gray-300">
              کاربران می‌توانند فیلم‌ها، نظرات و خاطرات خود را به اشتراک بگذارند. هرگونه محتوای نامناسب حذف خواهد شد.
            </p>
          </section>

          <div className="pt-6 text-center border-t border-gray-700">
            <Link to="/register" className="text-orange-400 hover:text-orange-300 font-bold transition">
              بازگشت به ثبت‌نام
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;