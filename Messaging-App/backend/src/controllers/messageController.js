import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Send a message to another user
 */
export async function sendMessage(req, res) {
  try {
    const { recipientId, content, imageUrl } = req.body;

    if (!recipientId || !content?.trim()) {
      return res.status(400).json({ error: "Missing recipient or content" });
    }

    // Check if recipient exists
    const recipient = await prisma.user.findUnique({
      where: { id: parseInt(recipientId) },
    });

    if (!recipient) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    // Can't message yourself
    if (parseInt(recipientId) === req.user.id) {
      return res.status(400).json({ error: "Cannot message yourself" });
    }

    const message = await prisma.message.create({
      data: {
        content,
        imageUrl: imageUrl || null,
        senderId: req.user.id,
        recipientId: parseInt(recipientId),
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get conversation with a specific user
 */
export async function getConversation(req, res) {
  try {
    const { userId } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: req.user.id,
            recipientId: parseInt(userId),
          },
          {
            senderId: parseInt(userId),
            recipientId: req.user.id,
          },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      take: 50, // Limit to last 50 messages
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        senderId: parseInt(userId),
        recipientId: req.user.id,
        isRead: false,
      },
      data: { isRead: true },
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get all conversations preview (last message with each user)
 */
export async function getConversations(req, res) {
  try {
    // Get all unique users we've messaged with
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: req.user.id }, { recipientId: req.user.id }],
      },
      distinct: ["senderId", "recipientId"],
      orderBy: { createdAt: "desc" },
    });

    // Get unique user IDs
    const userIds = new Set();
    messages.forEach((msg) => {
      if (msg.senderId !== req.user.id) userIds.add(msg.senderId);
      if (msg.recipientId !== req.user.id) userIds.add(msg.recipientId);
    });

    // Get user details and last message for each
    const conversations = [];
    for (const userId of userIds) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          avatar: true,
          isOnline: true,
          lastSeen: true,
        },
      });

      const lastMessage = await prisma.message.findFirst({
        where: {
          OR: [
            {
              senderId: req.user.id,
              recipientId: userId,
            },
            {
              senderId: userId,
              recipientId: req.user.id,
            },
          ],
        },
        orderBy: { createdAt: "desc" },
      });

      const unreadCount = await prisma.message.count({
        where: {
          senderId: userId,
          recipientId: req.user.id,
          isRead: false,
        },
      });

      conversations.push({
        user,
        lastMessage,
        unreadCount,
      });
    }

    // Sort by last message time
    conversations.sort(
      (a, b) =>
        new Date(b.lastMessage?.createdAt || 0) -
        new Date(a.lastMessage?.createdAt || 0),
    );

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Delete a message
 */
export async function deleteMessage(req, res) {
  try {
    const { id } = req.params;

    const message = await prisma.message.findUnique({
      where: { id: parseInt(id) },
    });

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Only allow deletion by sender
    if (message.senderId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.message.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
