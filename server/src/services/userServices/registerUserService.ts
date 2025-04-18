import { hashPassword, comparePassword } from "../../utils/hash-password-helper"
import { registerUserRepo } from "../../repositories/userRepositories/registerUserRepo";
import { uploadToS3 } from "../../config/aws-sdk-config";
import { badRequest, conflict, created } from "../../utils/http-helper";
import { HttpResponse } from "../../models/http-response-models";
import { PrismaClient } from "../../prisma/generated/prisma";


const registerUserService = async (name: string, email: string, password_hash: string, profile_picture_url: Express.Multer.File | undefined, role: string): Promise<HttpResponse> => {

  let response: HttpResponse | null = null;

  if (!name || !email || !password_hash) { // verifica se falta algum conteúdo obrigatório
    response = await badRequest("Envie os dados de cadastro corretamente.");
    return response;
  }

  const prisma = new PrismaClient();

  if (await prisma.users.findUnique({ where: { email } })) {
    response = await conflict("Esse e-mail já foi cadastrado.");
    return response;
  }

  const hashedPassword = await hashPassword(password_hash);

  let profilePictureUrl: string | null = null;
  if (profile_picture_url) {
    profilePictureUrl = await uploadToS3(profile_picture_url, 'users/profile-pictures/');
  }

  const newUser = await registerUserRepo(name, email, hashedPassword, profilePictureUrl, role);
  response = await created(newUser)
  return response;
}

export { registerUserService }