import { z } from "zod";
import type { Context } from "hono";
import type { Bindings } from "../index";
import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";

export const getAllCustomers = async (c: Context<{ Bindings: Bindings }>) => {
  const customers = await c.env.DB.prepare("SELECT * FROM customers").all();
  return c.json(customers.results);
};

export const getCustomerById = async (c: Context<{ Bindings: Bindings }>) => {
  const customerId = c.req.param("id");
  const customer = await c.env.DB.prepare(
    "SELECT * FROM customers WHERE id = ?"
  )
    .bind(customerId)
    .first();

  return c.json(customer);
};

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
});

type CustomerInput = z.infer<typeof customerSchema>;

const factory = createFactory<{ Bindings: Bindings }>();

async function insertCustomer(db: D1Database, customer: CustomerInput) {
  const result = await db
    .prepare("INSERT INTO customers (name, email) VALUES (?, ?)")
    .bind(customer.name, customer.email)
    .run();

  if (!result.success) {
    throw new Error("Failed to create customer");
  }

  return {
    id: result.meta.last_row_id,
    ...customer,
  };
}

export const createCustomer = factory.createHandlers(
  zValidator("json", customerSchema),
  async (c) => {
    const customerData = c.req.valid("json");

    try {
      const customer = await insertCustomer(c.env.DB, customerData);
      return c.json(
        {
          message: "Customer created successfully!",
          id: customer.id,
        },
        201
      );
    } catch (error) {
      console.error("Database error:", error);
      return c.json({ error: "Database error" }, 500);
    }
  }
);
