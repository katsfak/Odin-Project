import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function sendFollowRequest(req, res) {
  try {
    const { targetUserId } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ error: "Target user ID required" });
    }

    if (targetUserId === req.userId) {
      return res.status(400).json({ error: "Cannot follow yourself" });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already following or requested
    const existing = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.userId,
          followingId: targetUserId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: `Already ${existing.status}` });
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: req.userId,
        followingId: targetUserId,
        status: "pending",
      },
      include: {
        follower: { select: { id: true, username: true } },
        following: { select: { id: true, username: true } },
      },
    });

    res.status(201).json(follow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send follow request" });
  }
}

export async function acceptFollowRequest(req, res) {
  try {
    const { followId } = req.params;

    const follow = await prisma.follow.findUnique({
      where: { id: followId },
    });

    if (!follow) {
      return res.status(404).json({ error: "Follow request not found" });
    }

    // Only the target user can accept
    if (follow.followingId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updated = await prisma.follow.update({
      where: { id: followId },
      data: { status: "accepted" },
      include: {
        follower: { select: { id: true, username: true } },
        following: { select: { id: true, username: true } },
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to accept follow request" });
  }
}

export async function declineFollowRequest(req, res) {
  try {
    const { followId } = req.params;

    const follow = await prisma.follow.findUnique({
      where: { id: followId },
    });

    if (!follow) {
      return res.status(404).json({ error: "Follow request not found" });
    }

    // Only the target user can decline
    if (follow.followingId !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.follow.delete({
      where: { id: followId },
    });

    res.json({ message: "Request declined" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to decline follow request" });
  }
}

export async function unfollow(req, res) {
  try {
    const { targetUserId } = req.params;

    if (targetUserId === req.userId) {
      return res.status(400).json({ error: "Cannot unfollow yourself" });
    }

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.userId,
          followingId: targetUserId,
        },
      },
    });

    if (!follow) {
      return res.status(404).json({ error: "Not following" });
    }

    await prisma.follow.delete({
      where: { id: follow.id },
    });

    res.json({ message: "Unfollowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unfollow" });
  }
}

export async function getFollowing(req, res) {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const following = await prisma.follow.findMany({
      where: {
        followerId: userId,
        status: "accepted",
      },
      skip,
      take: parseInt(limit),
      include: {
        following: {
          select: {
            id: true,
            username: true,
            bio: true,
            profileImage: true,
            _count: {
              select: { followers: { where: { status: "accepted" } } },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.follow.count({
      where: {
        followerId: userId,
        status: "accepted",
      },
    });

    const users = following.map((f) => ({
      ...f.following,
      followers: f.following._count.followers,
    }));

    res.json({
      users,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch following" });
  }
}

export async function getFollowers(req, res) {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const followers = await prisma.follow.findMany({
      where: {
        followingId: userId,
        status: "accepted",
      },
      skip,
      take: parseInt(limit),
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            bio: true,
            profileImage: true,
            _count: {
              select: { followers: { where: { status: "accepted" } } },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.follow.count({
      where: {
        followingId: userId,
        status: "accepted",
      },
    });

    const users = followers.map((f) => ({
      ...f.follower,
      followers: f.follower._count.followers,
    }));

    res.json({
      users,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch followers" });
  }
}

export async function getPendingRequests(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const requests = await prisma.follow.findMany({
      where: {
        followingId: req.userId,
        status: "pending",
      },
      skip,
      take: parseInt(limit),
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            bio: true,
            profileImage: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.follow.count({
      where: {
        followingId: req.userId,
        status: "pending",
      },
    });

    const enriched = requests.map((r) => ({
      id: r.id,
      user: r.follower,
    }));

    res.json({
      requests: enriched,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pending requests" });
  }
}

export async function checkFollowStatus(req, res) {
  try {
    const { targetUserId } = req.params;

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.userId,
          followingId: targetUserId,
        },
      },
    });

    if (!follow) {
      return res.json({ status: "none" });
    }

    res.json({ status: follow.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to check follow status" });
  }
}
