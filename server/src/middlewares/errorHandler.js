const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Log error to terminal
  console.error(`
❌ Error: ${err.message}
📍 Route: ${req.method} ${req.originalUrl}
🕒 Time : ${new Date().toLocaleString()}
`);

  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;
