import { client } from "../../../prisma/client";
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository";
import { GetCartByIdCase } from "../getCartById/getCartByIdCase";
import { GetCartByIdController } from "../getCartById/getCartByIdController";

export const getCartByUserIdFactory = () => {
  const primaCartRepository         = new PrismaCartRepository(client);
  const getCartByUserIdCase         = new GetCartByIdCase(primaCartRepository);
  const getCartByUserIdController   = new GetCartByIdController(getCartByUserIdCase);

  return getCartByUserIdController;
};
