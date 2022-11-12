import { describe,it,expect, beforeEach } from "vitest";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { GetUserByIdCase } from "./getUserByIdCase";

describe("Updat User Email", async () => {
    let userRepository: IUserRepository;
    let getUserByIdCase: GetUserByIdCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository = new UsersRepositoryInMemory();
        getUserByIdCase = new GetUserByIdCase(userRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository = new UsersRepositoryInMemory();
            getUserByIdCase = new GetUserByIdCase(userRepository);
        }
    })

    const userInputData: IRegisterUserRequest  = {
        email: "teste@gmail.com",
        password: "teste",
        username: "teste"
    }

    it("should be able to get user by id", async () => {
        const user = await userRepository.register(userInputData)

        const data = await getUserByIdCase.execute(user.id)
        
        expect(data.user).ownProperty('id')
    });

    it("should be able to get user by id", async () => {
        const user = await userRepository.register(userInputData)

        expect(getUserByIdCase.execute('teste')).rejects.toEqual(
            new Error("User not found.")
        )
    });
})