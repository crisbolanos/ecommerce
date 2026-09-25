export interface IUsers {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
}

export interface ICreateUserDTO extends Omit<IUsers, 'id'> { }
