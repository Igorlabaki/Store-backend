
import { describe,beforeEach, it, expect } from "vitest";
import { ListProductCartCase } from "./listProductCartCase";
import { ICartRepository } from "../../../repository/ICartRepositories";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { IProductRepository, IRegisterProductRequest } from "../../../repository/IProductRepositories";
import { IProductCartRepository } from "../../../repository/IProductCartRepositories";
import { CartRepositoryInMemory } from "../../../repository/in-memory/CartRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { ProductsRepositoryInMemory } from "../../../repository/in-memory/ProductsRepositoryInMemory";
import { ProductCartRepositoryInMemory } from "../../../repository/in-memory/ProductCartRepositoryInMemomy";

describe("List ProductsCarts", async () => {
    let cartRepository          : ICartRepository;
    let userRepository          : IUserRepository;
    let productRepository       : IProductRepository;
    let productCartRepository   : IProductCartRepository;
    let listProductCartCase     : ListProductCartCase;
  
    beforeEach(async () => {
        // called once before all tests run
            cartRepository          = new CartRepositoryInMemory();
            userRepository          = new UsersRepositoryInMemory();
            productRepository       = new ProductsRepositoryInMemory();
            productCartRepository   = new ProductCartRepositoryInMemory();
            listProductCartCase     = new ListProductCartCase(productCartRepository);
        // clean up function, called once after all tests run
        return async () => {
            cartRepository          = new CartRepositoryInMemory();
            userRepository          = new UsersRepositoryInMemory();
            productRepository       = new ProductsRepositoryInMemory();
            productCartRepository   = new ProductCartRepositoryInMemory();
            listProductCartCase     = new ListProductCartCase(productCartRepository);
        }
    })

    const user : IRegisterUserRequest  = {
        email: "test",
        password: "test",
        username: "test"
    }

    const product : IRegisterProductRequest  = {
        brand: "test",
        brandImage: "test",
        description: "test",
        name: "test",
        price: 10,
        productImage: "test",
     }


    it("should be able to return a list of products", async () => {
        const newUser    = await userRepository.register(user)
        const newProduct = await productRepository.register(product)
        const newCart    = await cartRepository.register(newUser.id)

        const registerProductCartProps = {
            cartId: newCart.id,
            userId: newUser.id,
            productId: newProduct.id,
            quantity: 10
        }

        await productCartRepository.register(registerProductCartProps)

        const listProductCart = await listProductCartCase.execute()
        
        expect(listProductCart[0]).haveOwnProperty("id")
    });

    it("should not be able to return a list of products", async () => {

        await expect(listProductCartCase.execute()).rejects.toEqual(

            new Error("No productCart register yet!")

        );
    });
})