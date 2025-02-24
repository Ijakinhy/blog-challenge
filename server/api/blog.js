import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const blogPosts = await prisma.blogChallenge.findMany();

    return blogPosts;
  } catch (error) {
    console.error("Database Error:", error);
    setResponseStatus(event, 500);
    return { error: "Failed to fetch blog posts" };
  } finally {
    await prisma.$disconnect();
  }
});
