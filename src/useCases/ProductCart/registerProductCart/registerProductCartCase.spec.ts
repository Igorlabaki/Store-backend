import { describe,it,expect, beforeEach } from "vitest";
import { RegisterProductCartCase } from "./registerProductCartCase";
import { ICartRepository } from "../../../repository/ICartRepositories";
import { IProductRepository, IRegisterProductRequest } from "../../../repository/IProductRepositories";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { CartRepositoryInMemory } from "../../../repository/in-memory/CartRepositoryInMemory";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { ProductCartRepositoryInMemory } from "../../../repository/in-memory/ProductCartRepositoryInMemomy";
import { IProductCartRepository, RegisterProductCartProps } from "../../../repository/IProductCartRepositories";
import { ProductsRepositoryInMemory } from "../../../repository/in-memory/ProductsRepositoryInMemory";

describe("Register product cart", async () => {
    let cartRepository          : ICartRepository;
    let userRepository          : IUserRepository;
    let productRepository       : IProductRepository;
    let productCartRepository   : IProductCartRepository;
    let registerProductCartCase : RegisterProductCartCase;
  
    beforeEach(async () => {
        // called once before all tests run
            cartRepository          = new CartRepositoryInMemory();
            userRepository          = new UsersRepositoryInMemory();
            productRepository       = new ProductsRepositoryInMemory();
            productCartRepository   = new ProductCartRepositoryInMemory();
            registerProductCartCase = new RegisterProductCartCase(cartRepository,productCartRepository);
        // clean up function, called once after all tests run
        return async () => {
            cartRepository          = new CartRepositoryInMemory();
            userRepository          = new UsersRepositoryInMemory();
            productRepository       = new ProductsRepositoryInMemory();
            productCartRepository   = new ProductCartRepositoryInMemory();
            registerProductCartCase = new RegisterProductCartCase(cartRepository,productCartRepository);
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


    it("should be able to create productCart", async () => {
        const newUser    = await userRepository.register(user)
        const newProduct = await productRepository.register(product)
        const newCart    = await cartRepository.register(newUser.id)

        const registerProductCartProps = {
            cartId: newCart.id,
            userId: newUser.id,
            productId: newProduct.id,
            quantity: 10
        }

        expect(await registerProductCartCase.execute(registerProductCartProps)).haveOwnProperty("id")
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