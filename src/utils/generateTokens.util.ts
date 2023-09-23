import { User } from "@prisma/client"

export const generateTokens = (_user: User) => {
  return {
    accessToken: '123',
    refreshToken: '456'
  }
}