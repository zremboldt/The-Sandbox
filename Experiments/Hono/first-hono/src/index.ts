import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  console.log(`MY_VAR is: ${c.env.MY_VAR}`);
  return c.text("Hello Hono!");
});

app.get("/customers", (c) => {
  return c.json([{ id: 1, name: "John" }]);
});

app.get("/customers/:id", (c) => {
  const customerId = c.req.param("id");
  return c.json([
    {
      id: customerId,
      name: "John",
    },
  ]);
});

export default app;
