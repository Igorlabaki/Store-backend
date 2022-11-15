import { client } from "../../../prisma/client";
import { ListProductCartCase } from "./listProductCartCase";
import { ListProductCartController } from "./listProductCartController";
import { PrismaProductCartRepository } from "../../../repository/prisma/PrismaProductCartRepository";

export const listProductCartFactory = () => {
  const prismaProductCartRepository   = new PrismaProductCartRepository(client);
  const deleteProductCartCase         = new ListProductCartCase(prismaProductCartRepository);
  const deleteProductCartController   = new ListProductCartController(deleteProductCartCase);

  return deleteProductCartController;
};
