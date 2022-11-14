import { describe,it, beforeEach } from "vitest";
import { TokenRepositoryInMemory } from "../../repository/in-memory/TokenRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repository/in-memory/UsersRepositoryInMemory";
import { ITokenRepository } from "../../repository/ITokenRepositories";
import { IUserRepository } from "../../repository/IUserRepositories";

import { RefreshTokenUserCase } from "./refreshTokenUserCase";

describe("Refresh token Repository", async () => {
    let tokenRepositoryInMemory: ITokenRepository;
    let userRepositoryInMemory: IUserRepository;
    let refreshTokenUserCase: RefreshTokenUserCase;
  
    beforeEach(async () => {
        // called once before all tests run
        tokenRepositoryInMemory = new TokenRepositoryInMemory();
        userRepositoryInMemory  = new UsersRepositoryInMemory();
        refreshTokenUserCase    = new RefreshTokenUserCase(userRepositoryInMemory,tokenRepositoryInMemory);
        // clean up function, called once after all tests run
        return async () => {
            tokenRepositoryInMemory = new TokenRepositoryInMemory();
            userRepositoryInMemory  = new UsersRepositoryInMemory();
            refreshTokenUserCase    = new RefreshTokenUserCase(userRepositoryInMemory,tokenRepositoryInMemory);
        }
    })

    it("should be able to refresh user token", async () => {
        

    });

   /*  it("should not be able to return a list of products", async () => {

        await expect(deleteProductCase.execute("testeId")).rejects.toEqual(

            new Error("Product do not exists.")

        ); 
    });  */
})