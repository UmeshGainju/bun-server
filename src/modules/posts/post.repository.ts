import { prisma } from "../../db";
import { MessageBody } from "./post.interface";

async function create(payload: MessageBody) {
  await prisma.post.create({
    data: {
      ...payload
    }
  })
  return
}

async function index() {
  return await prisma.post.findMany()
}

export default {
  create,
  index
}