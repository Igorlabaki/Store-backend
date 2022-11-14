import { client } from "../../../prisma/client";
import { PrismaTokenRepository } from "../../../repository/prisma/PrismaTokenRepository";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";
import { AuthenticateUserCase } from "./authenticateUserCase";
import { AuthenticateUserController } from "./authenticateUserController";

export const authenticateUserFactory = () => {
  const prismaUserRepository         = new PrismaUserRepository(client);
  const prismTokenRepository         = new PrismaTokenRepository(client);
  const authenticateUserCase         = new AuthenticateUserCase(prismaUserRepository,prismTokenRepository);
  const authenticateUserController   = new AuthenticateUserController(authenticateUserCase);

  return authenticateUserController;
};
