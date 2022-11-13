import { client } from "../../../prisma/client";
import { RegisterProductCase } from "./registerProductCase";
import { RegisterProductController } from "./registerProductController";
import { PrismaProductRepository } from "../../../repository/prisma/PrismaProductRepository";

export const registerProductFactory = () => {
  const prismaProductRepository     = new PrismaProductRepository(client);
  const registerProductsCase        = new RegisterProductCase(prismaProductRepository);
  const registerProductController   = new RegisterProductController(registerProductsCase);

  return registerProductController;
};
