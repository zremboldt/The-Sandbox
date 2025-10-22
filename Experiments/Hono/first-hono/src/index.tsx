import { Hono } from "hono";
import {
  createCustomer,
  deleteCustomerById,
  getAllCustomers,
  getCustomerById,
} from "./models/customer";
import { CreateCustomerForm } from "./views/create-customer-form";
import { Layout } from "./views/layout";
import { DeleteCustomerForm } from "./views/delete-customer-form";
import { methodOverride } from "hono/method-override";

export type Bindings = {
  DB: D1Database;
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("/customers/*", methodOverride({ app }));

app.get("/test", (c) => {
  console.log(`MY_VAR is: ${c.env.MY_VAR}`);
  return c.text("Hello, Hono!");
});

app.get("/", (c) => {
  return c.html(
    <Layout>
      <CreateCustomerForm />
      <DeleteCustomerForm />
    </Layout>
  );
});

app.get("/customers", getAllCustomers);
app.get("/customers/:id", getCustomerById);
app.post("/customers", ...createCustomer);
app.delete("/customers/:id", deleteCustomerById);

app.notFound((c) => {
  return c.text("Endpoint not found", 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("An error has occurred", 500);
});

export default app;

// You can also add a customer using curl like this:
// curl -X POST http://localhost:8787/customers \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Wouter Steegers","email":"wouter.steegers@example.com"}'

// Or delete a customer by ID like this:
// curl -X DELETE http://localhost:8787/customers/4
