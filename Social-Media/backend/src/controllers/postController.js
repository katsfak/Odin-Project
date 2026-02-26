import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost(req, res) {
  try {
    const { content, imageUrl } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Content required" });
    }

    if (content.length > 500) {
      return res
        .status(400)
        .json({ error: "Content too long (max 500 chars)" });
    }

    const post = await prisma.post.create({
      data: {
        content,
        imageUrl: imageUrl || null,
        authorId: req.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        _count: {
          select: { likes: true, comments: true },
        },
      },
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function getFeedPosts(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    // Get current user's following list
    const following = await prisma.follow.findMany({
      where: {
        followerId: req.userId,
        status: "accepted",
      },
      select: { followingId: true },
    });

    const followingIds = following.map((f) => f.followingId);
    followingIds.push(req.userId); // Include own posts

    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: followingIds },
      },
      skip,
      take: parseInt(limit),
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        _count: {
          select: { likes: true, comments: true },
        },
        likes: {
          where: { userId: req.userId },
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.post.count({
      where: { authorId: { in: followingIds } },
    });

    const enrichedPosts = posts.map((post) => ({
      ...post,
      liked: post.likes.length > 0,
      likes: post._count.likes,
      comments: post._count.comments,
    }));

    res.json({
      posts: enrichedPosts,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch feed" });
  }
}

export async function getUserPosts(req, res) {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      skip,
      take: parseInt(limit),
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        _count: {
          select: { likes: true, comments: true },
        },
        likes: {
          where: { userId: req.userId },
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.post.count({
      where: { authorId: userId },
    });

    const enrichedPosts = posts.map((post) => ({
      ...post,
      liked: post.likes.length > 0,
      likes: post._count.likes,
      comments: post._count.comments,
    }));

    res.json({
      posts: enrichedPosts,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
}

export async function getPost(req, res) {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profileImage: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                profileImage: true,
              },
            },
            _count: {
              select: { likes: true },
            },
            likes: {
              where: { userId: req.userId },
              select: { id: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { likes: true },
        },
        likes: {
          where: { userId: req.userId },
          select: { id: true },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const enrichedPost = {
      ...post,
      liked: post.likes.length > 0,
      likes: post._count.likes,
      comments: post.comments.map((comment) => ({
        ...comment,
        liked: comment.likes.length > 0,
        likes: comment._count.likes,
      })),
    };

    res.json(enrichedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

export async function deletePost(req, res) {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.authorId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Cannot delete another user's post" });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
}
