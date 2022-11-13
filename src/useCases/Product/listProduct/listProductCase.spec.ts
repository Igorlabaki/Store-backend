
import { ListProductCase } from "./ListProductCase";
import { describe,it,expect, beforeEach } from "vitest";
import { IProductRepository, IRegisterProductRequest } from "../../../repository/IProductRepositories";
import { ProductsRepositoryInMemory } from "../../../repository/in-memory/ProductsRepositoryInMemory";

describe("List Products", async () => {
    let productRepositoryInMemory: IProductRepository;
    let listProductCase: ListProductCase;
  
    beforeEach(async () => {
        // called once before all tests run
        productRepositoryInMemory = new ProductsRepositoryInMemory();
        listProductCase = new ListProductCase(productRepositoryInMemory);
        // clean up function, called once after all tests run
        return async () => {
            productRepositoryInMemory = new ProductsRepositoryInMemory();
            listProductCase = new ListProductCase(productRepositoryInMemory);
        }
    })

    it("should be able to return a list of products", async () => {

        const product: IRegisterProductRequest  = {
            brand: "test",
            brandImage: "test",
            description: "test",
            productImage:"test",
            name: "test",
            price: 10
        }

        await productRepositoryInMemory.register(product)

        const listProduct = await listProductCase.execute();
        
        expect(listProduct[0]).haveOwnProperty("id")
    });

    it("should not be able to return a list of products", async () => {

        await expect(listProductCase.execute()).rejects.toEqual(

            new Error("No product register yet!")

        );
    }); 
})