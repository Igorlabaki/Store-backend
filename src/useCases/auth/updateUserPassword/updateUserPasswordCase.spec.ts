import { describe,it,expect, beforeEach } from "vitest";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { UpdateUserPasswordCase } from "./updateUserPasswordCase";

describe("Updat User Email", async () => {
    let userRepository: IUserRepository;
    let updateUserPasswordCase : UpdateUserPasswordCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository      = new UsersRepositoryInMemory();
        updateUserPasswordCase  = new UpdateUserPasswordCase(userRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository          = new UsersRepositoryInMemory();
            updateUserPasswordCase  = new UpdateUserPasswordCase(userRepository);
        }
    })

    const userInputData: IRegisterUserRequest  = {
        email: "teste@gmail.com",
        password: "teste",
        username: "teste"
    }

    it("should be able to update password and return the user", async () => {
        const user = await userRepository.register(userInputData)

        const data = await updateUserPasswordCase.execute('testPassword',user.id)
        
        expect(data.user.password).toBe(user.password)
    });

    it("shoud be able to catch the user not found error", async () => {
        await userRepository.register(userInputData)

        await expect(updateUserPasswordCase.execute('testePassword','test')).rejects.toEqual(
            new Error("User not found.")
        );
    })

    it("shoud be able to catch password is necessary error", async () => {
        const user = await userRepository.register(userInputData)

        await expect(updateUserPasswordCase.execute('',user.id)).rejects.toEqual(
            new Error("New password is necessary.")
        );
    })
})