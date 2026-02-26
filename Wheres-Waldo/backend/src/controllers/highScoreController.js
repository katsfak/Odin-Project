import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get top high scores for an image
 */
export async function getHighScoresByImage(req, res) {
  try {
    const { imageId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const highScores = await prisma.highScore.findMany({
      where: {
        imageId: parseInt(imageId),
      },
      orderBy: {
        timeInSeconds: "asc",
      },
      take: limit,
    });

    res.json(highScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Create a new high score
 */
export async function createHighScore(req, res) {
  try {
    const { imageId, playerName, timeInSeconds } = req.body;

    if (!imageId || !playerName || timeInSeconds === undefined) {
      return res.status(400).json({
        error: "imageId, playerName, and timeInSeconds are required",
      });
    }

    // Get the 10th best score for this image
    const topScores = await prisma.highScore.findMany({
      where: { imageId: parseInt(imageId) },
      orderBy: { timeInSeconds: "asc" },
      take: 10,
    });

    // Check if this score qualifies
    if (topScores.length >= 10) {
      const worstTopScore = topScores[topScores.length - 1];
      if (timeInSeconds > worstTopScore.timeInSeconds) {
        return res.status(400).json({
          error: "Score does not qualify for top 10",
          qualifies: false,
        });
      }
    }

    const highScore = await prisma.highScore.create({
      data: {
        imageId: parseInt(imageId),
        playerName,
        timeInSeconds: parseInt(timeInSeconds),
      },
    });

    res.status(201).json({
      success: true,
      highScore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get all high scores across all images
 */
export async function getAllHighScores(req, res) {
  try {
    const highScores = await prisma.highScore.findMany({
      include: {
        image: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        timeInSeconds: "asc",
      },
      take: 50,
    });

    res.json(highScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
