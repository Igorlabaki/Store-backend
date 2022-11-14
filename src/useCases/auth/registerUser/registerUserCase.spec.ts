import { RegisterUserCase } from "./registerUserCase";
import { describe,it,expect, beforeEach } from "vitest";
import { ITokenRepository } from "../../../repository/ITokenRepositories";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { TokenRepositoryInMemory } from "../../../repository/in-memory/TokenRepositoryInMemory";

describe("Register User", async () => {
    let userRepository: IUserRepository;
    let tokenRepository: ITokenRepository;
    let registerUserCase: RegisterUserCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository = new UsersRepositoryInMemory();
        tokenRepository = new TokenRepositoryInMemory();
        registerUserCase = new RegisterUserCase(userRepository,tokenRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository = new UsersRepositoryInMemory();
            tokenRepository = new TokenRepositoryInMemory();
            registerUserCase = new RegisterUserCase(userRepository,tokenRepository);
        }
    })

    const user : IRegisterUserRequest  = {
        email: "test",
        password: "test",
        username: "test"
     }

    it("should be able to create user", async () => {
        const data = await registerUserCase.execute(user)
  
        expect(data).haveOwnProperty("token")
    }); 
    
    it("should be able cripto the password", async () => {
        const data = await registerUserCase.execute(user)
        const userDb = await userRepository.getById(data.refreshToken.userId)
        
        expect(user.password === userDb.password).false;
    });  

    it("should not be able to create a user beacause he already have a account", async () => {
        await registerUserCase.execute(user)
         
        await expect(registerUserCase.execute(user)).rejects.toEqual(
            new Error("User already exists.")
        ); 
    });

    it("should not be able to create product if any field is empty", async () => {   
        const userTest : IRegisterUserRequest  = {
            email: "",
            password: "",
            username: ""
        }

        await expect(registerUserCase.execute(userTest)).rejects.toEqual(
            new Error(`All inputs are required`)
        ); 
    });  
})