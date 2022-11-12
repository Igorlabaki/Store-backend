import { client } from "../../../prisma/client";
import { GetUserByIdCase } from "./getUserByIdCase";
import { GetUserByIdController } from "./getUserByIdController";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";

export const getUserByIdFactory = () => {
  const primaUserRepository     = new PrismaUserRepository(client);
  const getUserByIdCase         = new GetUserByIdCase(primaUserRepository);
  const getUserByIdController   = new GetUserByIdController(getUserByIdCase);

  return (getUserByIdController);
};
