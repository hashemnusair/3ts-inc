# 3Ts website handoff

## Ownership

The GitHub repository, Vercel project, `3ts-inc.com` domain, and future CMS
should be owned by Shareef. Hashem should retain GitHub collaborator access for
technical support.

Recommended repository and Vercel project name: `3ts-inc`

## Local verification

```bash
npm ci
npm run lint
npm run build
```

The site is a Next.js 16 App Router project using static export. It currently
has no required secrets or external services.

## Vercel import settings

Keep Vercel's detected defaults:

- Framework Preset: Next.js
- Root Directory: `./`
- Install Command: default
- Build Command: default (`next build`)
- Output Directory: do not override
- Production Branch: `main`

Set:

```text
NEXT_PUBLIC_SITE_URL=https://3ts-inc.com
```

Apply it to Production, Preview, and Development, then redeploy.

## Domain

Deploy and verify the generated `vercel.app` URL before changing DNS. Add
`3ts-inc.com` and `www.3ts-inc.com` in Vercel, then use the exact DNS records
shown by Vercel.

Preserve all email-related MX, SPF, DKIM, and DMARC records.

## Deployment behavior

Pushes to `main` create production deployments. Pull requests and other
branches create preview deployments.

## CMS

Sanity is the recommended CMS. The project should be created under Shareef's
account. Publishing in Sanity will trigger a Vercel deploy hook while the site
remains a static export.

See `CMS_PLAN.md`.
