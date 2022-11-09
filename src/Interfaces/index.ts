export interface IUser {
  id?: string;
  username: string;
  password: string,
  email: string;
  Cart?: ProductCart[];
}

export interface SignInData {
  email: string;
  password: string;
  username: string;
}

export interface AuthContextType {
  authUser: IUser | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignInData) => Promise<void>;
  signOut: () => void;
  recoveryUser: () => void;
  isAuthenticated: boolean;
  setAuthUser: any;
}

export interface ResponseTokenData {
  token: string;
  user: IUser;
}

export interface ResponseError {
  status: string;
  message: string;
}

export interface ErrorAuth {
  field: string;
  message: string;
}

export interface ErrorAuth {
  field: string;
  message: string;
}

export interface Product {
  id: string;
  name: string;
  price:  string;
  brand: string;
  brandImage: string;
  image: string;
  description: string;
  ProductCart: ProductCart[];
}

export interface Cart {
  id: string;
  user: IUser;
  userId: string;
  ProductCart: ProductCart[];
}

export interface ProductCart {
  id: string;
  product: Product;
  fk_id_product: string;
  cart: Cart;
  fk_id_cart: string;
  quantity: number;
}

export interface refreshToken {
  id: string,
  expireIn: number,
  userId: string
}
