const prisma = require("../db/prisma");

async function listComments(req, res, next) {
  try {
    const postId = Number(req.params.postId);
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!post.published && !req.user) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
    });

    return res.json(comments);
  } catch (err) {
    return next(err);
  }
}

async function createComment(req, res, next) {
  try {
    const postId = Number(req.params.postId);
    const { content, authorName, authorEmail } = req.body;

    if (!content || !authorName) {
      return res
        .status(400)
        .json({ error: "Content and authorName are required" });
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!post.published && !req.user) {
      return res.status(403).json({ error: "Post is not published" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorName,
        authorEmail: authorEmail || null,
        postId,
      },
    });

    return res.status(201).json(comment);
  } catch (err) {
    return next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    const id = Number(req.params.commentId);

    await prisma.comment.delete({ where: { id } });

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listComments,
  createComment,
  deleteComment,
};
