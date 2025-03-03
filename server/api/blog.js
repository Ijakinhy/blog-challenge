import { prisma } from "~/prisma";

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
