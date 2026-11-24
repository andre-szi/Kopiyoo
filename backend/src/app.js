const express = require('express');
const cors = require('cors');
const config = require('./config/environment');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware');

const app = express();

// CORS Configuration (Allow frontend origin)
app.use(
  cors({
    origin: [config.CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Selamat datang di REST API Kopiyoo - Sistem Informasi Marketplace Kopi Gayo',
    version: '1.0.0',
    documentation: '/api/v1/health'
  });
});

// API Routes (Mounted under /api/v1 and /api)
app.use('/api/v1', routes);
app.use('/api', routes);

// 404 Route Not Found Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
