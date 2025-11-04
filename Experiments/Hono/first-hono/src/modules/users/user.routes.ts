import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "./user.types";
import { userService } from "./user.service";
import type { Bindings } from "../../shared/types";

export const userRoutes = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    try {
      const users = await userService.getAll(c.env.DB);
      return c.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return c.json({ error: "Failed to fetch users" }, 500);
    }
  })

  .get("/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id"));
      if (isNaN(id)) {
        return c.json({ error: "Invalid user ID" }, 400);
      }

      const user = await userService.getById(c.env.DB, id);

      if (!user) {
        return c.json({ error: "User not found" }, 404);
      }

      return c.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return c.json({ error: "Failed to fetch user" }, 500);
    }
  })

  .post("/", zValidator("form", userSchema), async (c) => {
    try {
      const userData = c.req.valid("form");
      const user = await userService.create(c.env.DB, userData);

      return c.json(
        {
          message: "User created successfully!",
          user,
        },
        201
      );
    } catch (error) {
      console.error("Error creating user:", error);
      return c.json({ error: "Failed to create user" }, 500);
    }
  })

  .delete("/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id"));
      if (isNaN(id)) {
        return c.json({ error: "Invalid user ID" }, 400);
      }

      const success = await userService.delete(c.env.DB, id);

      if (!success) {
        return c.json({ error: "User not found" }, 404);
      }

      return c.json({ message: "User deleted successfully!" });
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        return c.json({ error: "User not found" }, 404);
      }
      console.error("Error deleting user:", error);
      return c.json({ error: "Failed to delete user" }, 500);
    }
  });
