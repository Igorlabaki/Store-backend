import {v4 as uuid} from "uuid"
import { describe,it, beforeEach, expect } from "vitest";
import { GenerateRefreshToken } from "./GenerateRefreshToken";
import { ITokenRepository } from "../repository/ITokenRepositories";
import { TokenRepositoryInMemory } from "../repository/in-memory/TokenRepositoryInMemory";

describe("Generate refresh token", async () => {
    let tokenRepositoryInMemory: ITokenRepository;
    let refreshTokenUserCase: GenerateRefreshToken;
  
    beforeEach(async () => {
        // called once before all tests run
        tokenRepositoryInMemory = new TokenRepositoryInMemory();
        refreshTokenUserCase    = new GenerateRefreshToken(tokenRepositoryInMemory);
        // clean up function, called once after all tests run
        return async () => {
            tokenRepositoryInMemory = new TokenRepositoryInMemory();
            refreshTokenUserCase    = new GenerateRefreshToken(tokenRepositoryInMemory);
        }
    })

    it("should be able to generate refresh token", async () => {
        const newUserToken = await tokenRepositoryInMemory.create(uuid())

        expect(await refreshTokenUserCase.execute(newUserToken.userId)).haveOwnProperty("id")
    });
})