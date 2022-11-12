import { describe,it,expect, beforeEach } from "vitest";

import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { UpdateUserUsernameCase } from "./updateUserUsernameCase";

describe("Updat User Email", async () => {
    let userRepository: IUserRepository;
    let updateUserUsername: UpdateUserUsernameCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepository      = new UsersRepositoryInMemory();
        updateUserUsername  = new UpdateUserUsernameCase(userRepository);
        // clean up function, called once after all tests run
        return async () => {
            userRepository      = new UsersRepositoryInMemory();
            updateUserUsername  = new UpdateUserUsernameCase(userRepository);
        }
    })

    const userInputData: IRegisterUserRequest  = {
        email: "teste@gmail.com",
        password: "teste",
        username: "teste"
    }

    it("should be able to update username and return the user", async () => {
        const user = await userRepository.register(userInputData)

        const data = await updateUserUsername.execute('testeUsername',user.id)
        
        expect(data.userUpdated.username).toBe('testeUsername')
    });

    it("shoud be able to catch the user not found error", async () => {
        await userRepository.register(userInputData)

        await expect(updateUserUsername.execute('test@outlook.com','test')).rejects.toEqual(
            new Error("User not found.")
        );
    })

    it("shoud be able to catch username is necessary error", async () => {
        const user = await userRepository.register(userInputData)

        await expect(updateUserUsername.execute('',user.id)).rejects.toEqual(
            new Error("Username is necessary.")
        );
    })
})