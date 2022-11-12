import { client } from "../../../prisma/client";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";
import { ListUserCase } from "./listUserCase";
import { ListUserController } from "./listUserController";


export const listUserFactory = () => {
  const primaUserRepository  = new PrismaUserRepository(client);
  const listUsersCase        = new ListUserCase(primaUserRepository);
  const listUserController   = new ListUserController(listUsersCase);

  return listUserController;
};
