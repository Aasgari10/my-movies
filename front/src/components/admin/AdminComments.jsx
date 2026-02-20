// src/components/admin/AdminComments.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getComments, approveComment, deleteComment } from '@/services/admin';
import { formatDate } from '@/utils/formatters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { FaCheckCircle, FaTrash, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchComments = async (currentPage = page, status = filter) => {
    try {
      setLoading(true);
      const response = await getComments({
        page: currentPage,
        limit: 10,
        isApproved: status === 'pending' ? false : status === 'approved' ? true : undefined,
      });
      if (response.success) {
        setComments(response.comments || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err) {
      setError(err.message || 'خطا در دریافت نظرات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page, filter]);

  const handleApprove = async (commentId) => {
    try {
      const response = await approveComment(commentId);
      if (response.success) {
        setComments((prev) =>
          prev.map((c) =>
            c._id === commentId ? { ...c, isApproved: true } : c
          )
        );
      }
    } catch (err) {
      alert(err.message || 'خطا در تأیید نظر');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('آیا از حذف این نظر اطمینان دارید؟')) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      alert(err.message || 'خطا در حذف نظر');
    }
  };

  if (loading && comments.length === 0) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white">مدیریت نظرات</h2>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 bg-[#374151] border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
        >
          <option value="all" className="bg-[#374151]">همه نظرات</option>
          <option value="pending" className="bg-[#374151]">در انتظار تأیید</option>
          <option value="approved" className="bg-[#374151]">تأیید شده</option>
        </select>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

      <div className="bg-[#2A2A2A] rounded-lg shadow-sm overflow-hidden border border-gray-700">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="p-6 border-b border-gray-700 last:border-0 hover:bg-[#333333]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 space-x-reverse">
                <Link
                  to={`/profile/${comment.user?._id}`}
                  className="flex-shrink-0"
                >
                  <div className="w-10 h-10 bg-[#374151] rounded-full flex items-center justify-center text-orange-400 border border-gray-600">
                    {comment.user?.avatar ? (
                      <img src={comment.user.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <FaUser className="text-sm" />
                    )}
                  </div>
                </Link>
                <div className="mr-3">
                  <div className="flex items-center mb-1 flex-wrap gap-2">
                    <Link
                      to={`/profile/${comment.user?._id}`}
                      className="font-bold text-sm text-white hover:text-orange-400"
                    >
                      {comment.user?.name || 'کاربر'}
                    </Link>
                    <span className="text-xs text-gray-400">
                      {formatDate(comment.createdAt, true)}
                    </span>
                    {!comment.isApproved && (
                      <span className="px-2 py-0.5 bg-yellow-900/50 text-yellow-300 text-xs rounded-full border border-yellow-700">
                        در انتظار تأیید
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{comment.text}</p>
                  <div className="flex items-center text-xs text-gray-400 gap-1">
                    <span>فیلم:</span>
                    <Link
                      to={`/movies/${comment.movie?._id}`}
                      className="text-orange-400 hover:text-orange-300"
                    >
                      {comment.movie?.title || 'فیلم'}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                {!comment.isApproved && (
                  <button
                    onClick={() => handleApprove(comment._id)}
                    className="px-3 py-1 bg-green-900/50 text-green-300 text-xs rounded hover:bg-green-800/50 border border-green-700 flex items-center gap-1"
                  >
                    <FaCheckCircle /> تأیید
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="px-3 py-1 bg-red-900/50 text-red-300 text-xs rounded hover:bg-red-800/50 border border-red-700 flex items-center gap-1"
                >
                  <FaTrash /> حذف
                </button>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">نظری یافت نشد</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2 bg-[#2A2A2A] border border-gray-600 text-gray-300 rounded-lg hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaChevronRight />
          </button>
          <span className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            {page}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 bg-[#2A2A2A] border border-gray-600 text-gray-300 rounded-lg hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaChevronLeft />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminComments; 