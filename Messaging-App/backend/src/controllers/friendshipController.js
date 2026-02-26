import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Send a friend request or add friend
 */
export async function addFriend(req, res) {
  try {
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({ error: "Friend ID is required" });
    }

    if (parseInt(friendId) === req.user.id) {
      return res.status(400).json({ error: "Cannot friend yourself" });
    }

    // Check if friend exists
    const friend = await prisma.user.findUnique({
      where: { id: parseInt(friendId) },
    });

    if (!friend) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if friendship already exists
    const existing = await prisma.friendship.findUnique({
      where: {
        user1Id_user2Id: {
          user1Id: Math.min(req.user.id, parseInt(friendId)),
          user2Id: Math.max(req.user.id, parseInt(friendId)),
        },
      },
    });

    if (existing) {
      if (existing.status === "accepted") {
        return res.status(400).json({ error: "Already friends" });
      }
      if (existing.status === "pending") {
        return res.status(400).json({ error: "Friend request already sent" });
      }
    }

    // Create friendship
    const friendship = await prisma.friendship.create({
      data: {
        user1Id: Math.min(req.user.id, parseInt(friendId)),
        user2Id: Math.max(req.user.id, parseInt(friendId)),
        status: "pending",
      },
      include: {
        user1: { select: { id: true, username: true, avatar: true } },
        user2: { select: { id: true, username: true, avatar: true } },
      },
    });

    res.status(201).json(friendship);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Accept friend request
 */
export async function acceptFriend(req, res) {
  try {
    const { friendshipId } = req.params;

    const friendship = await prisma.friendship.findUnique({
      where: { id: parseInt(friendshipId) },
    });

    if (!friendship) {
      return res.status(404).json({ error: "Friendship not found" });
    }

    // Check if user is part of this friendship
    if (
      friendship.user1Id !== req.user.id &&
      friendship.user2Id !== req.user.id
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updated = await prisma.friendship.update({
      where: { id: parseInt(friendshipId) },
      data: { status: "accepted" },
      include: {
        user1: { select: { id: true, username: true, avatar: true } },
        user2: { select: { id: true, username: true, avatar: true } },
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Reject or remove friend
 */
export async function removeFriend(req, res) {
  try {
    const { friendshipId } = req.params;

    const friendship = await prisma.friendship.findUnique({
      where: { id: parseInt(friendshipId) },
    });

    if (!friendship) {
      return res.status(404).json({ error: "Friendship not found" });
    }

    // Check if user is part of this friendship
    if (
      friendship.user1Id !== req.user.id &&
      friendship.user2Id !== req.user.id
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.friendship.delete({
      where: { id: parseInt(friendshipId) },
    });

    res.json({ message: "Friendship removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get friends list
 */
export async function getFriends(req, res) {
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        AND: [
          {
            OR: [{ user1Id: req.user.id }, { user2Id: req.user.id }],
          },
          { status: "accepted" },
        ],
      },
      include: {
        user1: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
            isOnline: true,
            lastSeen: true,
          },
        },
        user2: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
            isOnline: true,
            lastSeen: true,
          },
        },
      },
    });

    // Map to get the friend (not the current user)
    const friends = friendships.map((f) =>
      f.user1Id === req.user.id ? f.user2 : f.user1,
    );

    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get pending friend requests
 */
export async function getPendingRequests(req, res) {
  try {
    const requests = await prisma.friendship.findMany({
      where: {
        user2Id: req.user.id,
        status: "pending",
      },
      include: {
        user1: {
          select: {
            id: true,
            username: true,
            avatar: true,
            bio: true,
          },
        },
      },
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get online friends
 */
export async function getOnlineFriends(req, res) {
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        AND: [
          {
            OR: [{ user1Id: req.user.id }, { user2Id: req.user.id }],
          },
          { status: "accepted" },
        ],
      },
      include: {
        user1: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
            lastSeen: true,
          },
        },
        user2: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
            lastSeen: true,
          },
        },
      },
    });

    // Filter online friends
    const onlineFriends = friendships
      .map((f) => (f.user1Id === req.user.id ? f.user2 : f.user1))
      .filter((friend) => friend.isOnline);

    res.json(onlineFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
