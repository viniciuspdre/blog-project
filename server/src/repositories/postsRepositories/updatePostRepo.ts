import { UpdatePostData } from "../../models/UpdatePostData";
import { PrismaClient } from "../../prisma/generated/prisma";


const updatePostRepo = async (id: number, data: UpdatePostData) => {
  const prisma = new PrismaClient();

  try {
    const updatedPost = prisma.posts.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        cover_image_url: data.cover_image_url,
        slug: data.slug
      }
    });


    return updatedPost;
  }  catch (error) {
    console.error("There's an error updating the post on database:",error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
}

export { updatePostRepo };