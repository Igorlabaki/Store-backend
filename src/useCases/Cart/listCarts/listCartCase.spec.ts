import { ListCartsCase } from "./listCartsCase";
import { v4 as uuid } from "uuid";
import { describe,it,expect, beforeEach } from "vitest";
import { ICartRepository } from "../../../repository/ICartRepositories";
import { CartRepositoryInMemory } from "../../../repository/in-memory/CartRepositoryInMemory";

describe("List Users", async () => {
    let cartRepository: ICartRepository;
    let listCartsCase: ListCartsCase;
  
    beforeEach(async () => {
        // called once before all tests run
        cartRepository = new CartRepositoryInMemory();
        listCartsCase = new ListCartsCase(cartRepository);
        // clean up function, called once after all tests run
        return async () => {
            cartRepository = new CartRepositoryInMemory();
            listCartsCase = new ListCartsCase(cartRepository);
        }
    })

    it("should be able to return a list of carts", async () => {
        await cartRepository.register(uuid())

        const listUser = await listCartsCase.execute();
        
        expect(listUser[0]).haveOwnProperty("id")
    });

    it("should not be able to return a list of carts", async () => {
        await expect(listCartsCase.execute()).rejects.toEqual(

            new Error("No user register yet!")
        );
    }); 
})