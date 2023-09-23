import { t } from "elysia"

export const addMessageValidation = () => {
  return {
    body: t.Object({
      message: t.String(),
    }),
  }
}