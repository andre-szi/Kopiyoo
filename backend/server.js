const app = require('./src/app');
const config = require('./src/config/environment');

const server = app.listen(config.PORT, () => {
  console.log('====================================================');
  console.log(`☕ KOPIYOO REST API SERVER RUNNING`);
  console.log(`📡 Port        : ${config.PORT}`);
  console.log(`🌐 Environment : ${config.NODE_ENV}`);
  console.log(`🔗 Base URL    : http://localhost:${config.PORT}/api/v1`);
  console.log(`🩺 Health Check: http://localhost:${config.PORT}/api/v1/health`);
  console.log('====================================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
