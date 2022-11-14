import { client } from "../../../prisma/client";
import { RecoveryUserCase } from "./recoveyUserCase";
import { RecoveryUserController } from "./recoveryUserController";
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository";

export const recoveryUserFactory = () => {
  const prismaUserRepository     = new PrismaUserRepository(client);
  const recoveryUsersCase        = new RecoveryUserCase(prismaUserRepository);
  const recoveryUserController   = new RecoveryUserController(recoveryUsersCase);

  return recoveryUserController;
};
