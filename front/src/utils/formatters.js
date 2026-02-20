export const formatDate = (dateString, includeTime = true) => {
  try {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    };
    return new Date(dateString).toLocaleDateString('fa-IR', options);
  } catch {
    return 'تاریخ نامعلوم';
  }
};

export const formatNumber = (num) => {
  try {
    return num?.toLocaleString('fa-IR') || '۰';
  } catch {
    return num?.toString() || '۰';
  }
};