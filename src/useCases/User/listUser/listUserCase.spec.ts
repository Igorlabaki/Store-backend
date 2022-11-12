import { ListUserCase } from "./listUserCase";
import { describe,beforeAll,it,expect, beforeEach } from "vitest";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";

describe("List Users", async () => {
    let userRepository: IUserRepository;
    let listUserCase: ListUserCase;
  
    
    beforeEach(async () => {
        // called once before all tests run
        userRepository = new UsersRepositoryInMemory();
        listUserCase = new ListUserCase(userRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository = new UsersRepositoryInMemory();
            listUserCase = new ListUserCase(userRepository);
        }
    })

    it("should be able to return a list of users", async () => {

        const user: IRegisterUserRequest  = {
            email: "teste@gmail.com",
            password: "teste",
            username: "teste"
        }

        await userRepository.register(user)

        const listUser = await listUserCase.execute();
        
        expect(listUser[0]).haveOwnProperty("id")
    });

    it("should not be able to return a list of users", async () => {

        await expect(listUserCase.execute()).rejects.toEqual(

        new Error("No user register yet!")

        );
    }); 
})