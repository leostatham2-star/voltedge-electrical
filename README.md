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

## Deploying to Cloudflare

This repository ships with everything Cloudflare needs. It deploys as a Cloudflare Worker built by the OpenNext adapter, using the `wrangler.jsonc` and `open-next.config.ts` in the repo root.

**Existing Cloudflare project (Git connected):** no dashboard changes are needed. The framework preset can stay on Next.js. Every push to `main` builds and deploys automatically.

**Deploying by hand:**

```bash
npx @opennextjs/cloudflare build && npx wrangler deploy
```

The worker name in `wrangler.jsonc` must match the Cloudflare project name (`voltedge-electrical`). A mismatch fails deploys with error 10143, because the OpenNext runtime adds a self reference service binding under that name.

On Cloudflare there is no SQLite, so `/api/leads` answers with an error and the contact and appointment forms fall back to opening a prefilled email instead. Nothing else about the site depends on the server.

After the first deploy, add your custom domain under the project's **Domains & routes** settings. Cloudflare handles the SSL certificate.

## Pushing this repository to GitHub

```bash
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

If two factor authentication is on (it usually is), a Personal Access Token is used in place of the password. Create one at github.com/settings/tokens with the classic `repo` scope, or a fine grained token with read and write access to Contents.

## Replacing the placeholder contact details

The phone numbers, address, and email in `src/lib/site.ts` are realistic placeholders. Before the site goes fully live for a real business, update the `BRAND` object at the top of that file and the forms will pick the new details up everywhere.
