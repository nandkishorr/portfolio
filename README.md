# Nandkishor R — Developer Portfolio

A React portfolio site that can be deployed as a static website. The portfolio does not require user accounts, authentication, a database, or a platform-specific agent service.

## Run locally

```sh
pnpm install
pnpm dev:static
```

## Build for deployment

```sh
pnpm build:static
```

Publish the generated `dist/public` directory to any static host. The optional Express server is available with `pnpm dev` and `pnpm build` / `pnpm start`.

