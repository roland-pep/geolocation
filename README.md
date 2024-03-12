# Geolocation

This example shows how to use the `event.request.geo` object to determine a user's location.

```ts
geo: {
  city?: string
  country?: string
  region?: string
}
```

```bash
pnpm create next-app --example https://github.com/vercel/examples/tree/main/edge-middleware/geolocation geolocation
```

Next, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=edge-middleware-eap) ([Documentation](https://nextjs.org/docs/deployment)).
