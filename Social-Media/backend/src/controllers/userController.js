import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        bio: true,
        profileImage: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            followers: { where: { status: "accepted" } },
            following: { where: { status: "accepted" } },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
}

export async function updateProfile(req, res) {
  try {
    const { username, bio, profileImage } = req.body;

    // Check if username is being changed and if it's already taken
    if (username) {
      const existing = await prisma.user.findUnique({
        where: { username },
      });
      if (existing && existing.id !== req.userId) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        ...(username && { username }),
        ...(bio !== undefined && { bio }),
        ...(profileImage !== undefined && { profileImage }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        profileImage: true,
      },
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip,
      take: parseInt(limit),
      select: {
        id: true,
        username: true,
        bio: true,
        profileImage: true,
        createdAt: true,
        _count: {
          select: {
            followers: { where: { status: "accepted" } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.user.count();

    res.json({
      users,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function searchUsers(req, res) {
  try {
    const { q, limit = 20 } = req.query;

    if (!q || q.length < 2) {
      return res.json({ users: [] });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: q, mode: "insensitive" } },
          { bio: { contains: q, mode: "insensitive" } },
        ],
      },
      take: parseInt(limit),
      select: {
        id: true,
        username: true,
        bio: true,
        profileImage: true,
        _count: {
          select: {
            followers: { where: { status: "accepted" } },
          },
        },
      },
    });

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
}
