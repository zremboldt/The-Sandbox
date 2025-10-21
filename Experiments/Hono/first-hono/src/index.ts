import { Hono } from "hono";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
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
app.post("/customers", ...createCustomer);

// You can add a customer using curl like this:
// curl -X POST http://localhost:8787/customers \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Wouter Steegers","email":"wouter.steegers@example.com"}'

app.notFound((c) => {
  return c.text("Endpoint not found", 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("An error has occurred", 500);
});

export default app;
