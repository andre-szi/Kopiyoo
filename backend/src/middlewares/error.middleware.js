const { errorResponse } = require('../utils/response');
const config = require('../config/environment');

const errorHandler = (err, req, res, next) => {
  console.error('[Error Handler]', err);

  // Prisma Known Request Errors
  if (err.code === 'P2002') {
    const field = err.meta?.target ? err.meta.target.join(', ') : 'field';
    return errorResponse(res, `Data dengan ${field} tersebut sudah terdaftar.`, 409);
  }

  if (err.code === 'P2025') {
    return errorResponse(res, 'Data yang diminta tidak ditemukan.', 404);
  }

  // Zod Validation Errors
  if (err.name === 'ZodError') {
    const formattedErrors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));
    return errorResponse(res, 'Validasi gagal', 400, formattedErrors);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Token tidak valid.', 401);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan internal pada server.';

  return errorResponse(
    res,
    message,
    statusCode,
    config.NODE_ENV === 'development' ? err.stack : null
  );
};

const notFoundHandler = (req, res) => {
  return errorResponse(res, `Rute tidak ditemukan: ${req.method} ${req.originalUrl}`, 404);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
