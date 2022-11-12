import { describe,it,expect, beforeEach } from "vitest";
import { UpdateUserEmailCase } from "./updateUserEmailCase";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";

describe("Updat User Email", async () => {
    let userRepository: IUserRepository;
    let updateUserEmailCase: UpdateUserEmailCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository = new UsersRepositoryInMemory();
        updateUserEmailCase = new UpdateUserEmailCase(userRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository = new UsersRepositoryInMemory();
            updateUserEmailCase = new UpdateUserEmailCase(userRepository);
        }
    })

    const userInputData: IRegisterUserRequest  = {
        email: "teste@gmail.com",
        password: "teste",
        username: "teste"
    }

    it("should be able to update email and return the user", async () => {
        const user = await userRepository.register(userInputData)

        const data = await updateUserEmailCase.execute('test@outlook.com',user.id)
        
        expect(data.userUpdated.email).toBe('test@outlook.com')
    });

    it("shoud be able to catch the user not found error", async () => {
        await userRepository.register(userInputData)

        await expect(updateUserEmailCase.execute('test@outlook.com','test')).rejects.toEqual(
            new Error("User not found.")
        );
    })

    it("shoud be able to catch email is necessary error", async () => {
        const user = await userRepository.register(userInputData)

        await expect(updateUserEmailCase.execute('',user.id)).rejects.toEqual(
            new Error("Email is necessary.")
        );
    })
})