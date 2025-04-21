import { PrismaClient } from "../../prisma/generated/prisma"


const deletePostRepo = async (id: number) => {
  const prisma = new PrismaClient();

  try {
    const deletedPost = prisma.posts.delete({
      where: { id }
    });

    return deletedPost;
  } catch (error) {
    console.error("There's an error deleting the user", error);
    throw error;
  }
}

export { deletePostRepo };