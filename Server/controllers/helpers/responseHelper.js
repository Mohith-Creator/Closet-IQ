// Response Helpers
// Shared API responses.

export const serverError = (res, error) => {
  console.error(error);
  return res.status(500).json({
    message: error.message,
  });
};

export const notFound = (res, message = "Resource not found") => {
  return res.status(404).json({
    message,
  });
};
