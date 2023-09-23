import { MessageBody } from "./post.interface";
import postRepository from "./post.repository";

function add(body: MessageBody) {
  return postRepository.create(body)
}
function fetchAll() {
  return postRepository.index()
}

export default {
  add,
  fetchAll,
}