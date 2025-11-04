import { Hono } from "hono";
import { methodOverride } from "hono/method-override";
import { logger } from "hono/logger";

import { userRoutes } from "./modules/users";
import { errorHandler } from "./shared/middleware";
import type { Bindings } from "./shared/types";

import { CreateUserForm } from "./views/create-user-form";
import { Layout } from "./views/layout";
import { DeleteUserForm } from "./views/delete-user-form";
import { jsxRenderer } from "hono/jsx-renderer";

export function createApp() {
  const app = new Hono<{ Bindings: Bindings }>({ strict: false });

  // Global middleware
  app.use("*", logger());
  app.use("/users/*", methodOverride({ app }));
  app.use(
    "*",
    jsxRenderer(({ children }) => {
      return <Layout>{children}</Layout>;
    })
  );

  // Test route
  app.get("/test", (c) => {
    console.log(`MY_VAR is: ${c.env.MY_VAR}`);
    return c.text("Hello, Hono!");
  });

  // Home page
  app.get("/", (c) => {
    return c.render(
      <ul>
        <li>
          <a href="/users/create">Create User</a>
        </li>
        <li>
          <a href="/users/delete">Delete User</a>
        </li>
      </ul>
    );
  });

  app.get("/users/create", (c) => {
    return c.render(<CreateUserForm />);
  });

  app.get("/users/delete", (c) => {
    return c.render(<DeleteUserForm />);
  });

  // API routes
  app.route("/users", userRoutes);

  // Error handling
  app.notFound((c) => {
    return c.text("Endpoint not found", 404);
  });

  app.onError(errorHandler);

  return app;
}
