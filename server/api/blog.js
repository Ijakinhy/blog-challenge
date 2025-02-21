import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    console.log("Fetching blog posts..."); // Debugging

    const blogPosts = await prisma.blogChallenge.findMany();
    console.log("Fetched posts:", blogPosts); // Debugging

    return blogPosts;
  } catch (error) {
    console.error("Database Error:", error);
    setResponseStatus(event, 500);
    return { error: "Failed to fetch blog posts" };
  } finally {
    await prisma.$disconnect();
  }
});
