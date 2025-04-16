import { PrismaClient } from "@prisma/client";
import { User } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

const insertUserRepo = async (name: string, email: string, password_hash: string, profile_picture_url: string) => {
  try {
    const newUser: User = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
        profile_picture_url,
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
    return newUser;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { insertUserRepo };