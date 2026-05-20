import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import { asyncHandler } from "../utilities/asyncHandlerUtility.js";
import { errorHandler } from "../utilities/errorHandlerUtility.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  if (!senderId || !receiverId ) {
    return next(new errorHandler("All fields are required", 400));
  }

  if (!message){
    return next(new errorHandler("Message cannot be empty"))
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.message.push(newMessage._id);
    await conversation.save();
  }

  const socketId = getSocketId(receiverId);
  if (socketId) {
    io.to(socketId).emit("newMessage", newMessage);
  }

  res.status(200).json({
    success: true,
    responseData: newMessage,
  });

});

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { messageId } = req.params;

  if (!messageId) {
    return next(new errorHandler("Message ID is required", 400));
  }

  const deletedMessage = await Message.findById(messageId);

  if (!deletedMessage) {
    return next(new errorHandler("Message not found", 404));
  }

  const senderId = deletedMessage.senderId?.toString();
  const receiverId = deletedMessage.receiverId?.toString();
  const currentUser = userId.toString();

  if (currentUser !== senderId && currentUser !== receiverId) {
    return next(new errorHandler("Not authorized to delete this message", 403));
  }

  await Message.findByIdAndDelete(messageId);
  await Conversation.findOneAndUpdate(
    {
      participants: { $all: [deletedMessage.senderId, deletedMessage.receiverId] },
    },
    {
      $pull: { message: messageId },
    },
  );

  res.status(200).json({
    success: true,
    responseData: deletedMessage,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.user._id;
  const ChatPartnerId = req.params.ChatPartnerId;

  if (!myId || !ChatPartnerId) {
    return next(new errorHandler("All fields are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [myId, ChatPartnerId] },
  }).populate("message");

  res.status(200).json({
    success: true,
    responseData: conversation,
  });
});
