import { Link } from 'react-router-dom';

const NotFoundMessage = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="text-center">
      <div className="text-6xl mb-4">🎬</div>
      <h1 className="text-2xl font-bold mb-4">فیلم پیدا نشد</h1>
      <Link
        to="/movies"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        بازگشت به لیست فیلم‌ها
      </Link>
    </div>
  </div>
);

export default NotFoundMessage;