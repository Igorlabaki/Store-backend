import {v4 as uuid} from "uuid"
import { describe,it, beforeEach, expect } from "vitest";
import { GenerateRefreshToken } from "./GenerateRefreshToken";
import { ITokenRepository } from "../repository/ITokenRepositories";
import { TokenRepositoryInMemory } from "../repository/in-memory/TokenRepositoryInMemory";
import { GenerateTokenProvider } from "./GenerateTokenProvider";
import { User } from "@prisma/client";

describe("Generate refresh token", async () => {
    let generateTokenProvider: GenerateTokenProvider;
  
    beforeEach(async () => {
        // called once before all tests run
            generateTokenProvider    = new GenerateTokenProvider();
        // clean up function, called once after all tests run
        return async () => {
            generateTokenProvider    = new GenerateTokenProvider();
        }
    })

    const userInputData: User  = {
        id: uuid(),
        email: "teste@gmail.com",
        password: "teste",
        username: "teste"
    }

    it("should be able to generate refresh token", async () => {
        const data = await generateTokenProvider.execute(userInputData)
        expect(data).toBeTypeOf("string")
    });
})