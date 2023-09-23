import { prisma } from "../../db"
import { SignUpBody } from "./user.interface"

async function create(payload: SignUpBody) {
  await prisma.user.create({
    data: { ...payload }
  })
  return
}

async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({ where: { username } })
}
async function getProfile(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true }
  })
}

export default {
  create,
  getUserByUsername,
  getProfile
}