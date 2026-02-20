import { Link } from 'react-router-dom';

const SimilarMovies = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((item) => (
      <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
        <div className="w-16 h-16 bg-gray-200 rounded-lg" />
        <div className="mr-3">
          <p className="font-bold text-sm">فیلم مشابه {item}</p>
          <p className="text-xs text-gray-600">۲۰۲۳ • درام</p>
        </div>
      </div>
    ))}
    <Link to="/movies" className="block w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-bold">
      مشاهده همه فیلم‌ها →
    </Link>
  </div>
);

export default SimilarMovies;