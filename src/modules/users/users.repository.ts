import { prisma } from "../../db"
import { SignUpBody } from "./user.interface"

function create(payload: SignUpBody) {
  prisma.user.create({
    data: { ...payload }
  })
  return
}
function getUserByUsername(username: string) {
  return prisma.user.findUnique({ where: { username } })
}
function getProfile(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true }
  })
}
export default {
  create,
  getUserByUsername,
  getProfile
}