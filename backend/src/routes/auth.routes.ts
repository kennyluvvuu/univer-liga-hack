import Elysia from "elysia";
import { randomUUIDv5 } from "bun";
import { status } from "elysia";
import { User } from "../schemas/user.schema";
import { users } from "../services/user.service.mock";
import jwt from "@elysiajs/jwt";

export const authRoutes = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "super-secret",
      exp: "7d",
    }),
  )
  .get("/users", async () => {
    return { users: users };
  })
  .post(
    "/register",
    async ({ body, jwt }) => {
      const registredUser = {
        id: randomUUIDv5("chlen", "url"),
        email: body.email,
        hash: await Bun.password.hash(body.password),
      };
      users.push(registredUser);
      const token = await jwt.sign({ sub: registredUser.id });
      return status(201, {
        token: token,
        user: { id: registredUser.id, email: registredUser.email },
      });
    },
    {
      body: User,
    },
  )
  .post(
    "/login",
    async ({ body, jwt }) => {
      let validUser = null;
      for (const user of users) {
        if (
          user.email === body.email &&
          (await Bun.password.verify(body.password, user.hash))
        ) {
          validUser = user;
          break;
        }
      }

      if (!validUser) {
        return status(401, "Unauthorized");
      }

      const token = await jwt.sign({ sub: validUser.id });
      return { token: token, email: validUser.email };
    },
    {
      body: User,
    },
  );
