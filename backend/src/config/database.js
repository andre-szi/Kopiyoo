const { PrismaClient } = require('@prisma/client');
const config = require('./environment');

const prisma = new PrismaClient({
  log: config.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
});

module.exports = prisma;
