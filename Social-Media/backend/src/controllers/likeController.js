import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function likePost(req, res) {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if already liked
    const existing = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: req.userId,
          postId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Already liked" });
    }

    const like = await prisma.like.create({
      data: {
        userId: req.userId,
        postId,
      },
    });

    // Get updated like count
    const count = await prisma.like.count({
      where: { postId },
    });

    res.status(201).json({ like, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like post" });
  }
}

export async function unlikePost(req, res) {
  try {
    const { postId } = req.params;

    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: req.userId,
          postId,
        },
      },
    });

    if (!like) {
      return res.status(404).json({ error: "Not liked" });
    }

    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: req.userId,
          postId,
        },
      },
    });

    // Get updated like count
    const count = await prisma.like.count({
      where: { postId },
    });

    res.json({ message: "Unliked", count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unlike post" });
  }
}

export async function likeComment(req, res) {
  try {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if already liked
    const existing = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId: req.userId,
          commentId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: "Already liked" });
    }

    const like = await prisma.commentLike.create({
      data: {
        userId: req.userId,
        commentId,
      },
    });

    // Get updated like count
    const count = await prisma.commentLike.count({
      where: { commentId },
    });

    res.status(201).json({ like, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like comment" });
  }
}

export async function unlikeComment(req, res) {
  try {
    const { commentId } = req.params;

    const like = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId: req.userId,
          commentId,
        },
      },
    });

    if (!like) {
      return res.status(404).json({ error: "Not liked" });
    }

    await prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId: req.userId,
          commentId,
        },
      },
    });

    // Get updated like count
    const count = await prisma.commentLike.count({
      where: { commentId },
    });

    res.json({ message: "Unliked", count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to unlike comment" });
  }
}
