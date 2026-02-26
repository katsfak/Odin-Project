import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.highScore.deleteMany({});
  await prisma.character.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.image.deleteMany({});

  // Create sample images
  const image1 = await prisma.image.create({
    data: {
      title: "Beach Scene",
      imageUrl:
        "https://via.placeholder.com/1200x800?text=Beach+Scene+Where+is+Waldo",
      description: "Find the hidden characters in this busy beach scene",
    },
  });

  const image2 = await prisma.image.create({
    data: {
      title: "Winter Landscape",
      imageUrl: "https://via.placeholder.com/1200x800?text=Winter+Landscape",
      description: "Search for characters in this snowy landscape",
    },
  });

  // Add characters to image 1
  // These are example coordinates - you'll update these based on your actual images
  await prisma.character.createMany({
    data: [
      {
        imageId: image1.id,
        name: "Waldo",
        pixelX: 450,
        pixelY: 350,
        radius: 30,
      },
      {
        imageId: image1.id,
        name: "Wilma",
        pixelX: 650,
        pixelY: 400,
        radius: 30,
      },
      {
        imageId: image1.id,
        name: "Wizard Whitebeard",
        pixelX: 150,
        pixelY: 200,
        radius: 30,
      },
    ],
  });

  // Add characters to image 2
  await prisma.character.createMany({
    data: [
      {
        imageId: image2.id,
        name: "Waldo",
        pixelX: 500,
        pixelY: 300,
        radius: 30,
      },
      {
        imageId: image2.id,
        name: "Odlaw",
        pixelX: 200,
        pixelY: 450,
        radius: 30,
      },
    ],
  });

  console.log("Seed data created successfully");
  console.log("Created 2 images with characters");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
