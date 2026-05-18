import express from "express";
import {
  getOtherUsers,
  getProfile,
  login,
  logout,
  register,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/getprofile", isAuthenticated, getProfile);
router.get("/getotherusers", isAuthenticated, getOtherUsers);

export default router;
