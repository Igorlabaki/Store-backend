import { describe,it,expect, beforeEach } from "vitest";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { ITokenRepository } from "../../../repository/ITokenRepositories";
import { TokenRepositoryInMemory } from "../../../repository/in-memory/TokenRepositoryInMemory";
import { AuthenticateUserCase } from "./authenticateUserCase";
import { hash } from "bcryptjs";

describe("Register User", async () => {
    let userRepository      : IUserRepository;
    let tokenRepository     : ITokenRepository;
    let authenticateUserCase: AuthenticateUserCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository          = new UsersRepositoryInMemory();
        tokenRepository         = new TokenRepositoryInMemory();
        authenticateUserCase    = new AuthenticateUserCase(userRepository,tokenRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository       = new UsersRepositoryInMemory();
            tokenRepository      = new TokenRepositoryInMemory();
            authenticateUserCase = new AuthenticateUserCase(userRepository,tokenRepository);
        }
    })

    const passwordHash = await hash("test", 8)

    const user : IRegisterUserRequest  = {
        email: "test",
        password: passwordHash,
        username: "test"
     }

    it("should be able to authenticate user", async () => {
        await userRepository.register(user) 

        const data = await authenticateUserCase.execute({password:"test",email:"test"})
  
        expect(data).haveOwnProperty("token")
    }); 
    
    it("should not be able to authenticate beacause email is wrong", async () => {
        await userRepository.register(user)
         
        await expect(authenticateUserCase.execute({password:"test",email:"testWrong"})).rejects.toEqual(
            new Error("User or password incorrect.")
        ); 
    });

    it("should not be able to authenticate beacause password is wrong", async () => {
        await userRepository.register(user)
         
        await expect(authenticateUserCase.execute({password:"testWrong",email:"test"})).rejects.toEqual(
            new Error("User or password incorrect.")
        ); 
    });
})