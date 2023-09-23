import { MessageBody } from "./post.interface";
import postRepository from "./post.repository";

async function add(body: MessageBody) {
  return await postRepository.create(body)
}
async function fetchAll() {
  return await postRepository.index()
}

export default {
  add,
  fetchAll,
}