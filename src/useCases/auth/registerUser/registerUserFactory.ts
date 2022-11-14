import { client } from "../../../prisma/client";
import { RegisterUserCase } from "./registerUserCase";
import { RegisterUserController } from "./registerUserController";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";
import { PrismaTokenRepository } from "../../../repository/prisma/PrismaTokenRepository";

export const registerUserFactory = () => {
  const prismaUserRepository     = new PrismaUserRepository(client);
  const tokenRepository          = new PrismaTokenRepository(client);
  const registerUsersCase        = new RegisterUserCase(prismaUserRepository,tokenRepository);
  const registerUserController   = new RegisterUserController(registerUsersCase);

  return registerUserController;
};
