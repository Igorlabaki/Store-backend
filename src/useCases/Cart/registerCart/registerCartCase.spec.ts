import { v4 as uuid } from "uuid";
import { RegisterCartCase } from "./registerCartCase";
import { describe,it,expect, beforeEach } from "vitest";
import { ICartRepository } from "../../../repository/ICartRepositories";
import { IUserRepository } from "../../../repository/IUserRepositories";
import { CartRepositoryInMemory } from "../../../repository/in-memory/CartRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";

describe("Register User", async () => {
    let userRepository: IUserRepository;
    let cartRepository: ICartRepository;
    let registerCartCase: RegisterCartCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository = new UsersRepositoryInMemory();
        cartRepository = new CartRepositoryInMemory();
        registerCartCase = new RegisterCartCase(cartRepository,userRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository = new UsersRepositoryInMemory();
            cartRepository = new CartRepositoryInMemory();
            registerCartCase = new RegisterCartCase(cartRepository,userRepository);
        }
    })

    it("should not be able to register a cart because user not exists", async () => {
        expect(registerCartCase.execute(uuid())).rejects.toEqual(
            new Error("User not founded.")
        ); 
    }); 
    
    /* it("should be able cripto the password", async () => {
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
    });   */
})