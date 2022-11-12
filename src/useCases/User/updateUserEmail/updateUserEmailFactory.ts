import { client } from "../../../prisma/client";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";
import { UpdateUserEmailCase } from "./updateUserEmailCase";
import { UpdateUserEmailController } from "./updateUserEmailController";

export const updateUserEmail = () => {
  const primaUserRepository         = new PrismaUserRepository(client);
  const updateUserEmailCase         = new UpdateUserEmailCase(primaUserRepository);
  const updateUserEmailController   = new UpdateUserEmailController(updateUserEmailCase);

  return updateUserEmailController;
};
