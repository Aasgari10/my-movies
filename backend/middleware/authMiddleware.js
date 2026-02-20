const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'توکن نامعتبر است' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'توکن ارسال نشده' });
  }
};

const admin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'دسترسی غیرمجاز. فقط ادمین' });
};

module.exports = { protect, admin };