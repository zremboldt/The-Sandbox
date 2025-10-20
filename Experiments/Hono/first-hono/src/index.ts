import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

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
  const customers = await c.env.DB.prepare("SELECT * FROM customers").all();

  return c.json(customers.results);
});

app.get("/customers/:id", async (c) => {
  const customerId = c.req.param("id");
  const customer = await c.env.DB.prepare(
    "SELECT * FROM customers WHERE id = ?"
  )
    .bind(customerId)
    .first();

  return c.json(customer);
});

// Validation schema for new customer
const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
});

// Route for adding a new customer
app.post("/customers", zValidator("json", customerSchema), async (c) => {
  const { name, email } = c.req.valid("json");

  try {
    const result = await c.env.DB.prepare(
      "INSERT INTO customers (name, email) VALUES (?, ?)"
    )
      .bind(name, email || null)
      .run();

    if (result.success) {
      return c.json(
        {
          message: "Customer created successfully",
          id: result.meta.last_row_id,
        },
        201
      );
    } else {
      return c.json({ error: "Failed to create customer" }, 500);
    }
  } catch (error) {
    console.error("Database error:", error);
    return c.json({ error: "Database error" }, 500);
  }
});

// You can add a customer using curl like this:
// curl -X POST http://localhost:8787/customers \
//   -H "Content-Type: application/json" \
//   -d '{"name":"David Martens","email":"david.martens@example.com"}'

export default app;
