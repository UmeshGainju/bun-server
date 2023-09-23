import { SignInBody, SignUpBody } from "./user.interface";
import usersRepository from "./users.repository";
import { generateTokens } from "../../utils/generateTokens.util";

async function signUp(body: SignUpBody) {
  const { password, username } = body

  // const user = await usersRepository.getUserByUsername(username);
  // if (user) throw new Error('User with given username already exist.')

  const hashedPassword = await Bun.password.hash(password, 'bcrypt');
  return usersRepository.create({ username, password: hashedPassword })
}

async function signIn(body: SignInBody) {
  const user = await usersRepository.getUserByUsername(body.username)
  if (!user) throw new Error('User doesnot exist with given username.')
  const { password: hashedPassword } = user

  const isMatch = await Bun.password.verify(body.password, hashedPassword, 'bcrypt');
  if (!isMatch) throw new Error('Given password doesnot match for given username password.')
  const { accessToken, refreshToken } = generateTokens(user)
  return { accessToken, refreshToken }
}

async function getProfile() {
  const id = 5
  return await usersRepository.getProfile(id)
}

export default {
  signIn,
  signUp,
  getProfile,
}