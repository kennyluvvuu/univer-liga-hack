import { t } from "elysia";

export const User = t.Object({
  email: t.String(),
  password: t.String(),
});
