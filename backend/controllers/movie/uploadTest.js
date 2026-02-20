const uploadTest = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'فایلی آپلود نشد'
    });
  }

  res.json({
    success: true,
    message: 'آپلود تست موفق',
    file: req.file
  });
};

module.exports = uploadTest;