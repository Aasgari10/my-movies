import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSearchBar = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/users/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجوی کاربران با نام یا نام کاربری..."
        className="px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 transition"
      >
        🔍 جستجوی کاربران
      </button>
    </form>
  );
};

export default UserSearchBar;