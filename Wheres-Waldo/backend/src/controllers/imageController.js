import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get all game images
 */
export async function getAllImages(req, res) {
  try {
    const images = await prisma.image.findMany({
      include: {
        characters: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get a single image with all its characters
 */
export async function getImageById(req, res) {
  try {
    const { id } = req.params;
    const image = await prisma.image.findUnique({
      where: { id: parseInt(id) },
      include: {
        characters: true,
      },
    });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Create a new image (admin only)
 */
export async function createImage(req, res) {
  try {
    const { title, imageUrl, description } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ error: "Title and imageUrl are required" });
    }

    const image = await prisma.image.create({
      data: {
        title,
        imageUrl,
        description,
      },
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Delete an image
 */
export async function deleteImage(req, res) {
  try {
    const { id } = req.params;
    const image = await prisma.image.delete({
      where: { id: parseInt(id) },
    });

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
