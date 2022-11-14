import { client } from "../../../prisma/client";
import { RegisterCartCase } from "./registerCartCase";
import { RegisterCartController } from "./registerCartController";
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";

export const registerCartFactory = () => {
  const primaCartRepository      = new PrismaCartRepository(client);
  const primaUserRepository      = new PrismaUserRepository(client);
  const registerCartsCase        = new RegisterCartCase(primaCartRepository,primaUserRepository);
  const registerCartController   = new RegisterCartController(registerCartsCase);

  return registerCartController;
};
