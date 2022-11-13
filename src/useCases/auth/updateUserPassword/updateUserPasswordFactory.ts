import { client } from "../../../prisma/client";
import { UpdateUserPasswordCase } from "./updateUserPasswordCase";
import { UpdateUserPasswordController } from "./updateUserPaswordController";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";

export const updateUserFactory = () => {
  const primaUserRepository         = new PrismaUserRepository(client);
  const updateUserPasswordCase         = new UpdateUserPasswordCase(primaUserRepository);
  const updateUserPasswordController   = new UpdateUserPasswordController(updateUserPasswordCase);

  return updateUserPasswordController;
};
