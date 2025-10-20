# How-to

## Run project locally

```txt
pnpm i
pnpm dev
```

## Deploy to Cloudflare Workers

First login to Cloudflare from your web browser.
Then:

```txt
pnpm wrangler login
pnpm run deploy
```

## Create a D1 database

https://developers.cloudflare.com/workers/wrangler/commands/#d1-create

```txt
npx wrangler d1 create <DATABASE_NAME>
```

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
