import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/password.js";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Seeding database...");

    // Clear existing data
    await prisma.commentLike.deleteMany();
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.user.deleteMany();

    // Create test users
    const users = [];
    const testUsers = [
      { username: "alice", email: "alice@example.com" },
      { username: "bob", email: "bob@example.com" },
      { username: "charlie", email: "charlie@example.com" },
      { username: "diana", email: "diana@example.com" },
    ];

    for (const testUser of testUsers) {
      const password = await hashPassword("password123");
      const user = await prisma.user.create({
        data: {
          username: testUser.username,
          email: testUser.email,
          passwordHash: password,
          bio: faker.person.bio(),
          profileImage: `https://i.pravatar.cc/150?img=${Math.random() * 70}`,
        },
      });
      users.push(user);
    }

    console.log(`Created ${users.length} users`);

    // Create follow relationships (alice, bob, charlie follow diana)
    for (let i = 0; i < 3; i++) {
      await prisma.follow.create({
        data: {
          followerId: users[i].id,
          followingId: users[3].id,
          status: "accepted",
        },
      });
    }

    // alice and bob follow each other
    await prisma.follow.create({
      data: {
        followerId: users[0].id,
        followingId: users[1].id,
        status: "accepted",
      },
    });

    await prisma.follow.create({
      data: {
        followerId: users[1].id,
        followingId: users[0].id,
        status: "accepted",
      },
    });

    console.log("Created follow relationships");

    // Create sample posts from diana (most followed)
    for (let i = 0; i < 5; i++) {
      const post = await prisma.post.create({
        data: {
          content: faker.lorem.sentences(2),
          authorId: users[3].id,
        },
      });

      // Add some likes and comments
      for (let j = 0; j < Math.floor(Math.random() * 3); j++) {
        const likerIndex = Math.floor(Math.random() * 3);
        try {
          await prisma.like.create({
            data: {
              userId: users[likerIndex].id,
              postId: post.id,
            },
          });
        } catch (e) {
          // Ignore duplicate likes
        }
      }

      // Add comments
      if (Math.random() > 0.5) {
        const commenterIndex = Math.floor(Math.random() * 3);
        const comment = await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            authorId: users[commenterIndex].id,
            postId: post.id,
          },
        });

        // Like some comments
        try {
          await prisma.commentLike.create({
            data: {
              userId: users[Math.floor(Math.random() * 3)].id,
              commentId: comment.id,
            },
          });
        } catch (e) {
          // Ignore duplicate likes
        }
      }
    }

    console.log("Created sample posts with likes and comments");

    // Create posts from alice
    for (let i = 0; i < 3; i++) {
      await prisma.post.create({
        data: {
          content: faker.lorem.sentences(2),
          authorId: users[0].id,
        },
      });
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
