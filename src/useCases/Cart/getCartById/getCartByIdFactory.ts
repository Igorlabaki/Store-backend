import { client } from "../../../prisma/client";
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository";
import { GetCartByIdCase } from "./getCartByIdCase";
import { GetCartByIdController } from "./getCartByIdController";

export const getCartByIdFactory = () => {
  const primaCartRepository  = new PrismaCartRepository(client);
  const getCartByIdCase        = new GetCartByIdCase(primaCartRepository);
  const getCartByIdController   = new GetCartByIdController(getCartByIdCase);

  return getCartByIdController;
};
