import { t } from "elysia"

export function signUpValidation() {
  return {
    error({ code }: { code: string }) {
      switch (code) {
        // Prisma P2002: "Unique constraint failed on the {constraint}"  
        case 'P2002':
          return {
            error: 'Username must be unique'
          }
      }
    },
    body: t.Object({
      username: t.String(),
      password: t.String({
        minLength: 8
      }),
    }),
    // response: t.Object({
    //   messages: t.String(),
    // })
  }
}

export function signInValidation() {
  return {
    body: t.Object({
      username: t.String(),
      password: t.String({
        minLength: 8
      }),
    }),
    // response: t.Object({
    //   messages: t.String(),
    //   data: t.Object({
    //     id: t.Number(),
    //     username: t.String()
    //   })
    // })
  }
}
