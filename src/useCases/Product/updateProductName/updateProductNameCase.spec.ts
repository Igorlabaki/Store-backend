import { Product } from "@prisma/client";
import { describe,it,expect, beforeEach } from "vitest";
import { ProductsRepositoryInMemory } from "../../../repository/in-memory/ProductsRepositoryInMemory";
import { IProductRepository, IRegisterProductRequest } from "../../../repository/IProductRepositories";
import { UpdateProductNameCase } from "./updateProductNameCase";

describe("'Update' product name", async () => {
    let productRepository: IProductRepository;
    let updateProductNameCase: UpdateProductNameCase;
  
    beforeEach(async () => {
        // called once before all tests run
            productRepository = new ProductsRepositoryInMemory();
            updateProductNameCase = new UpdateProductNameCase(productRepository);
        // clean up function, called once after all tests run
        return async () => {
            productRepository = new ProductsRepositoryInMemory();
            updateProductNameCase = new UpdateProductNameCase(productRepository);
        }
    })

    const product : IRegisterProductRequest  = {
       brand: "test",
       brandImage: "test",
       description: "test",
       name: "test",
       price: 10,
       productImage: "test",
    }
    
    it("should be able to update product name", async () => {

        const newProduct: Product =  await productRepository.register(product)
        const data = await updateProductNameCase.execute('testeName',newProduct.id)
        expect(data.product.name).toBe("testeName")
    });
    
    it("shoud not be able to update product name because name is missing", async () => {
        const newProduct: Product =  await productRepository.register(product)

        await expect(updateProductNameCase.execute('',newProduct.id)).rejects.toEqual(
            new Error("Name is necessary.")
        );
    })

    it("shoud not be able to update product name because name is missing", async () => {
        await productRepository.register(product)

        await expect(updateProductNameCase.execute('testName','testId')).rejects.toEqual(
            new Error("Product not found.")
        );
    })

})