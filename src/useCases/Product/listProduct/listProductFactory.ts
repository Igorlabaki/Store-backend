import { client } from "../../../prisma/client";
import { PrismaProductRepository } from "../../../repository/prisma/PrismaProductRepository";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";
import { ListProductCase } from "./ListProductCase";
import { ListProductController } from "./ListProductController";

export const listProductFactory = () => {
  const primaUserRepository     = new PrismaProductRepository(client);
  const listProductsCase        = new ListProductCase(primaUserRepository);
  const listProductController   = new ListProductController(listProductsCase);

  return listProductController;
};
