import { CryptoHasher } from "bun";
import { SignInBody, SignUpBody } from "./user.interface";
import usersRepository from "./users.repository";
import { generateTokens } from "../../utils/generateTokens.util";

function signUp(body: SignUpBody) {
    const { password, username } = body
    const hashedPassword = CryptoHasher.hash('sha256', password, 'base64')
    return usersRepository.create({ username, password: hashedPassword })
}

async function signIn(body: SignInBody) {
    const { username, password } = body
    const user = await usersRepository.getUserByUsername(username)
    if (!user) throw new Error('User doesnot exist with given username')
    const { password: oldHashedPassword } = user
    const hashedPassword = CryptoHasher.hash('sha256', password, 'base64')
    if (hashedPassword !== oldHashedPassword) throw new Error('Given password doesnot match for given username password')
    const { accessToken, refreshToken } = generateTokens(user)
    return { accessToken, refreshToken }
}

function getProfile() {
    const id = 1
    return usersRepository.getProfile(id)
}

export default {
    signIn,
    signUp,
    getProfile,
}