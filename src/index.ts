import { cors } from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import { signInValidation, signUpValidation } from "./modules/users/user.validation";
import postController from "./modules/posts/post.controller";
import userController from "./modules/users/user.controller";
import { addMessageValidation } from "./modules/posts/post.validation";
import swagger from "@elysiajs/swagger";

const app: Elysia = new Elysia()
app.use(cors());
app.use(swagger())


app.group('/post', app => app
  .get('/', postController.getAllPost)
  .post("/add", postController.add, addMessageValidation())
)

app.group('/user', app => app
  .post('/sign-in', userController.signIn, signInValidation())
  .post('/sign-up', userController.signUp, signUpValidation())
  .get('/profile', userController.getProfile,
    // {
    //   response: t.Object({
    //     messages: t.String(),
    //     data: t.Object({
    //       id: t.Number(),
    //       username: t.String()
    //     })
    //   })
    // }
  )
)
app.listen(Number(Bun.env.PORT) || 3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
