[This video](https://youtu.be/yPrQ7u3gWqk) was really helpful in walking me through how to get started with Hono and a Cloudflare D1 database.

# How-to

## Run project locally

```shell
pnpm i
pnpm dev
```

## Deploy to Cloudflare Workers

First login to Cloudflare from your web browser.
Then:

```shell
pnpm wrangler login
pnpm run deploy
```

## Interacting with a D1 database

[Create a D1 database](https://developers.cloudflare.com/workers/wrangler/commands/#d1-create)
[Execute a D1 database](https://developers.cloudflare.com/workers/wrangler/commands/#d1-execute)

```shell
# Create the database: local and remote
npx wrangler d1 create first-hono-d1

# Seed the database on local
npx wrangler d1 execute first-hono-d1 --file=./schema.sql

# Seed the database on remote
npx wrangler d1 execute first-hono-d1 --remote --file=./schema.sql

# Cleanup
npx wrangler d1 delete first-hono-d1

```

## Fixing Cloudflare types

If you run into an issue with Typescript types on your Cloudflare code, run this command to generate types based on their latest spec:

`pnpm wrangler types`

https://developers.cloudflare.com/workers/languages/typescript/

--

# Notes beyond this point were part of the project initialization

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
