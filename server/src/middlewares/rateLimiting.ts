import rateLimit from "express-rate-limit";
export const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});
