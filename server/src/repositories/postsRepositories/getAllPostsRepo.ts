import { PrismaClient } from "../../prisma/generated/prisma";


const getAllPlayersRepo = async () => {
  const prisma = new PrismaClient();

  try {
    
    return prisma.posts.findMany();

  } catch (error) {

    console.error("We've got an unexpected error getting posts from database", error);
    throw error;

  } finally {
    prisma.$disconnect();
  }
}

export { getAllPlayersRepo };