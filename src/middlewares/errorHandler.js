const errorHandler = (err, req, res, next) => {
  // Set status code
  const statusCode = err.statusCode || 500;

  // Log for developers
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  // Optional: hide internal errors in production
  const response = {
    status: "Failed",
    reason: err.message || "Internal Server Error",
    status_code: statusCode,
  };

  // In dev, include stack trace
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
