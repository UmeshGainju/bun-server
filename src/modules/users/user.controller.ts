import { Context } from "elysia";
import userService from "./user.service";
import { SignUpBody } from "./user.interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

async function signIn({ body, set }: { body: SignUpBody, set: Context['set'] }) {
  try {
    const result = await userService.signIn(body)
    set.status = 200
    return new Response(JSON.stringify({ messages: 'Successfully sign in', data: result }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error);
    throw new Error('something went wrong while signing in')
  }
}

async function signUp({ body, set }: { body: SignUpBody, set: Context['set'] }) {
  try {
    await userService.signUp(body)
    set.status = 200
    return new Response(JSON.stringify({ messages: 'Successfully sign up' }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        // Prisma P2002: "Unique constraint failed on the {constraint}"  
        case 'P2002':
          return {
            error: 'Username must be unique'
          }
      }
    }
    throw new Error('something went wrong while signing up')
  }
}

async function getProfile(context: Context): Promise<Response> {
  try {
    const result = await userService.getProfile()
    context.set.status = 200
    return new Response(JSON.stringify({ messages: 'Sucessfully data fetched', data: result }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error);
    throw new Error('something went wrong while fetching profile')
  }
}
export default {
  signIn,
  signUp,
  getProfile,
}