import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchUsers } from '@/services/users';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { FaUsers, FaSearch } from 'react-icons/fa';
import Avatar from '@/components/common/Avatar';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  const fetchUsers = async (query = '', pageNum = 1) => {
    try {
      setLoading(true);
      const data = await searchUsers(query, pageNum, 20);
      if (data.success) {
        const filteredUsers = (data.users || []).filter(
          user => user.email !== 'admin@gmail.com'
        );
        setUsers(filteredUsers);
        setTotalPages(data.pages || 1);
      } else {
        setError('خطا در دریافت کاربران');
      }
    } catch (err) {
      console.error(err);
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchQuery, page);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(searchQuery, 1);
  };

  return (
    <div className="w-full min-h-screen bg-[#171717] text-white rounded-b-3xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-white mb-4">کاربران</h1>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو با نام یا ایمیل..."
              className="flex-1 px-4 py-3 bg-[#374151] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition font-bold flex items-center justify-center gap-2 md:px-6"
            >
              <FaSearch />
              <span className="hidden md:inline">جستجو</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {users.length === 0 ? (
              <div className="text-center py-12 bg-[#2A2A2A] rounded-xl border border-gray-700">
                <FaUsers className="text-6xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">کاربری یافت نشد</h3>
                <p className="text-gray-300">عبارت دیگری را جستجو کنید</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map((user) => (
                    <Link
                      key={user._id}
                      to={`/profile/${user._id}`}
                      className="bg-[#2A2A2A] rounded-xl shadow-md p-4 hover:shadow-lg transition border border-gray-700 hover:border-orange-500/50 flex items-center gap-4"
                    >
                      <div className="flex-shrink-0">
                        {/* تغییر: حذف size و اضافه کردن className برای بزرگ‌تر شدن و گوشه‌گرد مربعی */}
                        <Avatar user={user} className="w-20 h-20 rounded-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-xl text-white mb-1 truncate">{user.name}</h2>
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-[#2A2A2A] border border-gray-600 text-gray-300 rounded-lg hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      قبلی
                    </button>
                    <span className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                      {page}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-[#2A2A2A] border border-gray-600 text-gray-300 rounded-lg hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      بعدی
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;