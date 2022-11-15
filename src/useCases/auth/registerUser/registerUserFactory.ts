import { client } from "../../../prisma/client";
import { RegisterUserCase } from "./registerUserCase";
import { RegisterUserController } from "./registerUserController";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";
import { PrismaTokenRepository } from "../../../repository/prisma/PrismaTokenRepository";

export const registerUserFactory = () => {
  const prismaUserRepository     = new PrismaUserRepository(client);
  const prismaTokenRepository    = new PrismaTokenRepository(client);
  const registerUsersCase        = new RegisterUserCase(prismaUserRepository,prismaTokenRepository);
  const registerUserController   = new RegisterUserController(registerUsersCase);

  return registerUserController;
};
