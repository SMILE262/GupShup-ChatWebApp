import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getMessages, sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/send/:receiverId", isAuthenticated, sendMessage);
router.get("/getmessages/:ChatPartnerId", isAuthenticated, getMessages);

export default router;
