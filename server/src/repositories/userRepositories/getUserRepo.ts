import { PrismaClient } from "../../prisma/generated/prisma";


const getUserRepo = async (id: number) => {

  const prisma = new PrismaClient();

  try {
    
    const user = prisma.users.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        profile_picture_url: true,
        bio: true,
        role: true,
        posts: true,
        comments: true
      }
    });

  return user;

  } catch (error) {
    console.error(`Error finding user with ID ${id}:`, error);
    throw error;
  } finally {
    if (prisma instanceof PrismaClient) {
      await prisma.$disconnect();
    }
  }
}

export { getUserRepo };