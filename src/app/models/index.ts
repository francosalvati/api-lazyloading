export interface User{
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  token: string;
  role: string;
}


export interface LoginFormValue{
  email: string;
  password: string;
}
