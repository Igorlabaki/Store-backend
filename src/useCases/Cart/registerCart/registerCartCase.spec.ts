import { v4 as uuid } from "uuid";
import { RegisterCartCase } from "./registerCartCase";
import { describe,it,expect, beforeEach } from "vitest";
import { ICartRepository } from "../../../repository/ICartRepositories";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { CartRepositoryInMemory } from "../../../repository/in-memory/CartRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { RegisterUserCase } from "../../auth/registerUser/registerUserCase";

describe("Register Cart", async () => {
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

    it("should not be able to register a cart because user not founded", async () => {
        expect(registerCartCase.execute(uuid())).rejects.toEqual(
            new Error("User not found.")
        ); 
    }); 
    
    it("should not be able to register a cart because user not founded", async () => {
        const user : IRegisterUserRequest  = {
            email: "test",
            password: "test",
            username: "test"
         }
        const newUser = await userRepository.register(user)
        expect(await registerCartCase.execute(newUser.id)).haveOwnProperty("id")
    }); 
})