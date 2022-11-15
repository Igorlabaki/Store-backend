import { v4 as uuid } from "uuid";
import { describe,it,expect, beforeEach } from "vitest";
import { ICartRegisterRequest, ICartRepository } from "../../../repository/ICartRepositories";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { CartRepositoryInMemory } from "../../../repository/in-memory/CartRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { ResetCartCase } from "./resetCartCase";
import { ITokenRepository } from "../../../repository/ITokenRepositories";
import { RegisterUserCase } from "../../auth/registerUser/registerUserCase";
import { RegisterCartCase } from "../registerCart/registerCartCase";

describe("Reset Cart", async () => {
    let userRepository  : IUserRepository;
    let cartRepository  : ICartRepository;
    let tokenRepository : ITokenRepository;
    let registerUserCase: RegisterUserCase;
    let resetCartCase   : ResetCartCase;
  
    beforeEach(async () => {
        // called once before all tests run
            userRepository      = new UsersRepositoryInMemory();
            cartRepository      = new CartRepositoryInMemory();
            registerUserCase    = new RegisterUserCase(userRepository,tokenRepository);
            resetCartCase       = new ResetCartCase(cartRepository,userRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository      = new UsersRepositoryInMemory();
            cartRepository      = new CartRepositoryInMemory();
            registerUserCase    = new RegisterUserCase(userRepository,tokenRepository);
            resetCartCase       = new ResetCartCase(cartRepository,userRepository);
        }
    })

    const user : IRegisterUserRequest  = {
        email: "test",
        password: "test",
        username: "test"
     }
/* 
    it("should not be able to register a cart", async () => {
        const newUser = await registerUserCase.execute(user)
        const newCart = await cartRepository.register(newUser.refreshToken.userId)

        const registercartRequest : ICartRegisterRequest  = {
            cartId: newCart?.id,
            userId: newUser?.refreshToken.userId
        }

        expect(await resetCartCase.execute(registercartRequest)).haveOwnProperty("id")
    });  */
/* 
    it("should not be able to register a cart because cart not found", async () => {
        const newUser = await userRepository.register(user)


        const registercartRequest : ICartRegisterRequest  = {
            cartId: "sasa",
            userId: newUser?.id
        }
    
        expect(resetCartCase.execute(registercartRequest)).rejects.toEqual(
            new Error("Cart not found.")
        ); 

    }); */
    

})