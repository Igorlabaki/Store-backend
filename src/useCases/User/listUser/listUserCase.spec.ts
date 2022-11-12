import { ListUserCase } from "./listUserCase";
import { describe,beforeAll,it,expect } from "vitest";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";

describe("List Users", () => {
    let userRepository: IUserRepository;
    let listUserCase: ListUserCase;
  
    beforeAll(() => {
        userRepository = new UsersRepositoryInMemory();
        listUserCase = new ListUserCase(userRepository);
    });

    it("should be able to return a list of users", async () => {
        const user: IRegisterUserRequest  = {
            email: "teste@gmail.com",
            password: "teste",
            username: "teste"
        }

        await userRepository.register(user)

        const listUser = await listUserCase.execute();
        
        expect(listUser[0]).haveOwnProperty("id")
        
       await userRepository.delete(listUser[0].id)
    });
/* 
    it("should not be able to return a list of users", async () => {
        const listUser = await listUserCase.execute();
        
        await expect(listUserCase.execute()).rejects.toEqual(

        new Error("No user register yet!")

        );
    }); */
})