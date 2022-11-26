export interface Login {
  email: string;
  password: string
}
export interface IResponse {
  status: number;
  message: { message: string } | { token: string }
}

export interface IToken {
  data: {
    id: number,
    iat: number,
  }
}
