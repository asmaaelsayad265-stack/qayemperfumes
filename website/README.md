This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open the URL printed by your dev server with your browser to see the result.

### Content Security Policy

The CSP response header is configured in `next.config.ts`. In development it
allows Next.js/Turbopack's inline bootstrap scripts, eval-based tooling, and HMR
WebSocket connections. Production does not enable `unsafe-inline` or
`unsafe-eval`.

Changes to `next.config.ts` require a development-server restart. To verify the
active policy, inspect the document request in the browser Network panel (or
run `curl -I http://localhost:3000`) and check the
`Content-Security-Policy` response header. If another CSP header is present,
also check the hosting platform, reverse proxy, or CDN configuration; browsers
enforce all CSP headers independently.

For production pages that require inline scripts, prefer a request-scoped
nonce. Generate a cryptographically random nonce in Next.js middleware, add
`'nonce-<value>'` to `script-src`, forward it in the `x-nonce` request header,
and apply the same nonce to each intentional `<Script nonce={nonce}>`. The
nonce must be unique for every response and must not be a build-time or public
environment variable. Static SHA-256 hashes are an alternative only for inline
script text that is stable and known in advance.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
