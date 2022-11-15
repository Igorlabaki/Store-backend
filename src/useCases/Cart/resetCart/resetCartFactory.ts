import { client } from "../../../prisma/client";
import { ResetCartCase } from "./resetCartCase";
import { ResetCartController } from "./resetCartController";
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";

export const resetCartFactory = () => {
  const primaCartRepository   = new PrismaCartRepository(client);
  const primaUserRepository   = new PrismaUserRepository(client);
  const resetCartsCase        = new ResetCartCase(primaCartRepository,primaUserRepository);
  const resetCartController   = new ResetCartController(resetCartsCase);

  return resetCartController;
};
