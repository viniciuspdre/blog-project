//import {  } from "@prisma/client";
import { PrismaClient, Users } from "../../prisma/generated/prisma";

const prisma = new PrismaClient();

const registerUserRepo = async (name: string, email: string, password_hash: string, profile_picture_url: string | null, role: string) => {
  try {
    const newUser = await prisma.users.create({
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

export { registerUserRepo };