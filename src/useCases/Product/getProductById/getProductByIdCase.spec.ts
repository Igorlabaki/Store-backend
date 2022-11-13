
import { describe,it,expect, beforeEach } from "vitest";
import { GetProductByIdCase } from "./getProductByIdCase";
import { IProductRepository, IRegisterProductRequest } from "../../../repository/IProductRepositories";
import { ProductsRepositoryInMemory } from "../../../repository/in-memory/ProductsRepositoryInMemory";

describe("Get product by id", async () => {
    let productRepositoryInMemory: IProductRepository;
    let getProductByIdCase: GetProductByIdCase;
  
    beforeEach(async () => {
        // called once before all tests run
        productRepositoryInMemory = new ProductsRepositoryInMemory();
        getProductByIdCase = new GetProductByIdCase(productRepositoryInMemory);
        // clean up function, called once after all tests run
        return async () => {
            productRepositoryInMemory = new ProductsRepositoryInMemory();
            getProductByIdCase = new GetProductByIdCase(productRepositoryInMemory);
        }
    })

    it("should be able to get prodcut by id", async () => {

        const product: IRegisterProductRequest  = {
            brand: "test",
            brandImage: "test",
            description: "test",
            productImage:"test",
            name: "test",
            price: 10
        }

        const newProduct = await productRepositoryInMemory.register(product)
        const selectedProduct = await  getProductByIdCase.execute(newProduct.id)

        expect(selectedProduct.product).haveOwnProperty("id")
    });

    it("should not be able to get product", async () => {

        await expect(getProductByIdCase.execute("testId")).rejects.toEqual(

            new Error("Product not found.")

        ); 
    }); 
})