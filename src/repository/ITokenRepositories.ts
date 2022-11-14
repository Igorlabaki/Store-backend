import { refreshToken } from "../Interfaces";
 
interface ITokenRepository {
    create  :(reference: string)  => Promise<refreshToken>
    get     :(reference: string)  => Promise<refreshToken>
    delete  :(reference: string)  => Promise<refreshToken>
  }

export { ITokenRepository };