import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getMessages, sendMessage, deleteMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/send/:receiverId", isAuthenticated, sendMessage);
router.get("/getmessages/:ChatPartnerId", isAuthenticated, getMessages);
router.delete("/:messageId", isAuthenticated, deleteMessage);

export default router;
