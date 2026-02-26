const prisma = require("../db/prisma");

async function listPosts(req, res, next) {
  try {
    const includeAll = Boolean(req.user) || req.query.all === "true";
    const posts = await prisma.post.findMany({
      where: includeAll ? {} : { published: true },
      orderBy: { createdAt: "desc" },
      include: { author: { select: { id: true, email: true } } },
    });

    return res.json(posts);
  } catch (err) {
    return next(err);
  }
}

async function getPost(req, res, next) {
  try {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, email: true } } },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!post.published && !req.user) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
  } catch (err) {
    return next(err);
  }
}

async function createPost(req, res, next) {
  try {
    const { title, content, published } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: Boolean(published),
        authorId: req.user.sub,
      },
    });

    return res.status(201).json(post);
  } catch (err) {
    return next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, content, published } = req.body;

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        published: typeof published === "boolean" ? published : undefined,
      },
    });

    return res.json(post);
  } catch (err) {
    return next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const id = Number(req.params.id);

    await prisma.post.delete({ where: { id } });

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
