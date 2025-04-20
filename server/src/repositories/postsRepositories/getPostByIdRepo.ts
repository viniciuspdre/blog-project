import { PrismaClient } from "../../prisma/generated/prisma"


const getPostByIdRepo = async (id: number) => {
  const prisma = new PrismaClient();

  try {
    const post = await prisma.posts.findUnique(
      {
        where: { id },
        select: {
          author: true,
          content: true,
          title: true,
          id: true,
          comments: true,
          cover_image_url: true,
          category: true,
          published_at: true,
        }
      });

      return post;
  } catch (error) {
    console.error("Error getting data about post", error);
  }
}

export { getPostByIdRepo }