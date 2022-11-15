import { client } from "../../../prisma/client";
import { RegisterProductCartCase } from "./registerProductCartCase";
import { RegisterProductCartController } from "./registerProductCartController";
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository";
import { PrismaProductCartRepository } from "../../../repository/prisma/PrismaProductCartRepository";

export const registerProductCartFactory = () => {
  const prismaCartRepository            = new PrismaCartRepository(client);
  const prismaProductCartRepository     = new PrismaProductCartRepository(client);
  const registerProductCartCase         = new RegisterProductCartCase(prismaCartRepository,prismaProductCartRepository);
  const registerProductCartController   = new RegisterProductCartController(registerProductCartCase);

  return registerProductCartController;
};
