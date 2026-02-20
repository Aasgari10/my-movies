// src/hooks/useAdminData.js
import { useState, useEffect } from 'react';
import { getAdminStats, getUsers, deleteUser } from '@/services/admin';

export const useAdminData = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        getAdminStats(),
        getUsers(),
      ]);
      setStats(statsRes.stats);
      setUsers(usersRes.users || []);
    } catch (error) {
      console.error('❌ خطا در دریافت اطلاعات مدیریت:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('آیا از حذف این کاربر اطمینان دارید؟')) return;
    
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {
      console.error('❌ خطا در حذف کاربر:', error);
    }
  };

  return {
    loading,
    stats,
    users,
    deleteUser: handleDeleteUser,
    refetch: fetchData,
  };
};