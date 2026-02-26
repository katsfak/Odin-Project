import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createComment(req, res) {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Content required" });
    }

    if (content.length > 280) {
      return res
        .status(400)
        .json({ error: "Content too long (max 280 chars)" });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: req.userId,
        postId,
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
          select: { likes: true },
        },
      },
    });

    const enrichedComment = {
      ...comment,
      likes: comment._count.likes,
    };

    res.status(201).json(enrichedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment" });
  }
}

export async function getPostComments(req, res) {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const comments = await prisma.comment.findMany({
      where: { postId },
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
          select: { likes: true },
        },
        likes: {
          where: { userId: req.userId },
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.comment.count({
      where: { postId },
    });

    const enrichedComments = comments.map((comment) => ({
      ...comment,
      liked: comment.likes.length > 0,
      likes: comment._count.likes,
    }));

    res.json({
      comments: enrichedComments,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

export async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.authorId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Cannot delete another user's comment" });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
}
