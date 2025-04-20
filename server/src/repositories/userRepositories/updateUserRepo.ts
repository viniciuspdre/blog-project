import { UpdateUserData } from "../../models/UpdateUserData";
import { PrismaClient } from "../../prisma/generated/prisma"


const updateUserRepo = async (id: number, data: UpdateUserData) => {
  const prisma = new PrismaClient();

  try {
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        name: data.name,
        bio: data.bio,
        profile_picture_url: data.profile_picture_url
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        profile_picture_url: true,
        role: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      }
    });

    return updatedUser;
  } catch (error) {
    console.error("Error in repository updating data");
    throw error;
  } finally {
    prisma.$disconnect();
  }
}

export { updateUserRepo };