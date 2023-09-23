import { prisma } from "../../db";
import { MessageBody } from "./post.interface";

function create(payload: MessageBody) {
  prisma.post.create({
    data: {
      ...payload
    }
  })
  return
}

function index() {
  return prisma.post.findMany()
}

export default {
  create,
  index
}