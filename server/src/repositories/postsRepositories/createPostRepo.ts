import { CreatePostData } from "../../models/CreatePostData"
import { PrismaClient } from "../../prisma/generated/prisma"


const createPostRepo = async (data: CreatePostData) => {

  const prisma = new PrismaClient();

  try {
    const newPost = await prisma.posts.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        cover_image_url: data.cover_image_url,
        author: {
          connect: { id: data.authorId },
        },
        category: {
          connect: { id: data.categoryId }
        },
        tags: {
          connect: data.tagIds?.map(id => ({ id })) || []
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            bio: true,
            profile_picture_url: true,
            role: true
          }
        },
        category: true,
        tags: true
      }
    })

    return newPost;
  } catch (error) {
    console.error("Error creating post in repository", error);
    throw error;
  }
}

export { createPostRepo }