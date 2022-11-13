import { client } from "../../../prisma/client";
import { UpdateProductNameCase } from "./updateProductNameCase";
import { UpdateProductNameController } from "./updateProductNameController";
import { PrismaProductRepository } from "../../../repository/prisma/PrismaProductRepository";

export const updateProductNameFactory = () => {
  const primaProductRepository    = new PrismaProductRepository(client);
  const getProductByIdCase        = new UpdateProductNameCase(primaProductRepository);
  const getProductByIdController  = new UpdateProductNameController(getProductByIdCase);

  return getProductByIdController;
};
