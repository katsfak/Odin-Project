import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get all characters for an image
 */
export async function getCharactersByImage(req, res) {
  try {
    const { imageId } = req.params;

    const characters = await prisma.character.findMany({
      where: {
        imageId: parseInt(imageId),
      },
      select: {
        id: true,
        name: true,
        radius: true,
        // Don't send coordinates to frontend for security
      },
    });

    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Create a new character (admin only)
 */
export async function createCharacter(req, res) {
  try {
    const { imageId, name, pixelX, pixelY, radius } = req.body;

    if (!imageId || !name || pixelX === undefined || pixelY === undefined) {
      return res.status(400).json({
        error: "imageId, name, pixelX, and pixelY are required",
      });
    }

    const character = await prisma.character.create({
      data: {
        imageId: parseInt(imageId),
        name,
        pixelX: parseInt(pixelX),
        pixelY: parseInt(pixelY),
        radius: radius ? parseInt(radius) : 30,
      },
    });

    res.status(201).json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get character by ID (admin only - includes coordinates)
 */
export async function getCharacterById(req, res) {
  try {
    const { id } = req.params;

    const character = await prisma.character.findUnique({
      where: { id: parseInt(id) },
    });

    if (!character) {
      return res.status(404).json({ error: "Character not found" });
    }

    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update a character (admin only)
 */
export async function updateCharacter(req, res) {
  try {
    const { id } = req.params;
    const { name, pixelX, pixelY, radius } = req.body;

    const character = await prisma.character.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(pixelX !== undefined && { pixelX: parseInt(pixelX) }),
        ...(pixelY !== undefined && { pixelY: parseInt(pixelY) }),
        ...(radius && { radius: parseInt(radius) }),
      },
    });

    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Delete a character
 */
export async function deleteCharacter(req, res) {
  try {
    const { id } = req.params;

    const character = await prisma.character.delete({
      where: { id: parseInt(id) },
    });

    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
