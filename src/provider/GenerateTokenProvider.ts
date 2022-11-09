import { sign } from "jsonwebtoken"
import dayjs from 'dayjs'
import { IUser } from "../Interfaces"


class GenerateTokenProvider{
    async execute(user: IUser){
        const token = sign({
            username: user.username,
            email: user.email,
            id: user.id
        }, 'b3aa4f1a-d1fe-427e-9daf-fcce5167b27e', {
            subject: user.id,
            expiresIn: dayjs().add(10,'day').unix()
        })

        return token
    }
}

export {GenerateTokenProvider}

