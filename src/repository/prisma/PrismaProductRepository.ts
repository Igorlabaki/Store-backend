import { PrismaClient,Product } from "@prisma/client";
import { IProductRepository } from "../IProductRepositories";

export interface IProductRequest {
  name: string;
  price:  number;
  brand: string;
  brandImage: string;
  description: string;
  productImage: string
}
export interface IUpdateRequest {
  reference : string,
  id: string 
}
export interface IUpdatePriceRequest {
  price : number,
  id: string 
}
export class PrismaProductRepository implements IProductRepository {

  constructor (private readonly prisma: PrismaClient){}
  updateProductname: (reference: IUpdateRequest) => Promise<Product>;

  async register (product: IProductRequest): Promise<Product> {
    return await this.prisma.product.create({
      data:{
        name:         product.name,
        price:        product.price,
        productImage: product.productImage,
        brand:        product.brand,
        brandImage:   product.brandImage,
        description:  product.description
      },
      include:{
        ProductCart:{
          include:{
            cart: true
          }
        }
      }
  })
  }

  async getById (reference: string): Promise<Product> {
     return await this.prisma.product.findUnique({
      where:{
        id: reference
      },
      include:{
        ProductCart:{
          include:{
            cart: true
          }
        }
      }
    })
  }

  async getByName (reference: string): Promise<Product> {
    return await this.prisma.product.findUnique({
     where:{
       name: reference
     },
     include:{
       ProductCart:{
         include:{
           cart: true
         }
       }
     }
   })
 }
 
 async getByBrand(reference: string): Promise<Product[]>{
  return await this.prisma.product.findMany({
    where:{
      brand: reference
    },
    include:{
      ProductCart:{
        include:{
          cart: true
        }
      }
    }
  })
}


 async delete (reference: string): Promise<Product> {
  return await this.prisma.product.delete({
   where:{
     id: reference
   },
   include:{
     ProductCart:{
       include:{
         cart: true
       }
     }
   }
 })
}

async updateName ({id,reference}: IUpdateRequest): Promise<Product> {
  return await this.prisma.product.update({
   where:{
    id
   },
   data:{
    name: reference
   },
   include:{
    ProductCart:{
      include:{
        cart: true
      }
    }
  }
 })
}


  async list (): Promise<Product[]> {
    return await this.prisma.product.findMany()
  }
  
  async updateBrand({id,reference}: IUpdateRequest): Promise<Product>{
    return await this.prisma.product.update({
      where:{
        id
      },
      data:{
       brand: reference
      },
      include:{
       ProductCart:{
         include:{
           cart: true
         }
       }
     }
    })
  }

 async updatePrice({id,price}: IUpdatePriceRequest):Promise<Product>{
  return await this.prisma.product.update({
    where:{
      id
    },
    data:{
     price: price
    },
    include:{
     ProductCart:{
       include:{
         cart: true
       }
     }
   }
  })
 }


}