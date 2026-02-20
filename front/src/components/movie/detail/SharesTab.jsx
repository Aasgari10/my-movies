const SharesTab = ({ shares }) => (
  <div className="bg-white rounded-xl shadow-md p-8">
    <h2 className="text-xl font-bold mb-6">افرادی که این فیلم را اشتراک گذاشته‌اند</h2>
    {shares && shares.length > 0 ? (
      <div className="space-y-4">
        {shares.map((share, index) => (
          <div key={share.user?.id || index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="mr-3">
                <p className="font-bold">{share.user?.name || `کاربر ${index + 1}`}</p>
                <p className="text-xs text-gray-500">
                  {share.sharedAt ? new Date(share.sharedAt).toLocaleDateString('fa-IR') : 'تاریخ نامشخص'}
                </p>
              </div>
            </div>
            <span className="text-blue-600">🔗</span>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🔗</div>
        <h3 className="text-xl font-bold mb-2">هنوز کسی این فیلم را اشتراک نگذاشته</h3>
      </div>
    )}
  </div>
);

export default SharesTab;