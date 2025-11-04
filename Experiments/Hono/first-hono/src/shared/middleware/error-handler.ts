import type { ErrorHandler } from "hono";

export const errorHandler: ErrorHandler = (err, c) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);

  // You can add more sophisticated error handling here
  // For example, check error types and return appropriate responses

  return c.json(
    {
      error: "An internal server error occurred",
      message: err.message,
    },
    500
  );
};
