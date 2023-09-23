import { Context } from "elysia";
import { MessageBody } from "./post.interface";
import postService from "./post.service";

function add({ body }: { body: MessageBody }) {
  // const message = body.message;
  // console.log(message);
  // const query = DB.query(`INSERT INTO MESSAGES (message) VALUES (?1)`);
  // query.run(message);
  postService.add(body)
  return new Response(JSON.stringify({ message: "Added" }), {
    headers: { "Content-Type": "application/json" },
  });
}

async function getAllPost(context: Context) {
  // const query = DB.query(`SELECT * FROM MESSAGES;`);
  // const result = query.all();
  // console.log(result);
  const result = await postService.fetchAll()
  context.set.status = 200;

  return new Response(JSON.stringify({ messages: result }), {
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  getAllPost,
  add,
}