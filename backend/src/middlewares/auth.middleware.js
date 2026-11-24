const { verifyToken } = require('../utils/token');
const { errorResponse } = require('../utils/response');
const prisma = require('../config/database');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Akses ditolak. Token autentikasi tidak ditemukan.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        avatar: true
      }
    });

    if (!user) {
      return errorResponse(res, 'Pengguna tidak ditemukan atau token tidak valid.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Sesi telah berakhir. Silakan login kembali.', 401);
    }
    return errorResponse(res, 'Token tidak valid atau telah dimanipulasi.', 401);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 'Akses terlarang. Anda tidak memiliki izin untuk tindakan ini.', 403);
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
