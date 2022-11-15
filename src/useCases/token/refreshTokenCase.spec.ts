import { User } from "@prisma/client";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { describe,it, beforeEach, expect } from "vitest";
import { TokenRepositoryInMemory } from "../../repository/in-memory/TokenRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../repository/in-memory/UsersRepositoryInMemory";
import { ITokenRepository } from "../../repository/ITokenRepositories";
import { IRegisterUserRequest, IUserRepository } from "../../repository/IUserRepositories";

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

    it("should not be able to refresh because user token is invalid", async () => {
        await expect(refreshTokenUserCase.execute("testeId")).rejects.toEqual(

            new Error("Refresh token is invalid.")
        );    
    })

    it("should  be able to refresh user token", async () => {
        const user : IRegisterUserRequest = {
            email: "test",
            password: "test",
            username: "test"
        }

        const newUser = await userRepositoryInMemory.register(user)
        const refresh_token = await tokenRepositoryInMemory.create(newUser.id)
    
        
        expect(await refreshTokenUserCase.execute(newUser.id)).haveOwnProperty("token")
    })
})