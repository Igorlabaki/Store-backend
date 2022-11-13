import { Product } from "@prisma/client"

export interface IRegisterProductRequest {
    brand : string,
    brandImage : string,
    description : string,
    productImage: string,
    name : string,
    price: any
}
  
export interface IUpdateRequest {
    reference : string,
    id: string 
}

export interface IUpdatePriceRequest {
    price : number,
    id: string 
}

interface IProductRepository {
    list:() => Promise<Product[]>
    getById:(reference: string) => Promise<Product>
    getByName:(reference: string) => Promise<Product>
    getByBrand:(reference: string) => Promise<Product[]>
    delete: (reference: string) => Promise<Product[] | Product> 
    updateBrand :(reference: IUpdateRequest) => Promise<Product>
    updatePrice:(reference: IUpdatePriceRequest) => Promise<Product>
    updateName: (reference: IUpdateRequest) => Promise<Product> 
    register:(reference:IRegisterProductRequest) => Promise<Product>
}

export { IProductRepository };