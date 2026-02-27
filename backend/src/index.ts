import { Elysia, status, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { randomUUIDv5 } from "bun";

let users = [
  {
    id: "123",
    email: "idi nahui huesos",
    hash: Bun.password.hashSync("12345678"),
  },
  {
    id: "123",
    email: "ya je suka parovoz",
    hash: Bun.password.hashSync("87654321"),
  },
];

const User = t.Object({
  email: t.String(),
  password: t.String(),
});

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "super-secret",
      exp: "7d",
    }),
  )
  .get("/", () => "Hello Elysia")
  .get("/users", async () => {
    return { users: users };
  })
  .post(
    "/register",
    async ({ body }) => {
      const registredUser = {
        id: randomUUIDv5("chlen", "url"),
        email: body.email,
        hash: await Bun.password.hash(body.password),
      };
      users.push(registredUser);
      return status(201, { id: registredUser.id, email: registredUser.email });
    },
    {
      body: User,
    },
  )
  .post(
    "/login",
    async ({ body, jwt, cookie: { auth } }) => {
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
      auth.set({
        value: token,
        httpOnly: true,
        secure: true,
      });
      return { status: "success" };
    },
    {
      body: User,
    },
  )
  .derive(async ({ jwt, headers: { authorization } }) => {
    if (!authorization) return { payload: null };
    const [, token] = authorization.split(" ");
    const payload = await jwt.verify(token);
    return { payload };
  })
  .get("/me", async ({ payload }) => {
    if (!payload) return status(401, "Unauthorized");

    return users.find((user) => user.id === payload.sub);
  })
  .listen("8080");

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type Server = typeof app;
