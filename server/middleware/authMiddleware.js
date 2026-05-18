import { asyncHandler } from "../utilities/asyncHandlerUtility.js";
import { errorHandler } from "../utilities/errorHandlerUtility.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.replace("Bearer", "");
  if (!token) {
    return next(new errorHandler("Invalid token", 400));
  }
  const tokenData = jwt.verify(token, process.env.jwtSecret);
  req.user = tokenData;
  next();
});

















