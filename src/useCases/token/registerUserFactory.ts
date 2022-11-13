import { client } from "../../prisma/client";
import { PrismaTokenRepository } from "../../repository/prisma/PrismaTokenRepository";
import { PrismaUserRepository } from "../../repository/prisma/PrismaUserRepository";
import { RefreshTokenUserCase } from "./refreshTokenUserCase";
import { RefreshTokenUserController } from "./refreshTokenUserController";

export const registerUserFactory = () => {
  const primaUserRepository      = new PrismaUserRepository(client);
  const prismaTokenRepository    = new PrismaTokenRepository(client);
  const refreshTokensCase        = new RefreshTokenUserCase(primaUserRepository,prismaTokenRepository);
  const refreshTokenController   = new RefreshTokenUserController(refreshTokensCase);

  return refreshTokenController;
};
