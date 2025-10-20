import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.notFound((c) => {
  return c.text("404", 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("There was an error! Check the console...", 500);
});

app.get("/", (c) => {
  console.log(`MY_VAR is: ${c.env.MY_VAR}`);
  return c.text("Hello Hono!");
});

app.get("/html", (c) => {
  return c.html("<h1>Hello! Hono!</h1>");
});

app.get("/customers", async (c) => {
  const customers = await c.env.DB.prepare("select * from customers").all();

  return c.json(customers.results);
});

app.get("/customers/:id", async (c) => {
  const customerId = c.req.param("id");
  const customer = await c.env.DB.prepare(
    "select * from customers where id = ?"
  )
    .bind(customerId)
    .first();

  return c.json(customer);
});

export default app;
