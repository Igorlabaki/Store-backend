
import { describe,it,expect, beforeEach } from "vitest";
import { ICartRepository } from "../../../repository/ICartRepositories";
import { CartRepositoryInMemory } from "../../../repository/in-memory/CartRepositoryInMemory";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { GetCartByUserIdCase } from "./getCartByUserIdCase";

describe("Get cart by id", async () => {
    let userRepository: IUserRepository;
    let cartRepository: ICartRepository;
    let getCartByUserIdCase: GetCartByUserIdCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository = new UsersRepositoryInMemory();
        cartRepository = new CartRepositoryInMemory();
        getCartByUserIdCase = new GetCartByUserIdCase(cartRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository = new UsersRepositoryInMemory();
            cartRepository = new CartRepositoryInMemory();
            getCartByUserIdCase = new GetCartByUserIdCase(cartRepository);
        }
    })

    it("should be able to get cart by user id", async () => {
        const user : IRegisterUserRequest  = {
            email: "test",
            password: "test",
            username: "test"
         }

        const newUser = await userRepository.register(user)

        const newCart = await cartRepository.register(newUser.id)

        const selectedProduct = await  getCartByUserIdCase.execute(newCart.userId)

        expect(selectedProduct.cart).haveOwnProperty("id")
    });

    it("should not be able to get cart beacause cart not exists", async () => {

        await expect(getCartByUserIdCase.execute("testId")).rejects.toEqual(

            new Error("Cart not found.")

        ); 
    }); 
})