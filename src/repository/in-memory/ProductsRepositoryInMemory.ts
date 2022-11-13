import { v4 as uuid } from "uuid";
import { Product } from "@prisma/client";
import { IProductRepository, IRegisterProductRequest,IUpdatePriceRequest,IUpdateRequest } from "../IProductRepositories";

class ProductsRepositoryInMemory implements IProductRepository {
  private products: Product[] = [];

  async register ({brand,brandImage,description,productImage,price,name}: IRegisterProductRequest): Promise<Product> {
    const product: Product = {
      id: uuid(),
      brand,
      brandImage,
      description,
      productImage,
      name,
      price
    }
    this.products.push(product);
    return product;
  }

  async getById( reference:string): Promise<Product> {
    const product = this.products.find((product) => product.id === reference);
    return product;
  }

  async getByName( reference:string): Promise<Product> {
    const product = this.products.find((product) => product.name === reference);
    return product;
  }

  async getByBrand(reference: string): Promise<Product[]>{
    const product = this.products.filter((product) => product.brand === reference);
    return product
  }

  async delete(reference: string): Promise<Product[]> {
   return this.products.filter((product) => reference != product.id)
  }

  async list() : Promise<Product[]>{
    return this.products
  }

  async updatePrice({id,price}: IUpdatePriceRequest):Promise<Product>{
    const product = this.products.find((product) => product.id === id);
    product.price = price
    return product
  }

  async updateName({id,reference}: IUpdateRequest):Promise<Product>{
    const product = this.products.find((product) => product.id === id);
    product.name = reference
    return product
  }

  async updateBrand({id,reference}: IUpdateRequest):Promise<Product>{
    const product = this.products.find((product) => product.id === id);
    product.brand = reference
    return product
  }
}

export { ProductsRepositoryInMemory };
