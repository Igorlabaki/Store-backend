import { client } from "../../../prisma/client";
import { ListCartsCase } from "./listCartsCase";
import { ListCartsController } from "./listCartsController";
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository";

export const listCartFactory = () => {
  const primaCartRepository  = new PrismaCartRepository(client);
  const listCartsCase        = new ListCartsCase(primaCartRepository);
  const listCartController   = new ListCartsController(listCartsCase);

  return listCartController;
};
