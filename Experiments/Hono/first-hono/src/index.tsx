import { createApp } from "./app";

const app = createApp();

export default app;

// You can also add a customer using curl like this:
// curl -X POST http://localhost:8787/customers \
//   -H "Content-Type: application/json" \
//   -d '{"name":"Wouter Steegers","email":"wouter.steegers@example.com"}'

// Or delete a customer by ID like this:
// curl -X DELETE http://localhost:8787/customers/4
