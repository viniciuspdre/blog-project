import { HttpResponse } from "../../models/http-response-models";
import { PrismaClient } from "../../prisma/generated/prisma";
import { comparePassword } from "../../utils/hash-password-helper";
import { badRequest, internalServerError, notFound, ok, unauthorized } from "../../utils/http-helper";
import jwt from "jsonwebtoken";

const authUserService = async (email: string, password_hash: string): Promise<HttpResponse> => {

  let response: HttpResponse | null = null;

  if (!email || !password_hash) {
    response = await badRequest("Forneça o e-mail e a senha.");
    return response;
  }

  const prisma = new PrismaClient();
  const user = await prisma.users.findUnique(
    {
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        profile_picture_url: true,
        password_hash: true,
        role: true
      }
    }
  )

  if (!user) {
    response = await notFound("Usuário não encontrado.");
    return response;
  }

  const checkPassword: boolean = await comparePassword(password_hash, user.password_hash);
  if (!checkPassword) {
    response = await unauthorized("Senha inválida.");
    return response;
  }

  try {
    
    const secret: string | undefined = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET não foi setado no seu .env")
      throw new Error("JWT_SECRET precisa ser configurada para o sign do JWT.")
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        profile_picture_url: user.profile_picture_url,
        name: user.name
      },
      secret,
      {
        expiresIn: "1d"
      }
    )

    response = await ok({token, user});
  } catch (error) {
    console.log(error);

    response = await internalServerError("Aconteceu um erro no servidor.");
  }

  return response;
}

export { authUserService }