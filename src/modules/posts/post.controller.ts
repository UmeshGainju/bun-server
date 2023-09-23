import { Context } from "elysia";
import { MessageBody } from "./post.interface";
import postService from "./post.service";

async function add({ body, set }: { body: MessageBody, set: Context['set'] }) {
  try {
    await postService.add(body)
    set.status = 200;

    return new Response(JSON.stringify({ message: "Added" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    throw new Error('something went wrong while posting message')
  }
}

async function getAllPost(context: Context) {
  try {
    const result = await postService.fetchAll()
    context.set.status = 200;

    return new Response(JSON.stringify({ messages: result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    throw new Error('something went wrong while fectching all posts')
  }
}

export default {
  getAllPost,
  add,
}