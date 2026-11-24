const { errorResponse } = require('../utils/response');

const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    if (!parsed.success) {
      const formattedErrors = parsed.error.errors.map(err => ({
        field: err.path.slice(1).join('.'), // drop the 'body'/'query'/'params' prefix
        message: err.message
      }));
      return errorResponse(res, 'Validasi data gagal', 400, formattedErrors);
    }

    // Assign back parsed data
    if (parsed.data.body) req.body = parsed.data.body;
    if (parsed.data.query) req.query = parsed.data.query;
    if (parsed.data.params) req.params = parsed.data.params;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;
