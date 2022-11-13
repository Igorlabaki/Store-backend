import { Product } from "@prisma/client";
import { describe,it,expect, beforeEach } from "vitest";
import { RegisterProductCase } from "./registerProductCase";
import { ProductsRepositoryInMemory } from "../../../repository/in-memory/ProductsRepositoryInMemory";
import { IProductRepository, IRegisterProductRequest } from "../../../repository/IProductRepositories";

describe("Register Product", async () => {
    let productRepository: IProductRepository;
    let registerProductCase: RegisterProductCase;
  
    beforeEach(async () => {
        // called once before all tests run
        productRepository = new ProductsRepositoryInMemory();
        registerProductCase = new RegisterProductCase(productRepository);
        // clean up function, called once after all tests run
        return async () => {
            productRepository = new ProductsRepositoryInMemory();
            registerProductCase = new RegisterProductCase(productRepository);
        }
    })

    it("should be able to create product", async () => {
        const product : IRegisterProductRequest  = {
           brand: "test",
           brandImage: "test",
           description: "test",
           name: "test",
           price: 10,
           productImage: "test",
        }

        const newProduct: Product =  await registerProductCase.execute(product)
        
        expect(newProduct).haveOwnProperty("id")
    });

    it("should not be able to create product if this user already exists", async () => {
        const product : IRegisterProductRequest  = {
            brand: "test",
            brandImage: "test",
            description: "test",
            name: "test",
            price: 10,
            productImage: "test",
         }
        
        await registerProductCase.execute(product)
         
        await expect(registerProductCase.execute(product)).rejects.toEqual(
            new Error("Product already exists.")
        ); 
    });

    it("should not be able to create product if type of price is a string", async () => {
        const product : IRegisterProductRequest  = {
            brand: "test",
            brandImage: "test",
            description: "test",
            name: "test",
            price: "10",
            productImage: "test",
         }
        
       await expect(registerProductCase.execute(product)).rejects.toEqual(
            new Error("Price must be a number.")
        ); 
    });
    
    it("should not be able to create product if any field is empty", async () => {
        const product : IRegisterProductRequest  = {
            brand: "",
            brandImage: "",
            description: "",
            name: "",
            price: "",
            productImage: "",
         }
        
        await expect(registerProductCase.execute(product)).rejects.toEqual(
            new Error(`All inputs are required`)
        ); 
    }); 
})