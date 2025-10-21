import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  createCustomer,
  customerSchema,
  getAllCustomers,
  getCustomerById,
  validateCustomer,
} from "./models/customer";

export type Bindings = {
  DB: D1Database;
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  console.log(`MY_VAR is: ${c.env.MY_VAR}`);
  return c.text("Hello, Hono!");
});

app.get("/html", (c) => {
  return c.html("<h1>Hello, Hono!</h1>");
});

app.get("/customers", getAllCustomers);
app.get("/customers/:id", getCustomerById);
app.post("/customers", validateCustomer, createCustomer);

// You can add a customer using curl like this:
// curl -X POST http://localhost:8787/customers \
//   -H "Content-Type: application/json" \
//   -d '{"name":"David Martens","email":"david.martens@example.com"}'

app.notFound((c) => {
  return c.text("Endpoint not found", 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("An error has occurred", 500);
});

export default app;
