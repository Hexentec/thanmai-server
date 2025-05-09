// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack);
  
    // If headers are already sent, delegate to default Express handler
    if (res.headersSent) {
      return next(err);
    }
  
    // Customize based on error type
    const status = err.statusCode || 500;
    const message = err.message || 'Server Error';
  
    res.status(status).json({
      message,
      // include stack trace in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  