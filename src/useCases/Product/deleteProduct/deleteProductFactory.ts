import { client } from "../../../prisma/client";
import { DeleteProductCase } from "./deleteProductCase";
import { DeleteProductController } from "./deleteProductController";
import { PrismaProductRepository } from "../../../repository/prisma/PrismaProductRepository";

export const deleteProductFactory = () => {
  const primaProductRepository   = new PrismaProductRepository(client);
  const deleteProductCase        = new DeleteProductCase(primaProductRepository);
  const deleteProductController  = new DeleteProductController(deleteProductCase);

  return deleteProductController;
};
