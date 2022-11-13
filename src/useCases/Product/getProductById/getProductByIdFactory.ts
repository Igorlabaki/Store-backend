import { client } from "../../../prisma/client";
import { GetProductByIdCase } from "./getProductByIdCase";
import { GetProductByIdController } from "./getProductByIdController";
import { PrismaProductRepository } from "../../../repository/prisma/PrismaProductRepository";

export const getProductByIdFactory = () => {
  const primaProductRepository    = new PrismaProductRepository(client);
  const getProductByIdCase        = new GetProductByIdCase(primaProductRepository);
  const getProductByIdController  = new GetProductByIdController(getProductByIdCase);

  return getProductByIdController;
};
