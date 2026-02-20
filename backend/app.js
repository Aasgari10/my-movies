const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth-routes');
const movieRoutes = require('./routes/movies-routes');
const adminRoutes = require('./routes/admin-routes');
const publicRoutes = require('./routes/public-routes');
const userRoutes = require('./routes/user-routes');
const commentRoutes = require('./routes/comments-routes');

const app = express();

// ======================
// 🛡️ Middleware
// ======================

// CORS – مقدار origin از متغیر محیطی خوانده می‌شود (برای کار در محیط‌های مختلف)
const corsOptions = {
  origin: 'http://localhost:3000', // یا 'http://127.0.0.1:3000'
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

// لاگ درخواست‌ها – فقط در محیط توسعه (برای کاهش نویز در production)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
    next();
  });
}

// ======================
// 📍 Routes
// ======================
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

console.log('🗣️ Comments routes registered');
console.log('👤 Users routes registered');
console.log('👑 Admin routes registered');

// ======================
// 🏠 Home & Health Routes
// ======================
app.get('/', (req, res) => {
  res.json({
    message: '🎬 FilmMemories API',
    version: '1.0.0',
    status: 'running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      home: '/',
      health: '/api/health',
      auth: '/api/auth',
      movies: '/api/movies',
      admin: '/api/admin',
      comments: '/api/comments',
      public: '/api/public',
      users: '/api/users',
    },
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Test Route
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is working!',
    features: {
      authentication: '✅ JWT-based auth',
      movies: '✅ CRUD operations',
      admin: '✅ Admin panel',
      comments: '✅ Comment system',
      users: '✅ User profiles & following',
    },
  });
});

// ======================
// ❌ Error Handlers
// ======================
// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedUrl: req.originalUrl,
  });
});

// Global Error Handler (نمایش stack فقط در محیط توسعه)
app.use((err, req, res, next) => {
  console.error('🚨 Unhandled Error:', err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ======================
// 🚀 Database & Server Startup
// ======================
const startServer = async () => {
  try {
    // افزایش timeout برای اطمینان از اتصال در شبکه خصوصی لیارا
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000, // ۱۵ ثانیه
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    console.log('✅ MongoDB connected!');

    // ثبت مدل‌ها (اختیاری – اگر در کنترلرها ثبت شده‌اند)
    require('./models/User');
    require('./models/Movie');
    require('./models/Comment');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// ======================
// 🔄 Graceful Shutdown برای SIGINT و SIGTERM (مهم برای لیارا)
// ======================
const gracefulShutdown = async (signal) => {
  console.log(`👋 Received ${signal}. Closing MongoDB connection...`);
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

if (require.main === module) {
  startServer();
}

module.exports = app;