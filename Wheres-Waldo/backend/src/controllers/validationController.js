import { PrismaClient } from "@prisma/client";
import { isClickValid } from "../utils/coordinateUtils.js";

const prisma = new PrismaClient();

/**
 * Validate if a click is at the correct location for a character
 *
 * Request body:
 * {
 *   characterId: number,
 *   clickX: number (image pixel coordinate),
 *   clickY: number (image pixel coordinate)
 * }
 *
 * Response:
 * {
 *   correct: boolean,
 *   character: { id, name } (if correct),
 *   message: string
 * }
 */
export async function validateClick(req, res) {
  try {
    const { characterId, clickX, clickY } = req.body;

    if (
      characterId === undefined ||
      clickX === undefined ||
      clickY === undefined
    ) {
      return res.status(400).json({
        error: "characterId, clickX, and clickY are required",
      });
    }

    const character = await prisma.character.findUnique({
      where: { id: parseInt(characterId) },
    });

    if (!character) {
      return res.status(404).json({
        correct: false,
        error: "Character not found",
      });
    }

    // Check if click is within tolerance
    const correct = isClickValid(
      parseInt(clickX),
      parseInt(clickY),
      character.pixelX,
      character.pixelY,
      character.radius,
    );

    if (correct) {
      res.json({
        correct: true,
        character: {
          id: character.id,
          name: character.name,
        },
        message: `Found ${character.name}!`,
      });
    } else {
      res.json({
        correct: false,
        message: "Not quite! Try again.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
