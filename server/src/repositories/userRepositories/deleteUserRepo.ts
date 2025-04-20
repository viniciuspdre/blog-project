import { PrismaClient } from "../../prisma/generated/prisma";


const deleteUserRepo = async (id: number) => {
  const prisma = new PrismaClient();

  try {
    const deletedUser = prisma.users.delete({
      where: { id }
    });

    return deletedUser;
  } catch (error) {
    console.error("There's an error deleting the user", error);
    throw error;
  }
}

export { deleteUserRepo };