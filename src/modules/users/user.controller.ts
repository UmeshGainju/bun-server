import { Context } from "elysia";
import userService from "./user.service";
import { SignUpBody } from "./user.interface";

async function signIn({ body }: { body: SignUpBody }) {
  return await userService.signIn(body)
}

async function signUp({ body }: { body: SignUpBody }) {
  return userService.signUp(body)
}

async function getProfile(_context: Context) {
  return await userService.getProfile()
}
export default {
  signIn,
  signUp,
  getProfile,
}