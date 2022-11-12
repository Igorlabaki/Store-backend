import uuid from 'uuid'
import { Cart } from '../Interfaces';

class User {

    private id :            string;
    private username:       string;
    private email:          string
    private pasword:        string
    private refrenshToken?: string
    private Cart?:          Cart

    constructor(id:string,username:string,password:string, email:string) {
       this.id = uuid.v4();
       this.username = username;
       this.email = email;
       this.pasword = password;
    }
}

export {User}