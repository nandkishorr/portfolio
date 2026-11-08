# Nandkishor’s portfolio — local copy

This is the latest logo-free portfolio source, including the portrait and resume as local assets. No passwords, secrets, node_modules, or Git credentials are included.

## Run locally

Install Node.js 22 or newer. Open a terminal in this portfolio folder and run:

```sh
npx --yes pnpm@10.18.0 install --frozen-lockfile
npx --yes pnpm@10.18.0 dev:static
```

Open http://localhost:3000. To create a production build:

```sh
npx --yes pnpm@10.18.0 build:static
```

The deployable output is in `dist/public`. The provided `website` folder is also a prebuilt copy. Serve it with an HTTP server; opening its index.html directly through file:// is not supported.

The website has no login or database requirement. Contact links open email/phone apps or the supplied social profiles; no message is sent automatically. Google Fonts require an internet connection and fall back to installed fonts when offline.
