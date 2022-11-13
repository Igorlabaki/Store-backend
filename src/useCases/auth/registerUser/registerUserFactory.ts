import { client } from "../../../prisma/client";
import { RegisterUserCase } from "./registerUserCase";
import { RegisterUserController } from "./registerUserController";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";

export const registerUserFactory = () => {
  const prismaUserRepository     = new PrismaUserRepository(client);
  const registerUsersCase        = new RegisterUserCase(prismaUserRepository);
  const registerUserController   = new RegisterUserController(registerUsersCase);

  return registerUserController;
};
