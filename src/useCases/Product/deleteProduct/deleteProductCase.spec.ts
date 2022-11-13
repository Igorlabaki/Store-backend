
import { describe,it,expect, beforeEach } from "vitest";
import { IProductRepository, IRegisterProductRequest } from "../../../repository/IProductRepositories";
import { ProductsRepositoryInMemory } from "../../../repository/in-memory/ProductsRepositoryInMemory";
import { DeleteProductCase } from "./deleteProductCase";

describe("List Products", async () => {
    let productRepositoryInMemory: IProductRepository;
    let deleteProductCase: DeleteProductCase;
  
    beforeEach(async () => {
        // called once before all tests run
        productRepositoryInMemory = new ProductsRepositoryInMemory();
        deleteProductCase = new DeleteProductCase(productRepositoryInMemory);
        // clean up function, called once after all tests run
        return async () => {
            productRepositoryInMemory = new ProductsRepositoryInMemory();
            deleteProductCase = new DeleteProductCase(productRepositoryInMemory);
        }
    })

    it("should be able to delete prodcut by Id", async () => {

        const product: IRegisterProductRequest  = {
            brand: "test",
            brandImage: "test",
            description: "test",
            productImage:"test",
            name: "test",
            price: 10
        }

        const userDeleted = await productRepositoryInMemory.register(product)

        await deleteProductCase.execute(userDeleted.id)

        const productList = productRepositoryInMemory.list

        expect(productList.length).toBe(0)
    });

    it("should not be able to return a list of products", async () => {

        await expect(deleteProductCase.execute("testeId")).rejects.toEqual(

            new Error("Product do not exists.")

        ); 
    }); 
})