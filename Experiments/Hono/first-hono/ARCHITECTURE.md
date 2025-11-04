# Modular Hono Project Structure

This project follows a modular architecture pattern optimized for Hono applications.

## Folder Structure

```
src/
├── index.tsx                       # Main entry point
├── app.tsx                         # App configuration and setup
├── modules/                        # Feature modules
│   ├── customers/                  # Customer domain module
│   │   ├── customer.types.ts       # Types and schemas
│   │   ├── customer.repository.ts  # Data access layer
│   │   ├── customer.service.ts     # Business logic layer
│   │   ├── customer.routes.ts      # Route handlers
│   │   └── index.ts                # Module exports
│   └── index.ts                    # All modules export
├── shared/                         # Shared utilities
│   ├── types/                      # Shared type definitions
│   │   ├── bindings.ts             # Cloudflare bindings
│   │   └── index.ts
│   ├── middleware/                 # Shared middleware
│   │   ├── error-handler.ts        # Global error handling
│   │   └── index.ts
│   └── index.ts
└── views/                          # UI components (unchanged)
    ├── create-customer-form.tsx
    ├── delete-customer-form.tsx
    └── layout.tsx
```

## Architecture Layers

### 1. Routes Layer (`*.routes.ts`)

- Handles HTTP requests and responses
- Input validation using Zod schemas
- Calls service layer for business logic
- Returns appropriate HTTP responses

### 2. Service Layer (`*.service.ts`)

- Contains business logic
- Orchestrates repository calls
- Handles business rules and validation
- Can call multiple repositories if needed

### 3. Repository Layer (`*.repository.ts`)

- Direct database access
- CRUD operations
- Database-specific logic
- Returns domain entities

### 4. Types Layer (`*.types.ts`)

- Domain-specific types
- Zod validation schemas
- Input/output interfaces

## Benefits

1. **Modularity**: Each domain is self-contained
2. **Testability**: Each layer can be tested independently
3. **Scalability**: Easy to add new modules
4. **Type Safety**: Full TypeScript support
5. **Separation of Concerns**: Clear responsibility boundaries
6. **Hono-Optimized**: Uses Hono's best practices

## Adding New Modules

To add a new module (e.g., `orders`):

1. Create `src/modules/orders/` directory
2. Add the four core files:
   - `order.types.ts`
   - `order.repository.ts`
   - `order.service.ts`
   - `order.routes.ts`
3. Create `index.ts` to export module
4. Add route to `app.tsx`
5. Export from `modules/index.ts`

## Example Usage

```typescript
// In app.tsx
import { orderRoutes } from "./modules/orders";
app.route("/orders", orderRoutes);

// In your new module
export const orderRoutes = new Hono<{ Bindings: Bindings }>().get(
  "/",
  async (c) => {
    const orders = await orderService.getAll(c.env.DB);
    return c.json(orders);
  }
);
```
