import { client } from "../../../prisma/client";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";
import { UpdateUserPasswordCase } from "./updateUserPasswordCase";
import { UpdateUserPasswordController } from "./updateUserPaswordController";

export const updateUserPassword = () => {
  const primaUserRepository         = new PrismaUserRepository(client);
  const updateUserPasswordCase         = new UpdateUserPasswordCase(primaUserRepository);
  const updateUserPasswordController   = new UpdateUserPasswordController(updateUserPasswordCase);

  return updateUserPasswordController;
};
