import { t } from "elysia"

export function signUpValidation() {
  return {
    body: t.Object({
      username: t.String(),
      password: t.String({
        minLength: 8
      }),
    }),
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
  }
}
