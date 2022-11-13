import { client } from "../../../prisma/client";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";
import { UpdateUserUsernameController } from "./updateUserUsernameController";
import { UpdateUserUsernameCase } from "./updateUserUsernameCase";

export const updateUserUsername = () => {
  const primaUserRepository         = new PrismaUserRepository(client);
  const updateUserUsernameCase         = new UpdateUserUsernameCase(primaUserRepository);
  const updateUserUsernameController   = new UpdateUserUsernameController(updateUserUsernameCase);

  return updateUserUsernameController;
};
