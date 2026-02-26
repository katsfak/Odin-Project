import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/password.js";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.groupMessage.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.friendship.deleteMany({});
  await prisma.groupChat.deleteMany({});
  await prisma.user.deleteMany({});

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      username: "alice",
      email: "alice@example.com",
      passwordHash: await hashPassword("password123"),
      bio: "Love coding and coffee ☕",
      isOnline: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "bob",
      email: "bob@example.com",
      passwordHash: await hashPassword("password123"),
      bio: "Full-stack developer",
      isOnline: true,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: "charlie",
      email: "charlie@example.com",
      passwordHash: await hashPassword("password123"),
      bio: "UI/UX designer",
      isOnline: false,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: "diana",
      email: "diana@example.com",
      passwordHash: await hashPassword("password123"),
      bio: "Product manager",
      isOnline: true,
    },
  });

  // Create friendships
  await prisma.friendship.create({
    data: {
      user1Id: user1.id,
      user2Id: user2.id,
      status: "accepted",
    },
  });

  await prisma.friendship.create({
    data: {
      user1Id: user1.id,
      user2Id: user3.id,
      status: "accepted",
    },
  });

  await prisma.friendship.create({
    data: {
      user1Id: user2.id,
      user2Id: user4.id,
      status: "accepted",
    },
  });

  // Create sample messages
  await prisma.message.create({
    data: {
      content: "Hey Alice! How are you doing today?",
      senderId: user2.id,
      recipientId: user1.id,
    },
  });

  await prisma.message.create({
    data: {
      content: "Hi Bob! Doing great, just finished a project 🎉",
      senderId: user1.id,
      recipientId: user2.id,
    },
  });

  await prisma.message.create({
    data: {
      content: "Want to grab coffee later?",
      senderId: user1.id,
      recipientId: user3.id,
    },
  });

  console.log("Seed data created successfully");
  console.log("Created 4 sample users with friendships and messages");
  console.log("\nTest login credentials:");
  console.log("Username: alice, Password: password123");
  console.log("Username: bob, Password: password123");
  console.log("Username: charlie, Password: password123");
  console.log("Username: diana, Password: password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
