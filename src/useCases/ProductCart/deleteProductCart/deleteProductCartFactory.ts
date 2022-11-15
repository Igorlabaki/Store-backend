import { client } from "../../../prisma/client";
import { DeleteProductCartCase } from "./deleteProductCartCase";
import { DeleteProductCartController } from "./deleteProductCartController";
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository";
import { PrismaProductCartRepository } from "../../../repository/prisma/PrismaProductCartRepository";

export const deleteProductCartFactory = () => {
  const prismaCartRepository          = new PrismaCartRepository(client);
  const prismaProductCartRepository   = new PrismaProductCartRepository(client);
  const deleteProductCartCase         = new DeleteProductCartCase(prismaCartRepository,prismaProductCartRepository);
  const deleteProductCartController   = new DeleteProductCartController(deleteProductCartCase);

  return deleteProductCartController;
};
