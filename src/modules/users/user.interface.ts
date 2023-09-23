export interface MessageBody {
  message: string
}
export interface SignUpBody {
  username: string
  password: string
}
export interface SignInBody extends SignUpBody { }