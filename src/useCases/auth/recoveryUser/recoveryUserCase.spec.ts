import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import {v4 as uuid} from "uuid"
import { describe,it, beforeEach, expect } from "vitest";
import { UsersRepositoryInMemory } from "../../../repository/in-memory/UsersRepositoryInMemory";
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories";
import { RecoveryUserCase } from "./recoveyUserCase";

describe("Recovery user data", async () => {
    let userRepositoryInMemory: IUserRepository;
    let recoveryUserCase: RecoveryUserCase;
  
    beforeEach(async () => {
        // called once before all tests run
        userRepositoryInMemory  = new UsersRepositoryInMemory();
        recoveryUserCase        = new RecoveryUserCase(userRepositoryInMemory);
        // clean up function, called once after all tests run
        return async () => {
            userRepositoryInMemory  = new UsersRepositoryInMemory();
            recoveryUserCase        = new RecoveryUserCase(userRepositoryInMemory);
        }
    })

    it("should be able to recovery user data", async () => {
        const user : IRegisterUserRequest  = {
            email: "test",
            password: "test",
            username: "test"
        }

        const data = await userRepositoryInMemory.register(user)

        const token = sign({
            username: data.username,
            email: data.email,
            id: data.id
        }, 'b3aa4f1a-d1fe-427e-9daf-fcce5167b27e', {
            subject: data.id,
            expiresIn: dayjs().add(10,'day').unix()
        })

        const userDb = await recoveryUserCase.execute(token)

        expect(userDb.id).toBe(data.id)
    });

   it("should not be able to return  recovery user data", async () => {
        const userFake : IRegisterUserRequest  = {
            email: "test",
            password: "test",
            username: "test"
        }

        const fakeToken =  sign({
            username: userFake.username,
            email: userFake.email,
            id: uuid()
        }, 'b3aa4f1a-d1fe-427e-9daf-fcce5167b27e', {
            subject: uuid(),
            expiresIn: dayjs().add(10,'day').unix()
        })

        await expect(recoveryUserCase.execute(fakeToken)).rejects.toEqual(
            new Error("User not found.")
        ); 
    }); 
})