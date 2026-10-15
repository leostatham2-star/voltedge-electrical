# VoltEdge Electrical

Marketing site for VoltEdge Electrical, a licensed electrical contractor in Columbus, Ohio. Built with Next.js 16, Tailwind CSS 4, and client side hash routing.

## Two ways this site runs

| Mode | Command | Where it is used |
|------|---------|------------------|
| Sandbox / development | `npm run dev` | z.ai sandbox preview on port 3000, with the leads API and SQLite storage |
| Static production | `npm run build:static` | Cloudflare Pages (or any static host), outputs plain HTML to `out/` |

The sandbox mode keeps everything the same as before: the contact and appointment forms post to `/api/leads` and submissions land in the local SQLite database. On the static host there is no server, so the forms gracefully open the visitor's email app with the message prefilled instead. No third party form service is required.

## Project layout

```
src/app/page.tsx            single entry, hash based routing (#/about, #/contact, #/blog/slug)
src/app/api/leads/route.ts  lead storage (sandbox mode only, stashed during static build)
src/components/site/        header, footer, hero slider, all page sections
src/lib/site.ts             brand data, all copy, mailto fallback helper
public/images/              photography (all self hosted, no hotlinking)
scripts/build-static.sh     static export wrapper used by Cloudflare Pages
```

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

The database is created and migrated automatically in the sandbox. To push the Prisma schema by hand:

```bash
npm run db:push
```

## First deploy to Cloudflare

1. Push this repository to GitHub (see the next section).
2. In Cloudflare, go to **Workers & Pages > Create > Import an existing Git repository** and pick the repo.
3. In the build settings, set the **framework preset to None** first, then:

   | Setting | Value |
   |---------|-------|
   | Framework preset | None |
   | Build command | `npm run build:static` |
   | Deploy command | `npx wrangler deploy` |

   Leave the default install command as is. Do not pick the Next.js preset: that route tries to run the whole app as a Cloudflare Worker and fails (see troubleshooting below).
4. Deploy. Every push to the main branch now redeploys the site automatically.

The deploy reads `wrangler.jsonc` from the repo, which serves the `out/` folder as static assets with single page application fallback. Nothing server side runs on Cloudflare, and the forms fall back to a prefilled email, so no database or bindings are needed.

After the first deploy, add your custom domain under the project's **Domains & routes** settings. Cloudflare handles the SSL certificate.

## Troubleshooting deploys

**Error 10143, "Service binding 'WORKER_SELF_REFERENCE' references Worker ... which was not found"**

This happens when the framework preset is left on Next.js. Cloudflare then runs the OpenNext adapter, which generates a Worker config named after the package (`nextjs-tailwind-shadcn-ts`) while the actual project is named `voltedge-electrical`, so the deploy is rejected. The build itself succeeds, which makes this extra confusing. Fix: open the project's **Settings > Build > Build configuration**, change the framework preset to None, set the build command to `npm run build:static` and the deploy command to `npx wrangler deploy`, then retry the deployment. This repo already contains the correct `wrangler.jsonc`, so no other changes are needed.

## Pushing this repository to GitHub

```bash
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

If two factor authentication is on (it usually is), a Personal Access Token is used in place of the password. Create one at github.com/settings/tokens with the classic `repo` scope, or a fine grained token with read and write access to Contents.

## Replacing the placeholder contact details

The phone numbers, address, and email in `src/lib/site.ts` are realistic placeholders. Before the site goes fully live for a real business, update the `BRAND` object at the top of that file and the forms will pick the new details up everywhere.
