import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserProfile(req, res) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        isOnline: true,
        lastSeen: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { id } = req.params;
    const { username, bio, avatar } = req.body;

    // Only allow users to update their own profile
    if (parseInt(id) !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Check if username is already taken
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username,
          NOT: { id: req.user.id },
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(username && { username }),
        ...(bio !== undefined && { bio }),
        ...(avatar && { avatar }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    // Get all users except the current user
    const users = await prisma.user.findMany({
      where: {
        NOT: { id: req.user.id },
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        isOnline: true,
        lastSeen: true,
      },
      orderBy: { username: "asc" },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function searchUsers(req, res) {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json([]);
    }

    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: { id: req.user.id },
          },
          {
            OR: [
              { username: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
            ],
          },
        ],
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        bio: true,
        isOnline: true,
      },
      take: 10,
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
