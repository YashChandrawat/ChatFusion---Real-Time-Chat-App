  const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

//@description     Get all Messages
//@route           GET /api/message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve messages' });
  }
});

//@description     Create New Message
//@route           POST /api/message
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ error: 'Invalid data passed into request' });
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  // Handle image upload
  if (req.file) {
    newMessage.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }

  try {
    const message = await Message.create(newMessage);

    message = await message.populate('sender', 'name pic').execPopulate();
    message = await message.populate('chat').execPopulate();
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to send the message' });
  }
});

module.exports = { allMessages, sendMessage };
