
import { describe,it,expect, beforeEach } from "vitest";
import {  IRegisterProductRequest } from "../../../repository/IProductRepositories";
import { GetCartByIdCase } from "./getCartByIdCase";
import { ICartRepository } from "../../../repository/ICartRepositories";
import { CartRepositoryInMemory } from "../../../repository/in-memory/CartRepositoryInMemory";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { RegisterCartCase } from "../registerCart/registerCartCase";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";

describe("Get cart by id", async () => {
    let userRepository: IUserRepository;
    let cartRepository: ICartRepository;
    let getCartByIdCase: GetCartByIdCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository = new UsersRepositoryInMemory();
        cartRepository = new CartRepositoryInMemory();
        getCartByIdCase = new GetCartByIdCase(cartRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository = new UsersRepositoryInMemory();
            cartRepository = new CartRepositoryInMemory();
            getCartByIdCase = new GetCartByIdCase(cartRepository);
        }
    })

    it("should be able to get cart by id", async () => {
        const user : IRegisterUserRequest  = {
            email: "test",
            password: "test",
            username: "test"
         }

        const newUser = await userRepository.register(user)

        const newCart = await cartRepository.register(newUser.id)

        const selectedProduct = await  getCartByIdCase.execute(newCart.id)

        expect(selectedProduct.cart).haveOwnProperty("id")
    });

    it("should not be able to get product beacause cart not exists", async () => {

        await expect(getCartByIdCase.execute("testId")).rejects.toEqual(

            new Error("Cart not found.")

        ); 
    }); 
})