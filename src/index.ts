import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
// import { Database } from "bun:sqlite";
import { signInValidation, signUpValidation } from "./modules/users/user.validation";
import postController from "./modules/posts/post.controller";
import userController from "./modules/users/user.controller";
import { addMessageValidation } from "./modules/posts/post.validation";
// Create DB If not Exists
// export const DB = new Database("mydb.sqlite", { create: true });
// DB.query(
//   `CREATE TABLE IF NOT EXISTS MESSAGES(
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   message TEXT
// );`
// ).run();

const app: Elysia = new Elysia()
app.use(cors());

app.group('/post', app => app
  .get('/', postController.getAllPost)
  .post("/add", postController.add, addMessageValidation())
)

app.group('/user', app => app
  .post('/sign-in', userController.signIn, signInValidation())
  .post('/sign-up', userController.signUp, signUpValidation())
  .post('/profile', userController.getProfile)
)
app.listen(Number(Bun.env.PORT) || 3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
